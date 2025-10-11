import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Posts from "../Pages/Post";
import Home from "../Pages/Home";
import Category from "../Pages/Category";
import GetAllPost from "../Pages/Post/GetAll";
import UpdatePost from "../Pages/Post/Update";
import CreatePost from "../Pages/Post/Create";
import GetAllCategory from "../Pages/Category/GetAll";
import UpdateCategory from "../Pages/Category/Update";
import CreateCategory from "../Pages/Category/Create";
import Login from "../Pages/Login";
import UserAll from "../Pages/User/GetAll";
import UpdateUser from "../Pages/User/Update";
import User from "../Pages/User";
import Comments from "../Pages/Comments";
import GetAllComments from "../Pages/Comments/GetAll";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: <User />,
        children: [
          {
            index: true,
            element: <UserAll />,
          },
          {
            path: "update/:id",
            element: <UpdateUser />,
          },
        ],
      },
      {
        path: "post",
        element: <Posts />,
        children: [
          {
            index: true,
            element: <GetAllPost />,
          },
          {
            path: "update/:id",
            element: <UpdatePost />,
          },
          {
            path: "create",
            element: <CreatePost />,
          },
        ],
      },
      {
        path: "comments",
        element: <Comments />,
        children: [
          {
            index: true,
            element: <GetAllComments />,
          },
        ],
      },
      {
        path: "category",
        element: <Category />,
        children: [
          {
            index: true,
            element: <GetAllCategory />,
          },
          {
            path: "update/:id",
            element: <UpdateCategory />,
          },
          {
            path: "create",
            element: <CreateCategory />,
          },
        ],
      },
    ],
  },
]);

export default router;
