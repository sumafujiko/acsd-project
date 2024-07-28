import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

// This layout is at the root of the project and contains things that are common across all pages
const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* Outlet is a React-Router-Dom placeholder which different pages will be subbed in for depending on the location */}
      <Outlet />
    </div>
  );
};

export default Layout;