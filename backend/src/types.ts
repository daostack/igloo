import { ReadDataService } from './services/onchain/ReadDataService';
import { ProposalService } from './services/ProposalService';
import { TimeService } from './services/TimeService';
import { UserService } from './services/UserService';

export interface Services {
  proposal: ProposalService;
  time: TimeService;
  user: UserService;
  readDataService: ReadDataService;
}
