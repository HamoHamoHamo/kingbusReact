import React from "react";
import { Outlet } from "react-router-dom";

export default function SignupUser() {
    return (
        <div>
            <Outlet />
            <input placeholder="id" />
            <input placeholder="pw" />
        </div>
    )
}