import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AdminPage from '../pages/AdminPage/AdminPage';
import CreateHat from '../pages/AdminPage/components/CreateHat/CreateHat';
import MintHat from '../pages/AdminPage/components/MintHat/MintHat';
import CreateTopic from '../pages/DiscoursePage/components/CreateTopic/CreateTopic';
import Post from '../pages/DiscoursePage/components/Topic/Topic';
import DiscoursePage from '../pages/DiscoursePage/DiscoursePage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import CreateProposal from '../pages/SpacesPage/components/CreateProposal/CreateProposal';
import Proposal from '../pages/SpacesPage/components/Proposal/Proposal';
import ProposalsList from '../pages/SpacesPage/components/ProposalsList/ProposalsList';
import Role from '../pages/SpacesPage/components/Role/Role';
import RolesList from '../pages/SpacesPage/components/RolesList/RolesList';
import Space from '../pages/SpacesPage/components/Space/Space';
import SpacesPage from '../pages/SpacesPage/SpacesPage';
import { Routes } from './constants';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.admin,
        element: <AdminPage />,
        children: [
          {
            path: Routes.createHat,
            element: <CreateHat />
          },
          {
            path: Routes.mintHat,
            element: <MintHat />
          }
        ]
      },
      {
        path: Routes.spaces,
        element: <SpacesPage />,
      },
      {
        path: Routes.space,
        element: <Space />,
        children: [
          {
            path: Routes.proposalsList,
            element: <ProposalsList />,
          },
          {
            path: Routes.roles,
            element: <RolesList />
          }
        ]
      },
      {
        path: Routes.proposal,
        element: <Proposal />
      },
      {
        path: Routes.createProposal,
        element: <CreateProposal />
      },
      {
        path: Routes.discourse,
        element: <DiscoursePage />
      },
      {
        path: Routes.discoursePost,
        element: <Post />
      },
      {
        path: Routes.createTopic,
        element: <CreateTopic />
      },
      {
        path: Routes.role,
        element: <Role />
      }
    ]
  }
]);
