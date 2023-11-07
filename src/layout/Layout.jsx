import { Outlet } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Layout = () => {
    useEffect(() => {
        document.body.style.minHeight = "100dvh"
        Aos.init(
            { duration: 1200 }
        );
    }, [])
    return (
        <div>
            <Navbar><Outlet /></Navbar>
        </div>
    );
}

export default Layout;