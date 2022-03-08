import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
import axios from "axios";
import { useAppContext, setToken } from "../../Store";
import './Login.css';

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
                    if (error.response) {
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
        <>
            <Outlet />
            <form onSubmit={onSubmit} class="loginForm">
                <div class="loginMainHeader">
                    승객 로그인
                </div>

                <div class="loginContents">
                    <div class="inputCell">
                        <label class="loginLabel">아이디</label>
                        <input onChange={onChange} type="text" name='username' class="loginInput" placeholder="아이디를 입력해 주세요." />
                    </div>
                    <div class="inputCell">
                        <label class="loginLabel">비밀번호</label>
                        <input onChange={onChange} type="password" name='password' class="loginInput" placeholder="비밀번호를 입력해 주세요." />
                    </div>
                    <div class="SaveIdCell">
                        <input type="checkbox" class="checkingSaveId" />
                            <label for="" class="SaveId">아이디 저장</label>
                    </div>
                </div>

                <div class="searchIdAndPw">
                    <a href="searchId.html">
                        <div class="searchId">아이디 찾기</div>
                    </a>
                    <a href="searchPw.html">
                        <div class="searchPw">비밀번호 찾기</div>
                    </a>
                </div>

                <input type="submit" class="loginBtn" value="로그인" />

                    <div class="goSignup">
                        <div class="signCheck">킹버스 아이디가 없으신가요?</div>
                        <a href="../signup/passenger.html">
                            <div class="goSignupLink">회원가입</div>
                        </a>
                    </div>


            </form>
        </>
    )
}

