import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [{ path: "", index: true, Component: HomePage }],
  },
]);

const AppRouter = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default AppRouter;
