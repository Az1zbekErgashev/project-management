import DefaultLayout from 'layouts/DefaultLayout';
import { AdminUsers, HomePage, LoginPage, UserInformation } from 'pages';
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
      { path: '/admin/my-company', element: <HomePage /> },
      { path: '/admin/users', element: <AdminUsers /> },
      { path: '/admin/user-information', element: <UserInformation /> },
      { path: '/admin/user-information/:id', element: <UserInformation /> },
    ],
  },
]);
