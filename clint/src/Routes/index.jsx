import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Product from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Private from "./Authentication/Private";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Public from "./Authentication/Public";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import Category from "../pages/Category";
import CategoryDetails from "../pages/CategoryDetails";
import UserQuestions from "../pages/UserQuestions";
import Addresses from "../pages/Addresses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/products-details/:id/:name",
        element: <ProductDetails />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category-details/:id/:title",
        element: <CategoryDetails />,
      },
      {
        path: "/profile",
        element: <Private />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Private />,
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
      {
        path: "/userquestions",
        element: <Private />,
        children: [
          {
            index: true,
            element: <UserQuestions />,
          },
        ],
      },
      {
        path: "/addresses",
        element: <Private />,
        children: [
          {
            index: true,
            element: <Addresses />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Public />,
        children: [
          {
            index: true,
            element: <Auth />,
          },
        ],
      },
     
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
