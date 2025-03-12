import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useJwt from 'utils/useJwt';
interface ProtectedUserRouteProps {
  children: ReactNode;
}

const ProtectedUserRoute = ({ children }: ProtectedUserRouteProps) => {
  const { remove, getDecoded } = useJwt();
  const tokenExp = getDecoded().exp;
  if (tokenExp) {
    const currentDate = Date.now() / 1000;
    if (currentDate > tokenExp) {
      remove();
      localStorage.clear();
      return <Navigate to="/login" replace={true} />;
    }
  } else {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedUserRoute;
