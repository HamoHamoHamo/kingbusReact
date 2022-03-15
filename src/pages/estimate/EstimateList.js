import React, { useEffect, useState, useRef } from 'react';
import Estimate from './Estimate';
import { Api } from '../../utils/Api';

export default function EstimateList() {
    const [datas, setDatas] = useState({});
    useEffect(() => {
        async function getData() {
            try {
                const response = await Api.get('orderlist');
                console.log('test');
                console.log("RES", response);
                const { data: { count, results } } = response;
                console.log("CCC", count, results);
                setDatas(() => ({
                    count,
                    results
                }));
                // content({ count, results });
            }
            catch (err) {
                console.log("err",);
            }
        }
        getData();
    }, []);


    function Content() {
        //const infoRef = useRef();
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = (date) => {
            return week[new Date(date).getDay()]
        };

        const onClickInfo = (idx) => {
            console.log("class length", document.querySelectorAll('.topOrderMoreInfor')[idx].classList.length);
            const qry = document.querySelectorAll('.topOrderMoreInfor')[idx];
            const imgQry = document.querySelectorAll(".moreInforBtn img")[idx];
            if(qry.classList.length === 1) {
                qry.classList.add('displayNone');
                imgQry.style.transform = "rotate(0deg)";
            }
            else{
                qry.classList.remove('displayNone');
                imgQry.style.transform = "rotate(180deg)";
            }
        }
        const onBlur = (e, idx) => {
            const container = document.querySelectorAll(".orderContainerPlusBtn")[idx];
            const button = document.querySelectorAll(".createEstimate")[idx];
            container.classList.remove('CreateBtnfocusIn')
            container.classList.add('CreateBtnfocusOut')
            button.classList.add('displayNone');

            e.target.style.margin = "0";
        }

        const onFocus = (e, idx) => {
            const container = document.querySelectorAll(".orderContainerPlusBtn")[idx];
            const button = document.querySelectorAll(".createEstimate")[idx];
            container.classList.remove('CreateBtnfocusOut')
            container.classList.add('CreateBtnfocusIn')
            button.classList.remove('displayNone');

            e.target.style.margin = "-0.1rem 0 10rem -0.1rem";

        }
        const dataContent = datas.results && datas.results.map((data, idx) => {
            const { orders: { 
                arrival,
                arrival_date,
                arrival_time,
                departure,
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
            } } = data
            // console.log("ORDER", orders);
            const stopoverList = stopover.split(',');
            const stopoverCnt = stopover === '' ? 0 : stopoverList.length;
            // console.log("STOPOVER CNT", stopoverCnt);
            return (
                <div onBlur={(e) => {onBlur(e, idx)}} onFocus={(e) => {onFocus(e, idx)}} class="bothLinkBox" tabIndex="0" key={data.order}>
                    <div class="orderContainerPlusBtn">

                        <div class="topOrderMainInfor">
                            <div class="startInfor">
                                <div class="start">출발</div>
                                <div class="startInforCell">
                                    <span class="startInforDate">{departure_date}{` (${dayOfWeek(departure_date)})`}</span>
                                    <span class="startInforTime">{departure_time.slice(0,-3)}</span>
                                    <div class="startInforPlace">{departure}</div>
                                </div>
                            </div>

                            <div class="wayPointInfor">
                                <div class="wayPoint">{`경유지 ${stopoverCnt}`}</div>
                                <div class="wayPointicon">
                                    <img src="/assets/watpointIcon.png" alt="경유지 표시선 아이콘" />
                                    <div class="wayPointDotCell">
                                        <div class="wayPointDot"></div>
                                    </div>
                                </div>
                                <div class="wayPointInforBox">
                                    <div class="wayPointInforCell">
                                        <img src="/assets/aroundTrip.png" alt="왕복 아이콘" class="roundTrip" />
                                        <img src="/assets/oneway.png" alt="편도 아이콘" class="roundTrip displayNone" />
                                        <span>{way === 'st' ? '편도' : '왕복'}</span>
                                    </div>
                                    <div class="kilometer">약 999km </div>
                                </div>
                            </div>

                            <div class="endInfor">
                                <div class="endInforCell">
                                    <span class="endInforDate">{arrival_date}{` (${dayOfWeek(arrival_date)})`}</span>
                                    <span class="endInforTime">{arrival_time && arrival_time.slice(0,-3)}</span>
                                    <div class="endInforPlace">{arrival}</div>
                                </div>
                                <div class="end">도착</div>
                            </div>
                        </div>

                        <div class="topOrderSubInfor">
                            <div class="morInforCell">
                                <div class="morInforPeople">
                                    <img src="/assets/peopleIcon.png" alt="" />
                                    <span>인원수</span>
                                    <span>24명</span>
                                </div>
                                <div class="morInforPurpose">
                                    <img src="/assets/purpose.png" alt="" />
                                    <span>목적</span>
                                    <span>워크샵</span>
                                </div>
                                <div class="morInforDriver">
                                    <img src="/assets/driverIcon.png" alt="" />
                                    <span>기사동행</span>
                                </div>
                            </div>
                            <div onClick={() => {onClickInfo(idx)}} class="moreInforBtn">
                                <span>추가정보</span>
                                <img src="/assets/downArrow.png" alt="아래 화살표 아이콘" />
                            </div>
                        </div>

                        <div class='topOrderMoreInfor displayNone'>
                            <div class="waypointList">
                                <span>전라북도 군산시 의료원로 147</span>
                                <img src="/assets/waypointLink.png" alt="연결선 아이콘" />
                                <div class="addWaypoint">전라북도 군산시 입국심사대</div>
                                <img src="/assets/waypointLink.png" alt="연결선 아이콘" />
                                <span>경기도 수원시 권선구 고색동 659-3</span>
                            </div>
                            <div class="topOrderMoreInforBox">
                                <div class="FacilitiesCell">
                                    <div class="Facilities">
                                        <img src="/assets/refrigerator.png" alt="" />
                                        <span>미니 냉장고</span>
                                    </div>
                                    <div class="Facilities">
                                        <img src="/assets/wifi.png" alt="" />
                                        <span>와이파이</span>
                                    </div>
                                    <div class="Facilities">
                                        <img src="/assets/usb.png" alt="" />
                                        <span>USB 포트</span>
                                    </div>
                                    <div class="Facilities">
                                        <img src="/assets/music.png" alt="" />
                                        <span>음향기기</span>
                                    </div>
                                    <div class="Facilities">
                                        <img src="/assets/cup.png" alt="" />
                                        <span>커피메이커</span>
                                    </div>
                                    <div class="Facilities">
                                        <img src="/assets/movie.png" alt="" />
                                        <span>영화관람</span>
                                    </div>
                                </div>
                                <textarea class="additionalRequestCell" placeholder="추가요청사항" readonly></textarea>
                            </div>
                        </div>
                    </div>
                    <a href="estimateCreate.html">
                        <button class="createEstimate displayNone">견적 등록하기</button>
                    </a>
                </div>
            )
        })
        return (
            <div class="mainContentsArea">
                <div class="orderStatus">
                    총 <span>{datas.count}건의 주문</span> 신청이 있습니다.
                </div>
                {dataContent}
                
            </div>
        )
    }

    // const content = datas.results.map(data => {
    //     const { orders } = data
    //     return (
    //         <div class="bothLinkBox" tabIndex="0">
    //             <div class="orderContainerPlusBtn">

    //                 <div class="topOrderMainInfor">
    //                     <div class="startInfor">
    //                         <div class="start">출발</div>
    //                         <div class="startInforCell">
    //                             <span class="startInforDate">{orders.departure_date}</span>
    //                             <span class="startInforTime">{orders.departure_time}</span>
    //                             <div class="startInforPlace">{orders.departure}</div>
    //                         </div>
    //                     </div>

    //                     <div class="wayPointInfor">
    //                         <div class="wayPoint">경유지9</div>
    //                         <div class="wayPointicon">
    //                             <img src="/assets/watpointIcon.png" alt="경유지 표시선 아이콘" />
    //                             <div class="wayPointDotCell">
    //                                 <div class="wayPointDot"></div>
    //                             </div>
    //                         </div>
    //                         <div class="wayPointInforBox">
    //                             <div class="wayPointInforCell">
    //                                 <img src="/assets/aroundTrip.png" alt="왕복 아이콘" class="roundTrip" />
    //                                 <img src="/assets/oneway.png" alt="편도 아이콘" class="roundTrip displayNone" />
    //                                 <span>왕복</span>
    //                             </div>
    //                             <div class="kilometer">약 999km </div>
    //                         </div>
    //                     </div>

    //                     <div class="endInfor">
    //                         <div class="endInforCell">
    //                             <span class="endInforDate">2022.02.10(목)</span>
    //                             <span class="endInforTime">18:30</span>
    //                             <div class="endInforPlace">경기도 수원시 권선구 고색동 659-3</div>
    //                         </div>
    //                         <div class="end">도착</div>
    //                     </div>
    //                 </div>

    //                 <div class="topOrderSubInfor">
    //                     <div class="morInforCell">
    //                         <div class="morInforPeople">
    //                             <img src="/assets/peopleIcon.png" alt="" />
    //                             <span>인원수</span>
    //                             <span>24명</span>
    //                         </div>
    //                         <div class="morInforPurpose">
    //                             <img src="/assets/purpose.png" alt="" />
    //                             <span>목적</span>
    //                             <span>워크샵</span>
    //                         </div>
    //                         <div class="morInforDriver">
    //                             <img src="/assets/driverIcon.png" alt="" />
    //                             <span>기사동행</span>
    //                         </div>
    //                     </div>
    //                     <div class="moreInforBtn">
    //                         <span>추가정보</span>
    //                         <img src="/assets/downArrow.png" alt="아래 화살표 아이콘" />
    //                     </div>
    //                 </div>

    //                 <div class="topOrderMoreInfor displayNone">
    //                     <div class="waypointList">
    //                         <span>전라북도 군산시 의료원로 147</span>
    //                         <img src="/assets/waypointLink.png" alt="연결선 아이콘" />
    //                         <div class="addWaypoint">전라북도 군산시 입국심사대</div>
    //                         <img src="/assets/waypointLink.png" alt="연결선 아이콘" />
    //                         <span>경기도 수원시 권선구 고색동 659-3</span>
    //                     </div>
    //                     <div class="topOrderMoreInforBox">
    //                         <div class="FacilitiesCell">
    //                             <div class="Facilities">
    //                                 <img src="/assets/refrigerator.png" alt="" />
    //                                 <span>미니 냉장고</span>
    //                             </div>
    //                             <div class="Facilities">
    //                                 <img src="/assets/wifi.png" alt="" />
    //                                 <span>와이파이</span>
    //                             </div>
    //                             <div class="Facilities">
    //                                 <img src="/assets/usb.png" alt="" />
    //                                 <span>USB 포트</span>
    //                             </div>
    //                             <div class="Facilities">
    //                                 <img src="/assets/music.png" alt="" />
    //                                 <span>음향기기</span>
    //                             </div>
    //                             <div class="Facilities">
    //                                 <img src="/assets/cup.png" alt="" />
    //                                 <span>커피메이커</span>
    //                             </div>
    //                             <div class="Facilities">
    //                                 <img src="/assets/movie.png" alt="" />
    //                                 <span>영화관람</span>
    //                             </div>
    //                         </div>
    //                         <textarea class="additionalRequestCell" placeholder="추가요청사항" readonly></textarea>
    //                     </div>
    //                 </div>
    //             </div>
    //             <a href="estimateCreate.html">
    //                 <button class="createEstimate displayNone">견적 등록하기</button>
    //             </a>
    //         </div>

    //     )
    // })

    return (
        <>
            <Estimate Content={Content}></Estimate>
        </>
    )
}