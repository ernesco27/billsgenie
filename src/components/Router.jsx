import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages";
//import { Home } from "../components/Home";

import {
  LoginPage,
  Ecommerce,
  Orders,
  Employees,
  Customers,
  Kanban,
  Area,
  Editor,
  Line,
  Dashboard,
  Calendar,
} from "../pages";

function Router() {
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return !!localStorage.getItem("isAuthenticated");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/dashboard",
      element: <App />,
      children: [
        {
          index: true,
          element: <ProtectedRoute element={<Ecommerce />} />,
        },
        {
          path: "/dashboard/sales",
          element: <ProtectedRoute element={<Orders />} />,
        },
        {
          path: "/dashboard/create-invoice",
          element: <ProtectedRoute element={<Orders />} />,
        },
        {
          path: "/dashboard/employees",
          element: <ProtectedRoute element={<Employees />} />,
        },
        {
          path: "/dashboard/customers",
          element: <ProtectedRoute element={<Customers />} />,
        },
        {
          path: "/dashboard/kanban",
          element: <ProtectedRoute element={<Kanban />} />,
        },
        {
          path: "/dashboard/editor",
          element: <ProtectedRoute element={<Editor />} />,
        },
        {
          path: "/dashboard/calendar",
          element: <ProtectedRoute element={<Calendar />} />,
        },
        {
          path: "/dashboard/line",
          element: <ProtectedRoute element={<Line />} />,
        },
        {
          path: "/dashboard/area",
          element: <ProtectedRoute element={<Area />} />,
        },
      ],
    },
    // {
    //   path: "/Cart",
    //   element: <Cart />,
    // },
    // {
    //   path: "/Checkout",
    //   element: <Checkout />,
    // },
    // {
    //   path: "/Product",
    //   element: <ProductPage />,
    // },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export { Router };
