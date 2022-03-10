import "./AppLayout.css";
import "./Header.css";
import "./Footer.css";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Hamburger.js";

function AppLayout({ children }) {

    

    return (
        <>
            <Header />
            { children }
            
            <Footer />
        </>
    )
}

export default AppLayout;