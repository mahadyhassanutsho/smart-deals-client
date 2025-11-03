import { createBrowserRouter, RouterProvider } from "react-router";

import { getProductWithId } from "../services/server";

import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "../components/Loading";
import MyBidsPage from "../pages/MyBidsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { path: "", index: true, Component: HomePage },

      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bids",
        element: (
          <ProtectedRoute>
            <MyBidsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        ),
        hydrateFallbackElement: <Loading type="block" />,
        loader: ({ params }) => getProductWithId(params.id),
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

const AppRouter = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default AppRouter;
