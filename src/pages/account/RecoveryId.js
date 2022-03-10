import React from "react";
import { NavLink } from "react-router-dom";
import './Recovery.css';

export default function RecoveryId() {
    return (
        <div class="loginForm">

            <div class="loginHeader">
                아이디 찾기
            </div>

            <div class="loginContents searchid">
                <div class="inputCell">
                    <label for="" class="loginLabel">이름</label>
                    <input type="text" id="" class="loginInput" placeholder="이름을 입력해 주세요."/>
                </div>
                <div class="inputCell certification">
                    <label for="" class="loginLabel">전화번호</label>
                    <input type="text" id="" class="loginInput" placeholder="'-' 없이 입력해 주세요."/>
                        <div class="getCertificationNumber">인증번호 받기</div>
                </div>
                <div class="inputCell">
                    <input type="text" id="" class="loginInput notYet" placeholder="인증번호를 입력해 주세요." readonly/>
                </div>
            </div>
            
            <NavLink to='/recovery/id/res'>
                <div class="loginBtn">다음</div>
            </NavLink>

        </div>
    )
}