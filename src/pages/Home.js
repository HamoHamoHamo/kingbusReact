/* global kakao */
import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import "./Responsive.css";
import "./mainPage.js";
import { useAppContext } from "../Store";
import axios from "axios";
import { SearchAddress } from './home/Search';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Stopover from "./home/Stopover";
import { Api } from "../utils/Api";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

function KakaoMapDiv() {
    return (
        <Map
            style={{ width: '64rem', height: '42rem' }}
            center={{ lat: 37.24548819705312, lng: 126.9925381461988 }}
            level={2}
        >
            <MapMarker position={{ lat: 37.24548819705312, lng: 126.9925381461988 }}>

            </MapMarker>
        </Map>
    )
}

export default function Home() {
    const { store: { isAuthenticated, name } } = useAppContext();
    const [inputs, setInputs] = useState({
        way: 'lt',
        is_driver: false
    });
    const [searchDatas, setSearchDatas] = useState();
    const [useStopover, setUseStopover] = useState(false);
    const [types, setTypes] = useState({
        name: '',
        title: '',
        text: '',
        display: 'hidden'
    });
    const [index, setIndex] = useState([]);
    const [cnt, setCnt] = useState(0);

    const departureRef = useRef();
    const arrivalRef = useRef();

    const postOrder = async (e) => {
        e.preventDefault();
        try{
            console.log("INPUTSSS", inputs);
            console.log(Api);
            const result =  await Api.post('order', inputs);
            window.location.href = '/';
        }
        catch(err){
            console.log("ERR", err);
            window.alert(err.result);
        }
    }

    const addWayPoint = () => {
        setCnt(cnt+1);
        setIndex(index.concat(cnt));
    }
    const onRemove = (i) => {
        //console.log("CNT=",cnt, "INDEX=", index);
        setIndex(index.filter(y => y !== i));
    }
    const setInputsStopover = () => {
        if(inputs.arrival_date && inputs.arrival_time){
            console.log("st delete arrival_date, time")
            delete inputs.arrival_date;
            delete inputs.arrival_time;
            
        }

        if (useStopover === true){
            const arr = window.document.getElementsByName('stopover');
            console.log("ARRRRR", arr);
            let stopover = '';
            Array.from(arr).map((val, index) => {
                stopover = index == 0 ? val.value : stopover + ',' + val.value;
            });
            setInputs(prev => {
                return ({
                    ...prev,
                    stopover
                });
            });
        }
    }
    function onClickRoute(e) {
        //console.log("ONCLICK", e.target);
        setSearchDatas('');
        window.document.body.classList.add('overflowHidden')
        setTypes(() => ({
            name: e.target.name,
            title: e.target.placeholder,
            text: e.target.placeholder.slice(0, 2),
            display: 'visible',
            value: e.target.value,
            id: e.target.id
        }))
        console.log("ONCLLLL", types);
    }

    const onClose = () => {
        window.document.body.classList.remove('overflowHidden')
        setTypes(() => ({
            display: 'hidden'
        }))
    }
    const onClickButton = (e, title, name, id) => {
        onClose();
        //document.querySelector(`#${}`)
        console.log("BUBBBBBBBBBBBBB", title, 'name', name);
        let ref = '';
        if (name === 'departure') {
            ref = departureRef.current;
        }
        else if (name === 'arrival') {
            ref = arrivalRef.current;
        }
        else if (name === 'stopover') {
            ref = window.document.getElementById(id)
        }
        console.log(ref);
        ref.value = title;
        

        if(name !== 'stopover'){
            setInputs(prev => {
                return ({
                    ...prev,
                    [name]: title
                })
            });
        }
    }
    const onClickWaypoint = () => {
        addWayPoint();
        setSearchDatas('');
        window.document.body.classList.add('overflowHidden')
        setTypes(() => ({
            name: 'stopover',
            title: '경유지',
            text: '경유',
            display: 'visible',
            value: '',
            id: `stopover${cnt}`
        }))
        console.log("ONCLLLL", types);
        console.log("INPUUUUU", inputs)
    }

    const onClickWaypointF = () => {
        
        setUseStopover(useStopover === false ? true : false)
        console.log(useStopover);

        if (useStopover === false){
            addWayPoint();
            setSearchDatas('');
            window.document.body.classList.add('overflowHidden')
            setTypes(() => ({
                name: 'stopover',
                title: '경유지',
                text: '경유',
                display: 'visible',
                value: '',
                id: 'stopover0'
            }))
        }
        

        console.log("ONCLLLL", types);
    }
    const onClickConvenience = (e) => {
        console.log("INPUTTESTTST", inputs)
        const arr = window.document.getElementsByName('convenience');
        let convenience = '';
        Array.from(arr).map((val, index) => {
            if(val.checked){
                convenience = convenience == '' ? val.value : convenience + "," + val.value;
            }
            setInputs((prev) => ({
                ...prev,
                convenience
            }))
        });
    }
    const onCLickSecondBtn = () => {
        const button = document.querySelectorAll(".thirdOrderPageNextBtn")
        console.log("BUTTOn", button);
        console.log(inputs['is_driver']);
        if(inputs['is_driver'] == 'true'){
            button[0].classList.remove('displayNone');
        }else{
            button[1].classList.remove('displayNone');
        }
    }

    const onChangeDate = (e) => {
        const { name, value } = e.target;
        const date = value.slice(0,10);
        const time = value.slice(11,);
        const timeName = `${name.slice(0,-4)}time`

        setInputs(prev => ({
            ...prev,
            [name]: date,
            [timeName]: time
        }));
    }
    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const onChange = async (e) => {
        let { name, value } = e.target;
        
        // console.log("inputs", inputs);
        if (value.length > 1){
            const headers = {
                Authorization: 'KakaoAK 89c319742a7efca01255c48b9579a68a'
            };
            let addressResult = '';
            try {
                addressResult = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${value}&page=1&size=5`, { headers })
            }
            catch (err) {
                console.log("Kakao API ERROR", err);
            }
            if (addressResult) {
                const { data: { documents: addressData } } = addressResult;
                //console.log("RESULT", addressData);
    
                let keywordResult = '';
                try {
                    keywordResult = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${value}&page=1&size=5`, { headers })
    
                }
                catch (err) {
                    console.log("Kakao API ERROR", err);
                }
                const { data: { documents: keywordData } } = keywordResult;
                // console.log("RESULT", keywordData);
    
                let dataList = []
                dataList.push(...addressData);
                dataList.push(...keywordData);
                dataList = dataList.slice(0, 5);
                //console.log("DATALIST", dataList)
    
                setSearchDatas(dataList);
                console.log("DATALIST", searchDatas);
            }
            else {
                setSearchDatas([]);
            }
        }
        
        else {
            setSearchDatas([]);
        }

    };
    return (
        <>
            <SearchAddress onChange={onChange} type={types} datas={searchDatas} onClose={onClose} onClickButton={onClickButton} />
            <div class="chatting">
                <img src="/assets/speechBubble.png" alt="말풍선" />
                <div>채팅</div>
            </div>
            <div class="mainContentsContainer">
                <div class="firstContainerImgSizing">
                    <img src="/assets/kingbusFirstContainerBgImage.jpg" alt="뉴욕 횡단보도" class="firstContainerImg" />
                    <div class="firstContainerImgCover"></div>
                </div>

                <div class="firstContainer">
                    <div class="loginHidden displayNone loginOption">
                        <a href="login/passenger.html">
                            <div class="loginCell passenger">승객<br />로그인</div>
                        </a>
                        <a href="">
                            <div class="loginCell loginCellOther">기사<br />로그인</div>
                        </a>
                        <a href="">
                            <div class="loginCell loginCellOther">회사<br />로그인</div>
                        </a>
                    </div>
                    <div class="loginHidden displayNone singupOption">
                        <a href="">
                            <div class="loginCell passenger">승객<br />회원가입</div>
                        </a>
                        <a href="">
                            <div class="loginCell loginCellOther">기사<br />회원가입</div>
                        </a>
                        <a href="">
                            <div class="loginCell loginCellOther">회사<br />회원가입</div>
                        </a>
                    </div>

                    <form onSubmit={postOrder}>
                        <div class="firstOrderPage">

                            <div class="way">
                                <input onChange={onChangeInputs} value={'lt'} type="radio" name="way" id="oneWay" checked={true} class="displayNone" />
                                <label for="oneWay" class="oneWay onWay">왕복</label>
                                <input onChange={onChangeInputs} value={'st'} type="radio" name="way" id="twoWay" class="displayNone" />
                                <label for="twoWay" class="twoWay onWay">편도</label>
                            </div>

                            <div class="displayFlex choiceBox">
                                <div class="choiceCell">

                                    <div class="choiceCellTitle">노선선택</div>

                                    <div class="orderInputCell">
                                        <input readOnly autoComplete="off" ref={departureRef} id="departure" onClick={onClickRoute} name='departure' type="text" class="orderInputCellText" placeholder='출발지' />
                                        <img class="orderInputCellImg" src="/assets/location.png" alt="위치아이콘" />
                                    </div>


                                    <div class="orderInputCell">
                                        <input readOnly autoComplete="off" ref={arrivalRef} id="arrival" onClick={onClickRoute} name='arrival' type="text" class="orderInputCellText" placeholder='도착지' />
                                        <img class="orderInputCellImg" src="/assets/location.png" alt="위치아이콘" />
                                    </div>

                                    <div class="addWayPoint" onClick={onClickWaypointF}>
                                        <span>경유지 추가</span>
                                        <img src="/assets/add.png" alt="추가아이콘" />
                                        <img src="/assets/remove.png" class="displayNone" alt="삭제아이콘" />
                                    </div>

                                </div>

                                <div class="choiceCell displayNone">
                                    <div class="choiceCellTitle WayPointTitle">경유지</div>
                                    <div class="WayPointScrollBox">
                                        <Stopover onRemove={onRemove} onClickRoute={onClickRoute} index={index} />
                                    </div>

                                    <div class="MoreWayPoint" onClick={onClickWaypoint}>
                                        <span>경유지 추가</span>
                                        <img src="/assets/add.png" alt="추가아이콘" />
                                    </div>
                                </div>


                                <div class="choiceCell">

                                    <div class="choiceCellTitle">날짜선택</div>

                                    <div class="orderInputCell">
                                        <input onChange={onChangeDate} name="departure_date" type="datetime-local" class="orderInputCellText" placeholder="출발일" />
                                        <img class="orderInputCellImg" src="/assets/calenderGrey.png" alt="위치아이콘" />
                                    </div>

                                    <div class="orderInputCell moreGapTopIcon blinkcell">
                                        <input onChange={onChangeDate} name="arrival_date" type="datetime-local" class="orderInputCellText" placeholder="도착일" />
                                        <img class="orderInputCellImg" src="/assets/calenderGrey.png" alt="위치아이콘" />
                                    </div>

                                </div>

                            </div>

                            <div class="displayFlex choiceBox peopleAndBtn">
                                <div class="choiceCellPeople">
                                    <div class="orderInputCell orderInputCellPeople">
                                        <input onChange={onChangeInputs} type="number" name="total_number" class="orderInputCellText orderInputCellTextPeople" placeholder="인원수" />
                                        <img class="orderInputCellImg" src="/assets/people.png" alt="위치아이콘" />
                                    </div>
                                </div>
                                <div onClick={setInputsStopover} class="applicationBtn mainOrderBtn">주문신청</div>
                            </div>
                        </div>

                        <div class="secondOrderPage displayNone">
                            <div class="secondOrderPageCheckBox">

                                <input onChange={onChangeInputs} value={false} type="radio" name="is_driver" id="withDriver" checked={true} class="displayNone" />
                                <label for="withDriver" class="secondOrderPageCheckCell secondOrderPageCheckCellcheck">
                                    <img src="/assets/checkRadio.png" alt="체크완료 아이콘" class="checking" />
                                    <img src="/assets/beforeCheckRadio.png" alt="체크 아이콘" class="beforechecking displayNone" />
                                    출발지 , 도착지만<br />
                                    기사님 동행
                                </label>
                                <input onChange={onChangeInputs} value={true} type="radio" name="is_driver" id="withDriverAll" class="displayNone" />
                                <label for="withDriverAll" class="secondOrderPageCheckCell">
                                    <img src="/assets/checkRadio.png" alt="체크완료 아이콘" class="checking displayNone" />
                                    <img src="/assets/beforeCheckRadio.png" alt="체크 아이콘" class="beforechecking" />
                                    모든일정 기사님 동행
                                </label>
                            </div>
                            <div onClick={onCLickSecondBtn} class="secondOrderPageNextBtn mainOrderBtn">다음</div>
                        </div>

                        <div class="thirdOrderPage displayNone">
                            <div class="thirdOrderPageCheckingContainer">

                                <div class="thirdOrderPageCheckingBox">
                                    <div class="thirdOrderPageCheckingBoxTitle">버스를 구하시는 목적을 선택해주세요.</div>
                                    <div class="thirdOrderPageCheckingBoxBtn">선택</div>
                                </div>

                                <div class="thirdOrderPageCheckingBox">
                                    <div class="thirdOrderPageCheckingBoxTitle">원하시는 편의시설을 추가해 주세요.</div>
                                    <div class="thirdOrderPageCheckingBoxBtn">선택</div>
                                </div>

                            </div>
                            <textarea onChange={onChangeInputs} name="reference" class="additionalRequests" placeholder="추가요청사항을 입력해주세요.(선택)
                            ex)45인승 부탁드려요. 쾌적하게 가고 싶어요~~"></textarea>
                            <div class="thirdOrderPageNextBtn mainOrderBtn displayNone">다음</div>
                            <input onClick={() => { console.log("INPUTS", inputs)}} type="submit" class="thirdOrderPageNextBtn mainOrderBtn displayNone thirdOrderPageSubmit" value="완료" />

                            <div class="thirdOrderPageCheckingBox itIsReal displayNone">
                                <div class="thirdOrderPageCheckingBoxTitle">버스를 구하시는 목적을 선택해주세요.</div>
                                <div class="thirdOrderPageCheckingCell">
                                    <div class="thirdOrderPageOptionCell">
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption0" class="tripOptionRadio displayNone" value='결혼식' />
                                        <label for="tripOption0" class="thirdOrderPageOptionBlock tripOption0" style={{ color: "black" }}>결혼식</label>
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption1" class="tripOptionRadio displayNone" value='워크샵' />
                                        <label for="tripOption1" class="thirdOrderPageOptionBlock tripOption1" style={{ color: "black" }}>워크샵</label>
                                    </div>
                                    <div class="thirdOrderPageOptionCell">
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption2" class="tripOptionRadio displayNone" value='MT' />
                                        <label for="tripOption2" class="thirdOrderPageOptionBlock tripOption2" style={{ color: "black" }}>MT</label>
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption3" class="tripOptionRadio displayNone" value='동호회' />
                                        <label for="tripOption3" class="thirdOrderPageOptionBlock tripOption3" style={{ color: "black" }}>동호회</label>
                                    </div>
                                    <div class="thirdOrderPageOptionCell">
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption4" class="tripOptionRadio displayNone" value='산악회' />
                                        <label for="tripOption4" class="thirdOrderPageOptionBlock tripOption4" style={{ color: "black" }}>산악회</label>
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption5" class="tripOptionRadio displayNone" value='골프모임' />
                                        <label for="tripOption5" class="thirdOrderPageOptionBlock tripOption5"
                                            style={{ color: "black" }}>골프모임</label>
                                    </div>
                                    <div class="thirdOrderPageOptionCell">
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption6" class="tripOptionRadio displayNone" value='낚시' />
                                        <label for="tripOption6" class="thirdOrderPageOptionBlock tripOption6" style={{ color: "black" }}>낚시</label>
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption7" class="tripOptionRadio displayNone" value='종교행사' />
                                        <label for="tripOption7" class="thirdOrderPageOptionBlock tripOption7"
                                            style={{ color: "black" }}>종교행사</label>
                                    </div>
                                    <div class="thirdOrderPageOptionCell">
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption8" class="tripOptionRadio displayNone" value='현장학습' />
                                        <label for="tripOption8" class="thirdOrderPageOptionBlock tripOption8"
                                            style={{ color: "black" }}>현장학습</label>
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption9" class="tripOptionRadio displayNone" value='단체관광' />
                                        <label for="tripOption9" class="thirdOrderPageOptionBlock tripOption9"
                                            style={{ color: "black" }}>단체관광</label>
                                    </div>
                                    <div class="thirdOrderPageOptionCell">
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption10" class="tripOptionRadio displayNone" value='콘서트' />
                                        <label for="tripOption10" class="thirdOrderPageOptionBlock tripOption10"
                                            style={{ color: "black" }}>콘서트</label>
                                        <input onChange={onChangeInputs} type="radio" name="purpose" id="tripOption11" checked={true} class="tripOptionRadio displayNone" value='기타' />
                                        <label for="tripOption11" class="thirdOrderPageOptionBlock tripOption11" style={{ color: "white", backgroundColor: "#b00020" }}>기타</label>
                                    </div>
                                </div>
                                <div class="thirdOrderPageCheckingBoxBtn">선택</div>
                            </div>

                            <div class="thirdOrderPageCheckingBox itIsReal2 displayNone">
                                <div class="thirdOrderPageCheckingBoxTitle">원하시는 편의시설을 추가해 주세요.</div>
                                <div class="thirdOrderPageCheckingCellFacilities">
                                    <input value='손 소독제 비치' onChange={onChangeInputs} type="checkbox" name="convenience" id="Facilities0" class="Facilities displayNone" />
                                    <label for="Facilities0" class="thirdOrderPageOptionBlockFacilities Facilities0" style={{ color: "grey" }}>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="26.000000pt" height="9.000000pt" viewBox="0 0 26.000000 9.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,9.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M54 75 c-10 -8 -27 -15 -36 -15 -12 0 -18 -8 -18 -25 0 -25 1 -25 91
                                                -25 83 0 93 2 125 27 18 16 34 34 34 41 0 17 -8 15 -37 -8 -17 -13 -39 -20
                                                -67 -19 -37 1 -38 2 -12 8 16 3 31 12 34 19 6 18 -89 16 -114 -3z" />
                                            </g>
                                        </svg>
                                        손 소독제 비치
                                    </label>
                                    <input value='와이파이' onChange={onChangeInputs} type="checkbox" name="convenience" id="Facilities1" class="Facilities displayNone" />
                                    <label for="Facilities1" class="thirdOrderPageOptionBlockFacilities Facilities1" style={{ color: "grey" }}>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="21.000000pt" height="15.000000pt" viewBox="0 0 21.000000 15.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,15.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M51 139 c-34 -14 -52 -30 -45 -40 3 -5 16 -1 30 7 32 21 96 21 128 0 14 -9 27 -12 31 -6 17 28 -97 59 -144 39z" />
                                                <path d="M63 90 c-13 -5 -23 -14 -23 -20 0 -12 2 -12 34 0 17 6 35 6 52 -1 33 -12 45 -2 20 17 -22 16 -50 17 -83 4z" />
                                                <path d="M84 39 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z" />
                                            </g>
                                        </svg>
                                        와이파이
                                    </label>
                                    <input value='커피 메이커' onChange={onChangeInputs} type="checkbox" name="convenience" id="Facilities2" class="Facilities displayNone" />
                                    <label for="Facilities2" class="thirdOrderPageOptionBlockFacilities Facilities2" style={{ color: "grey" }}>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="23.000000pt" height="16.000000pt"
                                            viewBox="0 0 23.000000 16.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M42 103 l3 -58 58 -3 c33 -2 57 1 57 7 0 5 12 16 28 23 30 15 41 51 22 74 -9 10 -35 14 -92 14 l-79 0 3 -57z m153 12 c0 -10 -6 -20 -12 -22 -8 -3 -13 5 -13 22 0 17 5 25 13 23 6 -3 12 -13 12 -23z" />
                                                <path d="M5 10 c8 -13 192 -13 200 0 4 6 -32 10 -100 10 -68 0 -104 -4 -100 -10z" />
                                            </g>
                                        </svg>
                                        커피 메이커
                                    </label>
                                    <input value='음향기기' onChange={onChangeInputs} type="checkbox" name="convenience" id="Facilities3" class="Facilities displayNone" />
                                    <label for="Facilities3" class="thirdOrderPageOptionBlockFacilities Facilities3" style={{ color: "grey" }}>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="18.000000pt" height="18.000000pt"
                                            viewBox="0 0 18.000000 18.000000" preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,18.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M100 162 l-55 -18 -3 -46 c-2 -37 -7 -47 -24 -51 -27 -8 -18 -32 13 -32 21 0 24 5 27 46 3 44 5 47 41 58 51 15 51 15 51 -18 0 -21 -6 -30 -21 -34 -28 -7 -19 -32 12 -32 23 0 24 3 27 73 2 39 -1 72 -5 71 -4 0 -33 -8 -63 -17z" />
                                            </g>
                                        </svg>
                                        음향기기
                                    </label>
                                    <input value='전좌석 usb포트' onChange={onChangeInputs} type="checkbox" name="convenience" id="Facilities4" class="Facilities displayNone" />
                                    <label for="Facilities4" class="thirdOrderPageOptionBlockFacilities Facilities4" style={{ color: "grey" }}>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="23.000000pt" height="14.000000pt"
                                            viewBox="0 0 23.000000 14.000000" preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,14.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M109 133 c-9 -2 -22 -15 -29 -28 -14 -27 -30 -31 -46 -15 -8 8 -15 6 -24 -5 -20 -24 3 -44 30 -27 29 18 48 15 61 -10 25 -46 69 -64 69 -28 0 17 -6 20 -27 18 -19 -2 -28 2 -31 15 -3 13 3 17 30 17 19 0 39 -5 44 -10 8 -8 15 -6 24 5 15 18 15 17 -73 15 -57 -1 -58 -1 -47 20 9 17 14 19 26 9 17 -14 41 2 30 20 -7 11 -10 12 -37 4z" />
                                            </g>
                                        </svg>

                                        전좌석 usb포트
                                    </label>
                                    <input value='영화관람' onChange={onChangeInputs} type="checkbox" name="convenience" id="Facilities5" class="Facilities displayNone" />
                                    <label for="Facilities5" class="thirdOrderPageOptionBlockFacilities Facilities5" style={{ color: "grey" }}>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="23.000000pt" height="19.000000pt"
                                            viewBox="0 0 23.000000 19.000000" preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,19.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M12 178 c-17 -17 -16 -142 2 -157 9 -8 47 -11 107 -9 l94 3 3 88 c2
                                                73 0 87 -13 87 -18 0 -19 -5 -5 -31 9 -16 7 -19 -15 -19 -14 0 -25 4 -25 8 0
                                                5 -7 17 -16 28 -15 18 -15 18 -5 -3 15 -30 14 -33 -9 -33 -11 0 -26 12 -35 28
                                                l-15 27 6 -27 c5 -24 3 -28 -15 -28 -12 0 -21 4 -21 8 0 5 -6 16 -13 25 -10
                                                14 -15 15 -25 5z" />
                                            </g>
                                        </svg>

                                        영화관람
                                    </label>
                                </div>
                                <div onClick={onClickConvenience} class="thirdOrderPageCheckingBoxBtn">선택</div>
                            </div>

                            <div class="thirdOrderPageOptonCover displayNone"></div>

                        </div>

                        <div class="fourthOrderPage displayNone">
                            <div class="fourthOrderPageBox">
                                <textarea onChange={onChangeInputs} name='driver_schedule' class="specificSchedule" placeholder="구체적인 일정을 작성해 주세요."></textarea>
                                <div class="fourthOrderPageInfor">일정의 변동사항이 생기면 <span>'기사님과 채팅하기'</span>기능을 통해 일정부분 조율이 가능합니다.</div>
                            </div>
                            <input type="submit" class="secondOrderPageNextBtn mainOrderBtn thirdOrderPageSubmit" value="완료" />
                        </div>

                    </form>

                </div>

                <div class="secondContainer containerGap">

                    <div class="thisImg00 displayBlock">
                        <img src="/assets/quickEstimate.png" alt="빠른견적 이미지" />
                        <div class="secondContainerTitle">빠른견적</div>
                        <div class="secondContainerContents">최대 5분이내 기사님들이 견적을 남겨드려요.</div>
                    </div>
                    <div class="thisImg11 displayNone">
                        <img src="/assets/trust.png" alt="100% 배차 이미지" />
                        <div class="secondContainerTitle">100% 확실한 배차</div>
                        <div class="secondContainerContents">100% 확실한 배차가 가능해요.</div>
                    </div>
                    <div class="thisImg22 displayNone">
                        <img src="/assets/community.png" alt="커뮤니티 이미지" />
                        <div class="secondContainerTitle">커뮤니티</div>
                        <div class="secondContainerContents">
                            킹버스 커뮤니티를 통해 사람들과 소통하고<br />
                            많은 정보 얻어가세요~
                        </div>
                    </div>
                    <div class="thisImg33 displayNone">
                        <img src="/assets/chatting.png" alt="채팅기능 이미지" />
                        <div class="secondContainerTitle">채팅을 통한 쉽고 간단한 소통</div>
                        <div class="secondContainerContents"> 채팅으로 기사님과 가격조율,세세한 일정 조율이 가능해요.</div>
                    </div>
                    <div class="thisImg44 displayNone">
                        <img src="/assets/event.png" alt="이벤트 이미지" />
                        <div class="secondContainerTitle">이벤트</div>
                        <div class="secondContainerContents">
                            많은 혜택을 드리는 킹버스만의<br />
                            즐거운 이벤트들이 다양해요!
                        </div>
                    </div>
                    <div class="thisImg55 displayNone">
                        <img src="/assets/coupon.png" alt="쿠폰 이미지" />
                        <div class="secondContainerTitle">쿠폰</div>
                        <div class="secondContainerContents">할인된 가격으로 여행을 즐기 실 수 있어요.</div>
                    </div>

                    <div class="secondContainerNavBox">
                        <div class="secondContainerNav secondContainerNavThis thisImg0">빠른견적</div>
                        <div class="secondContainerNav secondContainerNavNotThis thisImg1">100% 배차</div>
                        <div class="secondContainerNav secondContainerNavNotThis thisImg2">커뮤니티</div>
                        <div class="secondContainerNav secondContainerNavNotThis thisImg3">채팅기능</div>
                        <div class="secondContainerNav secondContainerNavNotThis thisImg4">이벤트</div>
                        <div class="secondContainerNav secondContainerNavNotThis thisImg5">쿠폰</div>
                    </div>
                </div>

                <div class="thirdContainer containerGap">
                    <div class="thirdContainerHeader">

                        <div class="moreInfor">
                            <img src="/assets/character.png" alt="달리는 킹킹이" />
                            <div>킹버스가<br /> <span>더</span> 궁금하신가요?</div>
                        </div>

                        <div class="moreInforTag">
                            <div class="moreInforTagBlock moreInforTagBlockWidth1">
                                <div class="moreInforTagCell">#버스대절</div>
                                <div class="moreInforTagCell">#커뮤니티</div>
                                <div class="moreInforTagCell">#킹킹이</div>
                            </div>
                            <div class="moreInforTagBlock moreInforTagBlockWidth2">
                                <div class="moreInforTagCell">#킹버스 앱</div>
                                <div class="moreInforTagCell">#LINK_세상을 초연결</div>
                            </div>
                        </div>

                    </div>

                    <video src="/assets/kingbus.mp4" autoPlay muted="muted" controls></video>
                </div>

                <div class="fourthContainer containerGap">
                    <div class="fourthContainerTitle">킹버스 리얼후기</div>
                    <div class="reviweContainer">

                        <div class="reviweContainerCenter">
                            <div class="reviweContainerBtnTool">
                                <div class="reviewPrevBtn reviweContainerBtn">
                                    <span>{'<'}</span>
                                </div>
                                <div class="reviewNextBtn reviweContainerBtn">
                                    <span>{'>'}</span>
                                </div>
                            </div>

                            <div class="reviweBox">
                                <div class="reviweCell reviweCell0">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">0</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.
                                    </div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell1">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">1</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell2">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">2</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell3">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">3</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell4">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">4</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell5">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">5</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell6">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">6</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell7">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">7</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell8">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">8</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                                <div class="reviweCell reviweCell9" id="9">
                                    <div class="reviweCellHeader">
                                        <div class="reviweCellName">9</div>
                                        <img src="/assets/starPoint5.png" alt="평점5점" class="reviweCellstar" />
                                    </div>
                                    <div class="reviweCellContents">집에 빨리 가고싶었는데 빨리 가주셔서 감사합니다.<br />
                                        멀미가 심한데 약도 준비해주시고 정말 서비스 최고~~<br />
                                        다음에도 이용하겠습니다.</div>
                                    <div class="reviweCellDate">
                                        <span>2021.10.25</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="fifthContainer containerGap">
                    <div class="contactUs">
                        <div class="contactUsTitle">Contact Us</div>
                        <div class="contactUsLocation">
                            <img src="/assets/location.png" alt="위치아이콘" />
                            경기 수원시 매송고색로 804번길 24, 1층
                        </div>
                        <div class="contactUsTel">1544-9145</div>
                    </div>
                    <KakaoMapDiv />
                </div>
                <div class="sixthContainer containerGap">
                    <div class="companyBox companyBoxLink">
                        <div class="textInfor">LINK와 함께 "인생을 초연결"</div>
                        <div class="logoLink">
                            <img src="/assets/linkLogo.png" alt="링크 로고" class="logoLinkImgLink" />
                            <a href="http://www.kingbus.kr/">
                                <span class="companyBoxLogoBtn">사이트 바로가기</span>
                            </a>
                        </div>
                    </div>
                    <div class="companyBox companyBoxKingbus">
                        <div class="textInfor">
                            킹버스 앱을통해 더욱간편하게<br />
                            One Touch로 이용해보세요!!
                        </div>
                        <div class="logoLink">
                            <img src="/assets/kingbusAppLogo.png" alt="링크 로고" class="logoLinkImgKingbusApp" />
                            <a href="https://play.google.com/Store/search?q=%ED%82%B9%EB%B2%84%EC%8A%A4&c=apps">
                                <span class="companyBoxLogoBtn">
                                    <img src="/assets/playStore.png" alt="플레이스토어 아이콘" />
                                    앱 다운받기
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="companyBox companyBoxTrp">
                        <div class="boxLeftFill"></div>
                        <div class="textInfor">
                            교통의 혁신을 원한다면<br />
                            킹버스 TRP !!
                        </div>
                        <div class="logoLink">
                            <img src="/assets/TRPLogoNew.png" alt="링크 로고" class="logoLinkImgTRP" />
                            <a href="http://kingbuserp.link/">
                                <span class="companyBoxLogoBtn companyBoxLogoBtnShadow">사이트 바로가기</span>
                            </a>
                        </div>
                    </div>
                </div>




            </div>

        </>
    )
}