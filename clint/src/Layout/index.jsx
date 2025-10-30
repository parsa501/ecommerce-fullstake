import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className="min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[80vh] font-[Vazir]"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
