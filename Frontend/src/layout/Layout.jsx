import { Outlet, useLocation } from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";
import Footer from "../components/Footer";
const Layout = () => {
  const location = useLocation();
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <Footer
        fixed={
          location.pathname === "/" ||
          location.pathname === "/updatestudentdetails" ||
          location.pathname === "/studentdetails" ||
          location.pathname === "/deletestudentdetails" ||
          location.pathname === "/searchstudentdetails"
            ? true
            : false
        }
      />
    </>
  );
};

export default Layout;
