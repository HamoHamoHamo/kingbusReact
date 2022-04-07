import React, { useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Api, IP } from "../../utils/Api";
import axios from "axios";
import { useAppContext, setToken } from "../../Store";
import './Login.css';

export function LoginUser() {
    
    return (
        <Login role={'u'} str={'승객'} />
    )
}

export function LoginCompany() {

    return (
        <Login role={'c'} str={'회사'} />
    )
}

export function LoginDriver() {
    
    return (
        <Login role={'d'} str={'기사'} />
    )
}



export function Login({ role, str }) {
    const { dispatch } = useAppContext();
    let navigate = useNavigate();
    const [fieldError, setFieldError] = useState('');
    const usernameRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("RRRRRROOLE", role);

        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            role
        };

        async function fn() {
            setFieldError('');
            const URL = `${IP}/login`;
            const response = axios.post(URL, data)
                .then(response => {
                    const {
                        data: {
                            refresh: refreshToken,
                            access: accessToken,
                            authenticatedUser: { name, role }
                        }
                    } = response;
                    console.log("RESOPNONSE", response);
                    console.log("로그인 완료 토큰", refreshToken, accessToken, "이름", name);
                    dispatch(setToken({ refreshToken, name, role }));
                    Api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                    window.location.href = '/';
                })
                .catch(error => {
                    console.log("ERROR", error.response);
                    if (error.response) {
                        const { data: fieldsErrorMessages } = error.response;
                        // fieldsErrorMessages = > { username : "m1 m2", password: [] }
                        const errors = Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = errors.join(" ")
                                return acc;
                            },
                            {}
                        )
                        console.log("ERRRORS", errors);
                        if(errors.username){
                            setFieldError('아이디를 입력해 주세요.');
                        }
                        else if (errors.password){
                            setFieldError('비밀번호를 입력해 주세요.');
                        }
                        else if (errors.non_field_errors === 'Invalid login credentials'){
                            setFieldError('아이디 또는 비밀번호가 일치하지 않습니다.');
                        }
                        console.log(fieldError);
                        //navigate(url);   
                    }
                });
        }
        fn();
    }

    return (
        <>
            <form onSubmit={onSubmit} class="loginForm">
                <div class="loginMainHeader">
                    {str} 로그인
                </div>

                <div class="loginContents">
                    <div class="LoginInputCell">
                        <label class="loginLabel">아이디</label>
                        <input ref={usernameRef} type="text" name='username' class="loginInput" placeholder="아이디를 입력해 주세요." />
                    </div>
                    <div class="LoginInputCell">
                        <label class="loginLabel">비밀번호</label>
                        <input ref={passwordRef} type="password" name='password' class="loginInput" placeholder="비밀번호를 입력해 주세요." />
                    </div>
                    <div class="SaveIdCell">
                        <input type="checkbox" class="checkingSaveId" />
                        <label for="" class="SaveId">아이디 저장</label>
                    </div>
                </div>

                {fieldError && <div class="loginErrorText">{fieldError}</div>}

                <div class="searchIdAndPw">
                    <NavLink to="/recovery/id">
                        <div class="searchId">아이디 찾기</div>
                    </NavLink>
                    <NavLink to="/recovery/password">
                        <div class="searchPw">비밀번호 찾기</div>
                    </NavLink>
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

