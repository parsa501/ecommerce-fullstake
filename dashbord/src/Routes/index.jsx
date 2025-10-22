import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import UserAll from "../Pages/User/GetAll";
import UpdateUser from "../Pages/User/Update";
import User from "../Pages/User";
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
        path: "address",
        element: <Address />,
        children: [
          {
            index: true,
            element: <GetAllAddress />,
          },
          {
            path: "update/:id",
            element: <UpdateAddress />,
          },
          {
            path: "create",
            element: <CreateAddress />,
          },
        ],
      },
      {
        path: "brands",
        element: <Brands />,
        children: [
          {
            index: true,
            element: <GetAllBrands />,
          },
          {
            path: "update/:id",
            element: <UpdateBrands />,
          },
          {
            path: "create",
            element: <CreateBrands />,
          },
        ],
      },
      {
        path: "banner",
        element: <Banner />,
        children: [
          {
            index: true,
            element: <GetAllBanner />,
          },
          {
            path: "update/:id",
            element: <UpdateBanner />,
          },
          {
            path: "create",
            element: <CreateBanner />,
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
      {
        path: "slider",
        element: <Slider />,
        children: [
          {
            index: true,
            element: <GetAllSlider />,
          },
          {
            path: "update/:id",
            element: <UpdateSlider />,
          },
          {
            path: "create",
            element: <CreateSlider />,
          },
        ],
      },
      {
        path: "variants",
        element: <Variants />,
        children: [
          {
            index: true,
            element: <GetAllVariants />,
          },
          {
            path: "update/:id",
            element: <UpdateVariants />,
          },
          {
            path: "create",
            element: <CreateVariants />,
          },
        ],
      },
      {
        path: "product",
        element: <Product />,
        children: [
          {
            index: true,
            element: <GetAllProduct />,
          },
          {
            path: "update/:id",
            element: <UpdateProduct />,
          },
          {
            path: "create",
            element: <CreateProduct />,
          },
        ],
      },
      {
        path: "product-variants",
        element: <ProductVariants />,
        children: [
          {
            index: true,
            element: <GetAllProductVariants />,
          },
          {
            path: "update/:id",
            element: <UpdateProductVariants />,
          },
          {
            path: "create",
            element: <CreateProductVariants />,
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
          {
            path: "update/:id",
            element: <UpdateComments />,
          },
          {
            path: "create",
            element: <CreateComments />,
          },
        ],
      },
      {
        path: "discount",
        element: <Discount />,
        children: [
          {
            index: true,
            element: <GetAllDiscount />,
          },
          {
            path: "update/:id",
            element: <UpdateDiscount />,
          },
          {
            path: "create",
            element: <CreateDiscount />,
          },
        ],
      },
      {
        path: "orders",
        element: <Orders />,
        children: [
          {
            index: true,
            element: <GetAllOrders />,
          },
          {
            path: "update/:id",
            element: <UpdateOrders />,
          },
          {
            path: "create",
            element: <CreateOrders />,
          },
        ],
      },
      {
        path: "faq",
        element: <FAQ />,
        children: [
          {
            index: true,
            element: <GetAllFAQ />,
          },
          {
            path: "update/:id",
            element: <UpdateFAQ />,
          },
          {
            path: "create",
            element: <CreateFAQ />,
          },
        ],
      },
      {
        path: "testimonial",
        element: <Testimonial />,
        children: [
          {
            index: true,
            element: <GetAllTestimonial />,
          },
          {
            path: "update/:id",
            element: <UpdateTestimonial />,
          },
          {
            path: "create",
            element: <CreateTestimonial />,
          },
        ],
      },
      {
        path: "user-question",
        element: <UserQuestion />,
        children: [
          {
            index: true,
            element: <GetAllUserQuestion />,
          },
          {
            path: "update/:id",
            element: <UpdateUserQuestion />,
          },
          {
            path: "create",
            element: <CreateUserQuestion />,
          },
        ],
      },
      {
        path: "report",
        element: <Report />,
        children: [
          {
            index: true,
            element: <GetAllReport />,
          },
        ],
      },
    ],
  },
]);

export default router;
