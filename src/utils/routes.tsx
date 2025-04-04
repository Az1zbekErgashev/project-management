import DefaultLayout from 'layouts/DefaultLayout';
import { AdminUsers, Home, DeletedRequests, LoginPage, Logs, Profile, Request, Translations } from 'pages';
import { PendingRequests } from 'pages/Admin/components/Request/components/PendingRequests';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedUserRoute from 'routes/ProtectedUserRoutes';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout />
      </ProtectedUserRoute>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/users', element: <AdminUsers /> },
      { path: '/requests', element: <Request /> },
      { path: '/deleted-requests', element: <DeletedRequests /> },
      { path: '/pending-requests', element: <PendingRequests /> },
      { path: '/logs', element: <Logs /> },
      { path: '/translations', element: <Translations /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);
