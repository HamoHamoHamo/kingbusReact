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
            if (qry.classList.length === 1) {
                qry.classList.add('displayNone');
                imgQry.style.transform = "rotate(0deg)";
            }
            else {
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
            console.log("EEEE", e.target);
            const container = document.querySelectorAll(".orderContainerPlusBtn")[idx];
            const button = document.querySelectorAll(".createEstimate")[idx];
            container.classList.remove('CreateBtnfocusOut')
            container.classList.add('CreateBtnfocusIn')
            button.classList.remove('displayNone');

            e.target.style.margin = "-0.1rem 0 10rem -0.1rem";
            console.log("ONFOCUS")
        }
        const dataContent = datas.results && datas.results.map((data, idx) => {
            const { orders: {
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
            } } = data
            // console.log("ORDER", orders);
            const stopoverList = stopover.split(',');
            const stopoverCnt = stopover === '' ? 0 : stopoverList.length;
            console.log('convenience', convenience);
            return (
                <div onBlur={(e) => { onBlur(e, idx) }} onFocus={(e) => { onFocus(e, idx) }} class="bothLinkBox" tabIndex="0" key={data.order}>
                    <div class="orderContainerPlusBtn">

                        <div class="topOrderMainInfor">
                            <div class="startInfor">
                                <div class="startInforCell">
                                    
                                    <div class="start">출발</div>
                                    <div class="typeTitle">
                                        <div class="startInforPlace">{departure_short}</div>
                                        <span class="startInforDate">{departure_date}{` (${dayOfWeek(departure_date)})`} {departure_time.slice(0, -3)}</span>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="wayPointInfor">
                                <div class="wayPoint">{`경유지 ${stopoverCnt}`}</div>
                                <div class="wayPointicon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="157.257" height="19.62" viewBox="0 0 157.257 19.62">
                                        <g id="그룹_1073" data-name="그룹 1073" transform="translate(-1076 -882.623)">
                                            <line id="선_1587" data-name="선 1587" x2="150" transform="translate(1076 893.154)" fill="none" stroke="#b00020" stroke-width="4" />
                                            <path id="Icon_feather-chevron-right" data-name="Icon feather-chevron-right" d="M0,11.135,5.567,5.567,0,0" transform="translate(1224.689 886.865)" fill="none" stroke="#b00020" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" />
                                            <g id="타원_132" data-name="타원 132" transform="translate(1145.689 888.154)" fill="#b00020" stroke="#b00020" stroke-width="1">
                                                <circle cx="5" cy="5" r="5" stroke="none" />
                                                <circle cx="5" cy="5" r="4.5" fill="none" />
                                            </g>
                                        </g>
                                    </svg>
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
                                    <div class="end">{way === 'st' ? '도착' : '복귀'}</div>
                                    <div class="endInforPlace">{arrival_short}</div>
                                    <span class="endInforDate">{comeback_date}{comeback_date && ` (${dayOfWeek(comeback_date)})`} {comeback_time && comeback_time.slice(0, -3)}</span>
                                </div>
                            </div>
                        </div>

                        <div class="topOrderSubInfor">
                            <div class="morInforCell">
                                <div class="morInforPeople">
                                    <img src="/assets/peopleIcon.png" alt="" />
                                    <span>인원수</span>
                                    <span>{total_number}</span>
                                </div>
                                <div class="morInforPurpose">
                                    <img src="/assets/purpose.png" alt="" />
                                    <span>목적</span>
                                    <span>{purpose}</span>
                                </div>
                                {is_driver &&
                                    <div class="morInforDriver">
                                        <img src="/assets/driverIcon.png" alt="" />
                                        <span>기사동행</span>
                                    </div>}
                            </div>
                            <div onClick={() => { onClickInfo(idx) }} class="moreInforBtn">
                                <span>추가정보</span>
                                <img src="/assets/downArrow.png" alt="아래 화살표 아이콘" />
                            </div>
                        </div>

                        <div class='topOrderMoreInfor displayNone'>
                            <div class="waypointList">
                                <span>{departure}</span>
                                <img src="/assets/waypointLink.png" alt="연결선 아이콘" />
                                {stopoverList.map((data) => {
                                    return <div class="addWaypoint">{data}</div>
                                })}
                                <img className="stopoverUnderImg" src="/assets/waypointLink.png" alt="연결선 아이콘" />
                                <span>{arrival}</span>
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
                                    {convenience.includes('커피메이커') &&
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
    return (
        <>
            <Estimate Content={Content}></Estimate>
        </>
    )
}