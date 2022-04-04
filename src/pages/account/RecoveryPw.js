import React from "react";

export default function RecoveryPassword() {
    return (
        
        <div class="loginForm">

            <div class="loginHeader">
                비밀번호 찾기
            </div>

            <div class="loginContents searchid">
                <div class="inputCell">
                    <label for="" class="loginLabel">아이디</label>
                    <input type="text" id="" class="loginInput" placeholder="아이디를 입력해 주세요."/>
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

            <a href="makeNewPW.html">
                <div class="loginBtn">다음</div>
            </a>

        </div>
    )
}