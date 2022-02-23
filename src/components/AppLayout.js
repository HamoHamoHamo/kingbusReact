import React from "react";
import "./AppLayout.css";
import { useAppContext } from "../store";

function AppLayout({ children }) {
    const { store : {isAuthenticated, name} } = useAppContext();

    function ShowUsername() {
        if (isAuthenticated === true){
            return (
                <ul>{name}</ul>
            )
        }
        else {
            return (
            <ul>
                <li>
                    <a href="/membership/membershipLogin.html" class="membershipHeaderLogin">로그인</a>
                </li>
                <li>
                    <a href="/membership/membership.html">회원가입</a>
                </li>
            </ul>
            )
        }
    }
    return (
        <>
            <header class="membershipHeader">
                <a href="/"><img src="/assets/HeaderLogo.jpg" alt="kingbusLogo" class="membershipKingbusLogo" /></a>
                <nav class="headerMenu">
                    <ul>
                        <li>
                            <a href="/Estimate/estimate.html"><span>견적</span></a>
                        </li>
                        <li>
                            <a href="/community/communityMain.html"><span>커뮤니티</span></a>
                        </li>
                        <li>
                            <a href="/event/event.html"><span>이벤트</span></a>
                        </li>
                        <li>
                            <a href="/customerService/customerService.html"><span>고객센터</span></a>
                        </li>
                    </ul>
                </nav>
                <nav class="headerLogin">
                    {/* <ul>
                        <li>
                            <a href="/membership/membershipLogin.html" class="membershipHeaderLogin">로그인</a>
                        </li>
                        <li>
                            <a href="/membership/membership.html">회원가입</a>
                        </li>
                    </ul> */}
                    <ShowUsername />
                </nav>   
            </header>
            <div class="headerMargin">
                { children }
            </div>
            <footer class="mainFooter">
                <img src="/assets/KingbusRedLogo.jpg" class="mainFooterKingbusLogo" />
                <p class="mainFooterEx">
                    대표 : 김형주<br />
                    주소: 경기 수원시 매송고색로 804번길 190, 1층<br />
                    Tel. 1544-9145  ㅣ E-mail. kingbus7111@gmail.com
                </p>
            </footer>
        </>
    )
}

export default AppLayout;