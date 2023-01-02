import { ServiceManager } from '../service.manager';

import { Controller } from './Controller';
import { ProposalController } from './ProposalController';

export interface RouteConfig {
  method: 'post' | 'get' | 'delete';
  route: string;
  controller: new (manager: ServiceManager) => Controller;
  action: string;
  protected: boolean;
  file?: boolean;
}

export const Routes: RouteConfig[] = [
  {
    method: 'post',
    route: '/proposal/create',
    controller: ProposalController,
    action: 'create',
    protected: true,
  },
  {
    method: 'get',
    route: '/proposal/get',
    controller: ProposalController,
    action: 'get',
    protected: true,
    file: true,
  },
];
