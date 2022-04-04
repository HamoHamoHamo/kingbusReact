import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../utils/Routes';
import './Community.css';

export function CommunityForm({ Content }) {
    return (
        <>
            <ul class="communityNav">
                <NavLink to={routes.communityDriver}>
                    <li class="communityNavLi">기사게시판</li>
                </NavLink>
                <NavLink to={routes.communityFree}>
                    <li class="communityNavLi">자유게시판</li>
                </NavLink>
                <NavLink to={routes.communityTravel}>
                    <li class="communityNavLi">여행게시판</li>
                </NavLink>
                <NavLink to={routes.communityPopular}>
                    <li class="communityNavLi">인기게시판</li>
                </NavLink>
            </ul>

            {/* <!-- side interface --> */}
            <div class="communityContents">
                <div class="communitySideContents">
                    <div class="interface">
                        <div class="interfaceTop">
                            <img src="/assets/character.png" alt="킹킹이캐릭터" class="interfaceCharacter" />
                            <div class="userData">
                                <div class="userName">
                                    킹버스
                                    <span>님</span>
                                </div>
                                <a href="mypageMyPost.html">
                                    <div class="mypageBtn">마이페이지</div>
                                </a>
                            </div>
                            <a href="">
                                <img src="/assets/setting.png" alt="설정 아이콘" class="settingIcon" />
                            </a>
                        </div>
                        <div class="interfaceBottom">
                            <div class="userStatus">
                                <div>내가 쓴 글 :
                                    <span>5</span>
                                </div>
                                <div>스크랩 :
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="logoutBtn">로그아웃</div>
                        </div>
                    </div>

                    <form action="" class="searchBoxForm">
                        <div class="searchBox">
                            <input type="text" class="searchBoxInput" />
                            {/* onClick시 submit */}
                            <div class="searchBoxBtn" >
                                <img src="/assets/search.png" />
                            </div>
                            
                        </div>
                    </form>

                    <div class="brieflyposting">
                        <span class="brieflypostingTitle">최신 등록글</span>
                        <div class="posting">
                            <div class="near3">N</div>
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                        <div class="posting">
                            <div class="near3">N</div>
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                        <div class="posting">
                            <div class="near3">N</div>
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                        <div class="posting">
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                    </div>

                    <div class="brieflyposting">
                        <span class="brieflypostingTitle">인기 게시글</span>
                        <div class="posting">
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                        <div class="posting">
                            <div class="near3">N</div>
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                        <div class="posting">
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                        <div class="posting">
                            <span>[자유]</span>
                            킹버스 커뮤니티 첫 글 입니다.
                        </div>
                    </div>
                </div>
                <Content />
            </div>
        </>
    )
}