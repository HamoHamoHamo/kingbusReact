import React, { useEffect, useState, useRef } from 'react';
import { Api } from '../../utils/Api';
import routes from '../../utils/Routes';
import { CommunityForm } from './Component';

export default function Community() {
    function Content() {
        return (
            <div class="communityMainContents">
                <div class="eventSlide">
                    <div class="eventSlideBox">
                        <img src="/assets/trust.png" alt="" />
                        <img src="/assets/trust.png" alt="" />
                        <img src="/assets/trust.png" alt="" />
                        <img src="/assets/trust.png" alt="" />
                        <img src="/assets/trust.png" alt="" />
                    </div>
                </div>
                <div class="postingArea">
                    <div class="postingAreaheader">
                        <img src="/assets/fire.png" alt="불 아이콘" />
                        <div class="postingAreaTitleHot">인기게시판</div>
                        <a href="">
                            <div class="morePosting">더보기</div>
                        </a>
                    </div>
                    <div class="postingAreaBody">
                        <div class="post">
                            <div class="postTitle">첫번째 인기 게시글 입니다.</div>
                            <div class="postDate">2022.03.21</div>
                        </div>
                    </div>
                </div>
                <div class="postingArea">
                    <div class="postingAreaheader">
                        <img src="/assets/person.png" alt="사람 아이콘" />
                        <div class="postingAreaTitle">기사게시판</div>
                        <a href="">
                            <div class="morePosting">더보기</div>
                        </a>
                    </div>
                    <div class="postingAreaBody">
                        <div class="post">
                            <div class="postTitle">첫번째 인기 게시글 입니다.</div>
                            <div class="postDate">2022.03.21</div>
                        </div>
                    </div>
                </div>
                <div class="postingArea">
                    <div class="postingAreaheader">
                        <img src="/assets/hipchat.png" alt="말풍선 아이콘" />
                        <div class="postingAreaTitle">자유게시판</div>
                        <a href="">
                            <div class="morePosting">더보기</div>
                        </a>
                    </div>
                    <div class="postingAreaBody">
                        <div class="post">
                            <div class="postTitle">첫번째 인기 게시글 입니다.</div>
                            <div class="postDate">2022.03.21</div>
                        </div>
                    </div>
                </div>
                <div class="postingArea">
                    <div class="postingAreaheader">
                        <img src="/assets/airplane.png" alt="비행기 아이콘" />
                        <div class="postingAreaTitle">여행게시판</div>
                        <a href="">
                            <div class="morePosting">더보기</div>
                        </a>
                    </div>
                    <div class="postingAreaBody">
                        <div class="post">
                            <div class="postTitle">첫번째 인기 게시글 입니다.</div>
                            <div class="postDate">2022.03.21</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <CommunityForm Content={Content} />

        </>
    )
}