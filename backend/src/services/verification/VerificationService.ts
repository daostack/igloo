import { CrossVerification } from '@prisma/client';
import { Octokit } from 'octokit';
import {
  VerificationIntent,
  isSendRewards,
  getAddressStrict,
} from '@commonvalue/core';

export class VerificationService {
  protected octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getVerificationGithub(
    github_username: string
  ): Promise<CrossVerification | undefined> {
    const { data: gists } = await this.octokit.rest.gists.listForUser({
      username: github_username,
      per_page: 10,
    });

    /** check gist contents */
    for (const gist of gists) {
      const { data: gistFull } = await this.octokit.rest.gists.get({
        gist_id: gist.id,
      });

      const file = gistFull.files[Object.keys(gistFull.files)[0]];
      const sendRewards = isSendRewards(file.content);

      if (sendRewards) {
        return {
          from: `github:${github_username}`,
          to: `ethereum-${sendRewards.params.chain}:${getAddressStrict(
            sendRewards.params.address
          )}`,
          intent: VerificationIntent.SEND_REWARDS,
          proof: gist.html_url,
        };
        true;
      }
    }

    return undefined;
  }
}
