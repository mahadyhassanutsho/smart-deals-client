import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "../layouts/AppLayout";

const router = createBrowserRouter([{ path: "/", Component: AppLayout }]);

const AppRouter = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default AppRouter;
