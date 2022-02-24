import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
import axios from "axios";
import { useAppContext, setToken } from "../../store";

export function LoginUser() {
    return (
        <div>
            User
            
        </div>
    )
}

export function LoginCompany() {
    // const context = useOutletContext();
    return (
        <div>
            company
        </div>
    )
}

export function LoginDriver(user) {
    return (
        <div>
            Driver
            
        </div>
    )
}

export function Login() {
    const { dispatch } = useAppContext();
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
        // console.log(inputs);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        async function fn() {
            setFieldErrors({});
            const URL = `http://localhost:5000/login`;
            const response = axios.post(URL, inputs)
            .then(response => {
                alert("로그인 완료");
                const {
                    data: {
                        refresh: refreshToken, 
                        access: accessToken,
                        authenticatedUser: { name }
                    }
                } = response;
                console.log("RESOPNONSE", response);
                console.log("로그인 완료 토큰", refreshToken, accessToken, "이름", name);
                dispatch(setToken({ refreshToken, name }));
                Api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                navigate("/");
            })
            .catch(error => {
                console.log("ERROR", error.response);
                if ( error.response ) {
                    const { data: fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages = > { username : "m1 m2", password: [] }
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = errors.join(" ")
                                
                                return acc;
                            },
                            {}
                        )
                    )
                    console.log("ERRRORS", fieldErrors);
                }
                
            });
        }
        fn();
    }
    
    return (
        <div style={{height: '50rem', display: "flex", alignItems: "center"}}>
            <Outlet />
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" name="username" placeholder="id" />
                <input onChange={onChange} type="password" name="password" placeholder="pw" />
                <input onChange={onChange} type="text" name="role" placeholder="role" />
                <input type="submit" />
            </form>
        </div>
    )
}

