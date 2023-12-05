import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Login />,
  },
];

export function BrowserContainer() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
