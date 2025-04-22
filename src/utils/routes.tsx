import DefaultLayout from 'layouts/DefaultLayout';
import {
  AdminUsers,
  Dashboard,
  DeletedRequests,
  LoginPage,
  Logs,
  Profile,
  Request,
  TableDetail,
  Translations,
} from 'pages';
import CommentsPage from 'pages/Admin/components/Request/components/Comments';
import StateManagement from 'pages/Admin/components/StateManagement';
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
      { path: '/', element: <Dashboard /> },
      { path: '/users', element: <AdminUsers /> },
      { path: '/requests', element: <Request /> },
      { path: '/deleted-requests', element: <DeletedRequests /> },
      { path: '/state-management', element: <StateManagement /> },
      { path: '/comments', element: <CommentsPage /> },
      { path: '/translations', element: <Translations /> },
      { path: '/profile', element: <Profile /> },
      { path: '/logs', element: <Logs /> },
      { path: '/add-requests', element: <TableDetail /> },
    ],
  },
]);
