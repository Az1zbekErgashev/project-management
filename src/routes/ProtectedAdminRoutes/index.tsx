import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useJwt from 'utils/useJwt';

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { remove, getDecoded } = useJwt();
  const tokenExp = getDecoded().exp;
  const role = getDecoded()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  if (tokenExp) {
    const currentDate = Date.now() / 1000;
    if (currentDate > tokenExp) {
      remove();
      localStorage.clear();
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }

  if (
    !role.toLowerCase().includes('systemadmin'.toLowerCase()) &&
    !role.toLowerCase().includes('superadmin'.toLowerCase())
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
