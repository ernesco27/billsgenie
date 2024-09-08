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
  SalesReturns,
  Purchases,
  PurchasesReturn,
  Warehouse,
  InventoryTracker,
  StockMovement,
  ProductManagement,
  WarehouseManagement,
  SupplierManagement,
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
          path: "/dashboard/sales-return",
          element: <ProtectedRoute element={<SalesReturns />} />,
        },
        {
          path: "/dashboard/purchases",
          element: <ProtectedRoute element={<Purchases />} />,
        },
        {
          path: "/dashboard/purchases-return",
          element: <ProtectedRoute element={<PurchasesReturn />} />,
        },
        {
          path: "/dashboard/stock-management",
          element: <ProtectedRoute element={<Warehouse />} />,
          children: [
            // {
            //   index: true,
            //   element: <ProtectedRoute element={<Warehouse />} />,
            // },
            {
              path: "track-inventory",
              element: <ProtectedRoute element={<InventoryTracker />} />,
            },
            {
              path: "stock-movement",
              element: <ProtectedRoute element={<StockMovement />} />,
            },
            {
              path: "product-management",
              element: <ProtectedRoute element={<ProductManagement />} />,
            },
            {
              path: "warehouse-management",
              element: <ProtectedRoute element={<WarehouseManagement />} />,
            },
            {
              path: "supplier-management",
              element: <ProtectedRoute element={<SupplierManagement />} />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export { Router };
