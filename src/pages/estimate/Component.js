import React, { useEffect, useState } from 'react';

export function OrderInfo({ data, idx=0 }) {
    const {
        arrival,
        arrival_short,
        comeback_date,
        comeback_time,
        departure,
        departure_short,
        departure_date,
        departure_time,
        convenience,
        driver_schedule,
        is_driver,
        purpose,
        reference,
        stopover,
        total_number,
        way
    } = data ? data : undefined;
    const stopoverList = stopover.split(',');
    const stopoverCnt = stopover === '' ? 0 : stopoverList.length;
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = (date) => {
        return week[new Date(date).getDay()]
    };

    const onClickInfo = (idx) => {
        console.log("class length", document.querySelectorAll('.topOrderMoreInfor')[idx].classList.length);
        const qry = document.querySelectorAll('.topOrderMoreInfor')[idx];
        const imgQry = document.querySelectorAll(".moreInforBtn img")[idx];
        if (qry.classList.length === 1) {
            qry.classList.add('displayNone');
            imgQry.style.transform = "rotate(0deg)";
        }
        else {
            qry.classList.remove('displayNone');
            imgQry.style.transform = "rotate(180deg)";
        }
    }

    return (
        <>
            <div class="topOrderMainInfor">
                <div class="startInfor">
                    <div class="start">출발</div>
                    <div class="startInforCell">
                        <div class="startInforPlace">{departure_short}</div>
                        <span class="startInforDate">{departure_date}{` (${dayOfWeek(departure_date)})`} {departure_time.slice(0, -3)}</span>
                    </div>
                </div>

                <div class="wayPointInfor">
                    <div class="wayPoint">{`경유지 ${stopoverCnt}`}</div>
                    {/* <div class="wayPointicon">
                                    {way === 'st' &&
                                        <img src="/assets/stArrow.png" />
                                    }
                                    {way === 'lt' &&
                                        <img src="/assets/ltArrow.png" />
                                    }
                                    
                                </div> */}
                    <div class="wayPointInforBox">
                        <div class="wayPointInforCell">
                            {way === 'lt' &&
                                <img src="/assets/aroundTrip.png" alt="왕복 아이콘" class="roundTrip" />
                            }
                            {way === 'st' &&
                                <img src="/assets/oneway.png" alt="편도 아이콘" class="roundTrip" />
                            }

                            <span>{way === 'st' ? '편도' : '왕복'}</span>
                        </div>
                        <div class="kilometer">약 999km </div>
                    </div>
                </div>

                <div class="startInfor">
                    <div class="start">{way === 'st' ? '도착' : '복귀'}</div>
                    <div class="startInforCell">
                        <div class="startInforPlace">{arrival_short}</div>
                        <span class="startInforDate">{comeback_date}{comeback_date && ` (${dayOfWeek(comeback_date)})`} {comeback_time && comeback_time.slice(0, -3)}</span>
                    </div>
                </div>
            </div>

            <div class="topOrderSubInfor">
                <div class="morInforCell">
                    <div class="morInforPeople">
                        {/* <img src="/assets/peopleIcon.png" alt="" /> */}

                        <span class="infoBoxBottomText">{total_number}명</span>
                    </div>
                    <div class="morInforPurpose">
                        {/* <img src="/assets/purpose.png" alt="" /> */}

                        <span class="infoBoxBottomText">{purpose}</span>
                    </div>
                    {is_driver &&
                        <div class="morInforDriver">
                            {/* <img src="/assets/driverIcon.png" alt="" /> */}
                            <span class="infoBoxBottomText">기사동행</span>
                        </div>}
                </div>
                <div onClick={() => { onClickInfo(idx) }} class="moreInforBtn">
                    <span>추가정보</span>
                    <img src="/assets/downArrow.png" alt="아래 화살표 아이콘" />
                </div>
            </div>

            <div class='topOrderMoreInfor displayNone'>
                <div class="waypointList">
                    <div class="waypointLine"></div>
                    <div class="waypointBox">
                        <img class="waypointLocation" src="/assets/locationRed.png" />
                        <div class="waypointMargin waypointTitle">{departure}</div>
                    </div>
                    {stopover && stopoverList.map((data) => {
                        return (
                            <div class="waypointBox">
                                <div class="waypointCircle"></div>
                                <div class="waypointMargin addWaypoint">{data}</div>
                            </div>

                        )
                    })}
                    <div class="waypointBox">
                        <img class="waypointLocation" src="/assets/locationRed.png" />
                        <div class="waypointMargin waypointTitle">{arrival}</div>
                    </div>
                </div>
                <div class="topOrderMoreInforBox">
                    <div class="FacilitiesCell">
                        {convenience.includes('미니냉장고') &&
                            <div class="Facilities">
                                <img src="/assets/refrigerator.png" alt="" />
                                <span>미니냉장고</span>
                            </div>
                        }
                        {convenience.includes('와이파이') &&
                            <div class="Facilities">
                                <img src="/assets/wifi.png" alt="" />
                                <span>와이파이</span>
                            </div>
                        }
                        {convenience.includes('USB포트') &&
                            <div class="Facilities">
                                <img src="/assets/usb.png" alt="" />
                                <span>USB포트</span>
                            </div>
                        }
                        {convenience.includes('음향기기') &&
                            <div class="Facilities">
                                <img src="/assets/music.png" alt="" />
                                <span>음향기기</span>
                            </div>
                        }
                        {convenience.includes('커피 메이커') &&
                            <div class="Facilities">
                                <img src="/assets/cup.png" alt="" />
                                <span>커피메이커</span>
                            </div>
                        }
                        {convenience.includes('영화관람') &&
                            <div class="Facilities">
                                <img src="/assets/movie.png" alt="" />
                                <span>영화관람</span>
                            </div>
                        }
                    </div>
                    <div class="additionalRequestCell" placeholder="추가요청사항">{reference}</div>
                </div>
            </div>
        </>
    )
}




