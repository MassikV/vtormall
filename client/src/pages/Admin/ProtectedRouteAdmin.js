import { useAuth0 } from '@auth0/auth0-react';

function ProtectedRouteAdmin({ children }) {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  if (isAuthenticated === false) {
    loginWithRedirect();
  }

  if (user.sub === process.env.REACT_APP_ADMIN) {
    return children;
  }

  return <div className="d-flex justify-content-center py-5 fs-4">Access denied</div>;
}

export default ProtectedRouteAdmin;
