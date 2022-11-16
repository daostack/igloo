import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Space from '../pages/SpacesPage/components/Space/Space';
import SpacesPage from '../pages/SpacesPage/SpacesPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "spaces",
        element: <SpacesPage />,
      },
      {
        path: "spaces/:spaceId",
        element: <Space />
      }
    ]
  }
]);
