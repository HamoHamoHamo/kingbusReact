import React, { useEffect, useState, useRef } from 'react';
import routes from '../../utils/Routes';

export function CommunityNav() {
    return (
        <ul class="communityNav">
            <a href="driverPost.html">
                <li class="communityNavLi">기사게시판</li>
            </a>
            <a href="freepost.html">
                <li class="communityNavLi">자유게시판</li>
            </a>
            <a href="tripPost.html">
                <li class="communityNavLi">여행게시판</li>
            </a>
            <a href="hotPost.html">
                <li class="communityNavLi">인기게시판</li>
            </a>
        </ul>
    )
}