import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import "./mainPage.js";
import { useAppContext } from "../store";

function Home() {
    const { store : {isAuthenticated, name} } = useAppContext();
    console.log("CONTEXT", isAuthenticated, name);

    

    return (
        <>
            <div>Home</div>
        </>
    )
}

export default Home;