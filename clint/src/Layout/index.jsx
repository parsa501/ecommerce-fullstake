import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar className="bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl" />
      <main className="min-h-[60Vh]">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
