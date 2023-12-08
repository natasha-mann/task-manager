import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { Dashboard } from "../pages/dashboard";
import { ProtectedRoutes } from "./ProtectedRoutes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export function BrowserContainer() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
