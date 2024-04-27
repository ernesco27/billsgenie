import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../components/App";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../components/Home";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        // {
        //   path: "/Shop",
        //   element: <Shop />,
        // },
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
