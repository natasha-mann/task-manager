import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getTokenFromCookie } from "../utils/cookies";

export const ProtectedRoutes = () => {
  const location = useLocation();
  const token = getTokenFromCookie();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" replace state={{ from: location }} />
  );
};
