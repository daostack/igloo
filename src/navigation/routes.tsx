import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import CreateProposal from '../pages/SpacesPage/components/CreateProposal/CreateProposal';
import Proposal from '../pages/SpacesPage/components/Proposal/Proposal';
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
        path: Routes.spaces,
        element: <SpacesPage />,
      },
      {
        path: "spaces/:spaceId",
        element: <Space />,
      },
      {
        path: "spaces/:spaceId/proposal/:proposalId",
        element: <Proposal />
      },
      {
        path: "spaces/:spaceId/create-proposal",
        element: <CreateProposal />
      }
    ]
  }
]);
