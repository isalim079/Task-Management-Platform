import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Home/Navbar/Navbar";
import Footer from "../pages/Home/Footer/Footer";
import FloatingWindow from "../pages/FloatingWindow/FloatingWindow";

const Root = () => {

    const location = useLocation()
    const noHeaderFooter = location?.pathname?.includes("/taskDemo")

    return (
        <div>
            <FloatingWindow />
            {
                noHeaderFooter || <Navbar />
            }
            <Outlet />
           {
                noHeaderFooter ||  <Footer />
           }
        </div>
    );
};

export default Root;