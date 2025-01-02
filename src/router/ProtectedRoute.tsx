import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function IsAdmin({ children }: ProtectedRouteProps) {
  const { userData, isAuthenticated } = useAuth();
  // console.log(userData?.roles[0]);
  // console.log(isAuthenticated, userData);
  if (!userData?.roles.includes('ROLE_ADMIN')) {
    return <Navigate to="/" />;
  }

  return <>{children} </>;
}
