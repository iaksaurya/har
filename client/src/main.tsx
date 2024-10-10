import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Cancel from "./pages/Cancel.tsx";
import Cart from "./pages/Cart.tsx";
import Category from "./pages/Category.tsx";
import Favorite from "./pages/Favorite.tsx";
import NotFound from "./pages/NotFound.tsx";
import Orders from "./pages/Orders.tsx";
import Product from "./pages/Product.tsx";
import Profile from "./pages/Profile.tsx";
import Success from "./pages/Success.tsx";
import Layout from "./ui/Layout.tsx";
import Stores from "./pages/Stores.tsx";
import ExchangeProgram from "./pages/ExchangeProgram.tsx";
import Personalization from "./pages/Personalization.tsx";
import Size from "./pages/Size.tsx";
import Lend from "./pages/Lend.tsx";
import Blog from "./pages/Blog.tsx";

const RouterLayout = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: "/exchangeProgram",
        element: <ExchangeProgram />,
      },
      {
        path: "/size",
        element: <Size />,
      },
      {
        path: "/lend",
        element: <Lend />,
      },
      {
        path: "/persionalization",
        element: <Personalization />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
