import React from "react";
import { useAppContext } from "../Store";
import routes from '../utils/Routes';

export default function Header() {
    const { store: { isAuthenticated, name, role } } = useAppContext();

    function ShowUsername() {
        if (isAuthenticated === true) {
            return (
                <div class="headerBtnTool">
                    <div class="headerBtn" >{name}</div>

                </div>
            )
        }
        else {
            return (
                <div class="headerBtnTool">
                    <div class="login headerBtn" tabIndex="0">로그인</div>
                    <div class="signUp headerBtn" tabIndex="0">회원가입</div>
                </div>
            )
        }
    }
    function ShowEstimateOrder(){
        if(role==='d' || role==='d'){

        }
    }
    

    
    
    return (
        <>
            <header>

                <a href="/">
                    <img src="/assets/headerLogo.png" alt="킹버스 로고" />
                </a>


                <ul>
                    <li>
                        {role==='c' || role==='d' && <a href={routes.estimateList}>견적</a>}
                        {!(role==='d' || role==='c') && <a href={routes.orderList}>주문</a>}
                    </li>
                    <li>
                        <a href={routes.communityHome}>커뮤니티</a>
                    </li>
                    <li>
                        <a href="">이벤트</a>
                    </li>
                    <li>
                        <a href="">고객센터</a>
                    </li>
                </ul>


                <ShowUsername />

                <img src="/assets/kingbusHembuger.png" alt="" class="hembugerButton" />
                <img src="/assets/hembugerClose.png" alt="x아이콘" class="hembugerButtonClose displayNone" />
                <div class="hembugerBg" style={{ display: 'none' }}>
                    <div class="hembugerCover"></div>
                    <div class="hembugerMenu">
                        <div class="hembugerBtnTool">
                            <div class="hembugerLogin">로그인</div>
                            <div class="hembugerSignup">회원가입</div>
                        </div>
                        <ul class="hembugerNav">
                            <li>
                                <a href={routes.estimateList}>주문</a>
                            </li>
                            <li>
                                <a href="">커뮤니티</a>
                            </li>
                            <li>
                                <a href="">이벤트</a>
                            </li>
                            <li>
                                <a href="">고객센터</a>
                            </li>
                        </ul>
                        <div class="hembugerLoginBox" style={{display: 'none'}}>
                            <a href={routes.loginUser}>
                                <div class="hembugeroptionBox ontherColor">승객 로그인</div>
                            </a>
                            <a href={routes.loginDriver}>
                                <div class="hembugeroptionBox">기사 로그인</div>
                            </a>
                            <a href={routes.loginCompany}>
                                <div class="hembugeroptionBox">회사 로그인</div>
                            </a>
                            <div class="turnBackHemburger">
                                <img src="/assets/goBack.png" alt="뒤로가기 아이콘" />
                                뒤로가기
                            </div>
                        </div>
                        <div class="hembugerSignupBox" style={{display: 'none'}}>
                            <a href={routes.signupTermUser}>
                                <div class="hembugeroptionBox ontherColor">승객 회원가입</div>
                            </a>
                            <a href={routes.signupTermDriver}>
                                <div class="hembugeroptionBox">기사 회원가입</div>
                            </a>
                            <a href={routes.signupTermCompany}>
                                <div class="hembugeroptionBox">회사 회원가입</div>
                            </a>
                            <div class="turnBackHemburger">
                                <img src="/assets/goBack.png" alt="뒤로가기 아이콘" />
                                뒤로가기
                            </div>
                        </div>
                        <div class="hembugerSignupBox" style={{ display: 'none' }}>
                            <div class="hembugeroptionBox ontherColor">승객 회원가입</div>
                            <div class="hembugeroptionBox">기사 회원가입</div>
                            <div class="hembugeroptionBox">회사 회원가입</div>
                            <div class="turnBackHemburger">
                                <img src="/assets/goBack.png" alt="뒤로가기 아이콘" />
                                뒤로가기
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loginHidden displayNone loginOption">
                    <a href={routes.loginUser}>
                        <div class="loginCell passenger">승객<br/>로그인</div>
                    </a>
                    <a href={routes.loginDriver}>
                        <div class="loginCell loginCellOther">기사<br/>로그인</div>
                    </a>
                    <a href={routes.loginCompany}>
                        <div class="loginCell loginCellOther">회사<br/>로그인</div>
                    </a>
                </div>
                <div class="loginHidden displayNone singupOption">
                    <a href={routes.signupTermUser}>
                        <div class="loginCell passenger">승객<br/>회원가입</div>
                    </a>
                    <a href={routes.signupTermDriver}>
                        <div class="loginCell loginCellOther">기사<br/>회원가입</div>
                    </a>
                    <a href={routes.signupTermCompany}>
                        <div class="loginCell loginCellOther">회사<br/>회원가입</div>
                    </a>
                </div>
            </header>

        </>
    )
}