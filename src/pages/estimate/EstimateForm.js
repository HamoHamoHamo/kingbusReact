import React from 'react';
import './Estimate.css';
import './estimateActive.js';

export default function EstimateForm({ Content }) {
    return (
        <>
            <div class="topOrder">
                <div class="topOrderPageName">주문리스트</div>
            </div>
            <div class="mainContainer">


                <div class="sidemenuContainer">
                    
                    <div class="hiddenFilter">
                        <div class="filterBox">
                            <div class="filterBoxTitle">기간</div>
                            <div class="filterInput">
                                <input type="date" />
                                <span>~</span>
                                <input type="date" />
                            </div>
                            </div>
                            <div class="filterBox">
                                <div class="filterBoxTitle">출발지</div>
                                <div class="filterInput">
                                    <input />
                                </div>
                                <span>*시/군 단위로 검색이 가능합니다.</span>
                            </div>
                            <div class="filterBox">
                                <div class="filterBoxTitle">도착지</div>
                                <div class="filterInput">
                                    <input />
                                </div>
                                <span>*시/군 단위로 검색이 가능합니다.</span>
                            </div>
                            <div class="filterBox">
                                <div class="filterBoxTitle">인원수</div>
                                <div class="filterInput peopleFilter">
                                    <div class="peopleCell checkThis">상관없음</div>
                                    <div class="peopleCell notThis">10인 이상</div>
                                    <div class="peopleCell notThis">20인이상</div>
                                    <div class="peopleCell notThis">30인이상</div>
                                    <div class="peopleCell notThis">40인 이상</div>
                                </div>
                            </div>
                            <div class="filterSearchBtn">검색하기</div>
                        </div>
                        <div class="visibleFilterBtn">
                            <img src="/assets/filter.png" alt="필터 아이콘" />
                                검색필터
                        </div>
                    </div>
                    <Content />
                </div>
            </>
            )
}