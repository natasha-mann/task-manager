import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

const routes: RouteObject[] = [
  {
    path: "",
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
