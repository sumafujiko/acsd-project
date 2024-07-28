import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// This layout is at the root of the project and contains things that are common across all pages
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      {/* Outlet is a React-Router-Dom placeholder which different pages will be subbed in for depending on the location */}
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;