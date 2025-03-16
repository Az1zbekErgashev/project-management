import DefaultLayout from 'layouts/DefaultLayout';
import { AdminUsers, HomePage, LoginPage, Request } from 'pages';
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
      { path: '/my-company', element: <HomePage /> },
      { path: '/users', element: <AdminUsers /> },
      { path: '/requests', element: <Request /> },
    ],
  },
]);
