import { NextFunction, Request, Response } from 'express';
import { generateNonce, SiweMessage } from 'siwe';
import { LoggedUserDetails, Verification } from '@commonvalue/core';

import { ServiceManager } from '../service.manager';

import { Controller } from './Controller';

export class UserController extends Controller {
  constructor(manager: ServiceManager) {
    super(manager);
  }

  /** */
  async me(
    request: Request,
    _response: Response,
    _next: NextFunction,
    loggedUser: string | undefined
  ): Promise<LoggedUserDetails | undefined> {
    /* eslint-disable */
    if (!(request.session as any).siwe) {
      return undefined;
    }

    /* eslint-enable */
    return loggedUser
      ? this.manager.services.user.getVerified(loggedUser)
      : undefined;
  }

  nonce(
    request: Request,
    _response: Response,
    _next: NextFunction
  ): { nonce: string } {
    const nonce = generateNonce();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (request.session as any).nonce = nonce;
    return { nonce };
  }

  async verify(
    request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<{ valid: boolean; user?: LoggedUserDetails }> {
    try {
      /* eslint-disable */
      const reqMessage = request.body?.message as string | undefined;
      const reqSig = request.body?.signature as string | undefined;
      const reqNonce = (request.session as any).nonce as string | undefined;
      /* eslint-enable */

      if (reqMessage === undefined || reqSig === undefined) {
        throw new Error('Expected message and signature in body');
      }

      const message = new SiweMessage(reqMessage);
      const fields = await message.validate(reqSig);

      if (fields.nonce !== reqNonce) {
        throw new Error(
          `Invalid nonce message: ${fields.nonce} vs session: ${reqNonce}`
        );
      }

      /** If signature is valid, get or create user */
      await this.manager.services.user.getOrCreate({
        address: fields.address,
      });

      /* eslint-disable */
      (request.session as any).siwe = fields;
      request.session.cookie.expires = new Date(fields.expirationTime);

      return {
        valid: true,
        user: await this.manager.services.user.getVerified(fields.address),
      };
    } catch (e) {
      (request.session as any).siwe = null;
      (request.session as any).nonce = null;
      console.error(e);

      return { valid: false };
      /* eslint-enable */
    }
  }

  logout(request: Request, _response: Response, _next: NextFunction): void {
    /* eslint-disable */
    if (request.session) {
      (request.session as any).destroy();
    }
    /* eslint-enable */
  }

  checkVerification(
    request: Request,
    _response: Response,
    _next: NextFunction,
    loggedUser: string
  ): Promise<Verification | undefined> {
    return this.manager.services.user.checkVerification(
      request.body.handle as string,
      loggedUser
    );
  }
}
