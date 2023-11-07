import { Outlet } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const Layout = () => {
    useEffect(() => {
        Aos.init(
            { duration: 1200 }
        );
    }, [])
    return ( 
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
     );
}
 
export default Layout;