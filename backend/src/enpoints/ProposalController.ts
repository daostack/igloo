import {
  ProposalCreate,
  ProposalCreateResponse,
  ProposalRead,
} from '@igloo/core';
import { NextFunction, Request, Response } from 'express';

import { ServiceManager } from '../service.manager';

import { Controller } from './Controller';

export class ProposalController extends Controller {
  constructor(manager: ServiceManager) {
    super(manager);
  }
  async create(
    request: Request,
    _response: Response,
    _next: NextFunction,
    loggedUser: string | undefined
  ): Promise<ProposalCreateResponse> {
    if (loggedUser === undefined) {
      throw new Error('logged user expected but not found');
    }

    const result = await this.manager.services.proposal.create(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.body.details as ProposalCreate,
      loggedUser
    );

    return result;
  }

  async get(
    request: Request,
    _response: Response,
    _next: NextFunction,
    _loggedUser: string | undefined
  ): Promise<ProposalRead> {
    const proposal = await this.manager.services.proposal.getDto(
      +request.params.id
    );
    return proposal;
  }
}
