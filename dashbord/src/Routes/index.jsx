import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import UserAll from "../Pages/User/GetAll";
import UpdateUser from "../Pages/User/Update";
import User from "../Pages/User";
import Address from "../Pages/Address";
import GetAllAddress from "../Pages/Address/GatAll";
import UpdateAddress from "../Pages/Address/Update";
import CreateAddress from "../Pages/Address/Create";
import Brands from "../Pages/Brands";
import GetAllBrands from "../Pages/Brands/GatAll";
import UpdateBrands from "../Pages/Brands/Update";
import CreateBrands from "../Pages/Brands/Create";
import Banner from "../Pages/Banner";
import GetAllBanner from "../Pages/Banner/GatAll";
import UpdateBanner from "../Pages/Banner/Update";
import CreateBanner from "../Pages/Banner/Create";
import Category from "../Pages/Category";
import GetAllCategory from "../Pages/Category/GatAll";
import UpdateCategory from "../Pages/Category/Update";
import CreateCategory from "../Pages/Category/Create";
import Slider from "../Pages/Slider";
import GetAllSlider from "../Pages/Slider/GatAll";
import CreateSlider from "../Pages/Slider/Create";
import Variants from "../Pages/Variants";
import GetAllVariants from "../Pages/Variants/GatAll";
import UpdateVariants from "../Pages/Variants/Update";
import CreateVariants from "../Pages/Variants/Create";
import Product from "../Pages/Product";
import GetAllProduct from "../Pages/Product/GatAll";
import UpdateProduct from "../Pages/Product/Update";
import CreateProduct from "../Pages/Product/Create";
import ProductVariants from "../Pages/ProductVariants";
import GetAllProductVariants from "../Pages/ProductVariants/GatAll";
import UpdateProductVariants from "../Pages/ProductVariants/Update";
import CreateProductVariants from "../Pages/ProductVariants/Create";
import Comments from "../Pages/Comments";
import GetAllComments from "../Pages/Comments/GatAll";
import UpdateComments from "../Pages/Comments/Update";
import CreateComments from "../Pages/Comments/Create";
import Discount from "../Pages/Discount";
import GetAllDiscount from "../Pages/Discount/GatAll";
import UpdateDiscount from "../Pages/Discount/Update";
import CreateDiscount from "../Pages/Discount/Create";
import Orders from "../Pages/Orders";
import GetAllOrders from "../Pages/Orders/GatAll";
import UpdateOrders from "../Pages/Orders/Update";
import CreateOrders from "../Pages/Orders/Create";
import FAQ from "../Pages/FAQ";
import GetAllFAQ from "../Pages/FAQ/GatAll";
import UpdateFAQ from "../Pages/FAQ/Update";
import CreateFAQ from "../Pages/FAQ/Create";
import Testimonial from "../Pages/Testimonial";
import GetAllTestimonial from "../Pages/Testimonial/GatAll";
import UpdateTestimonial from "../Pages/Testimonial/Update";
import CreateTestimonial from "../Pages/Testimonial/Create";
import UserQuestion from "../Pages/UserQuestion";
import GetAllUserQuestion from "../Pages/UserQuestion/GatAll";
import UpdateUserQuestion from "../Pages/UserQuestion/Update";
import CreateUserQuestion from "../Pages/UserQuestion/Create";
import Report from "../Pages/Report";
import GetAllReport from "../Pages/Report/GatAll";
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
