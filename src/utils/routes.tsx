import DefaultLayout from 'layouts/DefaultLayout';
import { AdminUsers, LoginPage, Request } from 'pages';
import { Logs } from 'pages/Admin/components/Logs';
import HomePage from 'pages/Home';
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
      { path: '/dashboard', element: <HomePage /> },
      { path: '/users', element: <AdminUsers /> },
      { path: '/requests', element: <Request /> },
      { path: '/logs', element: <Logs />},
    ],
  },
]);
