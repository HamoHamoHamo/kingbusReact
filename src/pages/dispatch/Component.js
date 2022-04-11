import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Estimate.css";
import "./estimateActive.js";
import routes from "../../utils/Routes";
import Cookies from "universal-cookie";
import { IP } from "../../utils/Api";

const cookies = new Cookies();

export function DispatchOrderForm({ Content, order }) {
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
    way,
  } = order ? order : undefined;
  const stopoverList = stopover.split(",");
  const role = cookies.get("role");
  const activeStyle = {
    color: "#b00020",
    fontWeight: "bold",
  };
  const [filter, setFilter] = useState({});
  console.log("ORDER", order);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = (date) => {
    return week[new Date(date).getDay()];
  };

  return (
    <>
      <div class="topOrder" style={{ flexDirection: "row" }}>
        {role !== "u" && (
          <>
            <NavLink
              className="topOrderPageName"
              to={routes.estimateList}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              주문목록
            </NavLink>
          </>
        )}
        {role === "u" && (
          <>
            <NavLink
              className="topOrderPageName"
              to={routes.orderList}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              주문목록
            </NavLink>
          </>
        )}
      </div>
      <div class="mainContainer">
        <div class="orderDetailBox">
          <div class="orderDetailBoxMainData">
            <div class="detailMainInforbox">
              <div class="dataCell">
                <span class="dataTitle">출발</span>
                <span class="dataContants">{departure_short}</span>
              </div>
              <div class="dataCell">
                <span class="dataTitle">도착</span>
                <span class="dataContants">{arrival_short}</span>
              </div>
              <div class="dataCell dataCellDate">
                <span class="dataTitle">출발일</span>
                <span class="dataContantsDate">
                  {departure_date}
                  {` (${dayOfWeek(departure_date)})`}
                </span>
              </div>
            </div>
            <div class="detailSubInforbox">
              <div class="detailSubInforCell">
                <span>인원수</span>
                <span>{total_number}명</span>
              </div>
              <div class="detailSubInforCell">
                <span>목적</span>
                <span>{purpose}</span>
              </div>
              {is_driver && <span class="withDriver">기사동행</span>}
            </div>
          </div>

          <div class="orderDetailSbuDataBox">
            <div class="convenienceBox">
              {convenience.includes("미니냉장고") && (
                <div class="convenienceCell">미니 냉장고</div>
              )}
              {convenience.includes("와이파이") && (
                <div class="convenienceCell">와이파이</div>
              )}
              {convenience.includes("커피메이커") && (
                <div class="convenienceCell">커피 메이커</div>
              )}
              {convenience.includes("음향기기") && (
                <div class="convenienceCell">음향기기</div>
              )}
              {convenience.includes("USB포트") && (
                <div class="convenienceCell">USB포트</div>
              )}
              {convenience.includes("영화관람") && (
                <div class="convenienceCell">영화관람</div>
              )}
            </div>
            <div class="wayPointBox">
              <div class="waypointArea">
                <div class="sideCell sideCellStart">
                  <img src="/assets/markIcon.png" alt="" />
                  <span>{departure}</span>
                </div>

                {stopover &&
                  stopoverList.map((data, idx) => {
                    return (
                      <div class="waypoinCell" key={idx}>
                        <div class="wayPointIcon"></div>
                        <span>{data}</span>
                      </div>
                    );
                  })}

                <div class="sideCell sideCellEnd">
                  <img src="/assets/markIcon.png" alt="" />
                  <span>{arrival}</span>
                </div>
              </div>
            </div>
            <div class="writeInforBox">
              <span>추가 요청사항</span>
              <div>{reference}</div>
            </div>
            {driver_schedule && (
              <div class="writeInforBox">
                <span>구체적인 일정</span>
                <div>{driver_schedule}</div>
              </div>
            )}
          </div>
        </div>
        <Content filter={filter} />
      </div>
    </>
  );
}

export function DispatchForm({ Content }) {
  const role = cookies.get("role");
  const startDate = useRef();
  const finishDate = useRef();
  const departure = useRef();
  const arrival = useRef();
  const minNum = useRef();
  const maxNum = useRef();

  const activeStyle = {
    color: "#b00020",
    fontWeight: "bold",
  };
  const [filter, setFilter] = useState({});

  const onClickReset = () => {
    setFilter({});
    startDate.current.value = "";
    finishDate.current.value = "";
    departure.current.value = "";
    arrival.current.value = "";
    minNum.current.value = "";
    maxNum.current.value = "";
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("CHANGe", filter);
  };
  return (
    <>
      <div class="topOrder" style={{ flexDirection: "row" }}>
        {role !== "u" && (
          <>
            <NavLink
              className="topOrderPageName"
              to={routes.estimateList}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              주문목록
            </NavLink>
          </>
        )}
        {role === "u" && (
          <>
            <NavLink
              className="topOrderPageName"
              to={routes.orderList}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              주문목록
            </NavLink>
          </>
        )}
      </div>
      <div class="mainContainer">
        <div class="filterBox">
          <div class="filterCell">
            <span>기간</span>
            <div class="inputCell" style={{ flexDirection: "row" }}>
              <input
                ref={startDate}
                onChange={onChange}
                name="startDate"
                class=" filter filterInside"
                type="date"
              />
              ~
              <input
                ref={finishDate}
                onChange={onChange}
                name="finishDate"
                class="filter filterInside"
                type="date"
              />
            </div>
          </div>
          <div class="filterCell">
            <span>출발지</span>
            <input
              ref={departure}
              onChange={onChange}
              name="departure"
              class="filter"
              type="text"
            />
          </div>
          <div class="filterCell">
            <span>도착지</span>
            <input
              ref={arrival}
              onChange={onChange}
              name="arrival"
              class="filter"
              type="text"
            />
          </div>
          <div class="filterCell filterCellEnd">
            <span>인원수</span>
            <div class="inputCell" style={{ flexDirection: "row" }}>
              <input
                ref={minNum}
                onChange={onChange}
                name="minNum"
                class="filter filterInside"
                type="number"
              />
              ~
              <input
                ref={maxNum}
                onChange={onChange}
                name="maxNum"
                class="filter filterInside"
                type="number"
              />
            </div>
          </div>
          <button class="filterBoxButton" onClick={onClickReset}>
            초기화
          </button>
        </div>
        <Content filter={filter} />
      </div>
    </>
  );
}

export function OrderInfo({ data, idx = 0, status }) {
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
    way,
  } = data ? data : undefined;
  const stopoverList = stopover.split(",");
  const stopoverCnt = stopover === "" ? 0 : stopoverList.length;
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const dayOfWeek = (date) => {
    return week[new Date(date).getDay()];
  };

  const onClickInfo = (idx) => {
    console.log(
      "class length",
      document.querySelectorAll(".topOrderMoreInfor")[idx].classList.length
    );

    const qry = document.querySelectorAll(".topOrderMoreInfor")[idx];
    const imgQry = document.querySelectorAll(".moreInforBtn img")[idx];
    if (qry.classList.length === 1) {
      qry.classList.add("displayNone");
      imgQry.style.transform = "rotate(0deg)";
    } else {
      qry.classList.remove("displayNone");
      imgQry.style.transform = "rotate(180deg)";
    }
  };

  return (
    <>
      <div class="orderBox">
        {status == 1 && <div class="stateArea">주 문</div>}
        {status == 2 && (
          <div class="stateArea" style={{ backgroundColor: "crimson" }}>
            예약완료
          </div>
        )}
        {status == 3 && (
          <div class="stateArea" style={{ backgroundColor: "cyan" }}>
            결제완료
          </div>
        )}
        <div class="dataArea">
          <div class="mainInforbox">
            <div class="dataCell">
              <span class="dataTitle">출발</span>
              <span class="dataContants">{departure_short}</span>
            </div>
            <div class="dataCell">
              <span class="dataTitle">도착</span>
              <span class="dataContants">{arrival_short}</span>
            </div>
            <div class="dataCell dataCellDate">
              <span class="dataTitle">날짜</span>
              <span class="dataContantsDate">
                {departure_date}
                {` (${dayOfWeek(departure_date)})`}
              </span>
            </div>
          </div>
          <div class="subInforBox">
            <div class="wayBox">
              {way === "st" && (
                <>
                  <img src="/assets/oneway.png" alt="편도 아이콘" />
                  <span>편도</span>
                </>
              )}
              {way === "lt" && (
                <>
                  <img src="/assets/aroundTrip.png" alt="왕복 아이콘" />
                  <span>왕복</span>
                </>
              )}
            </div>
            <div class="subDataBox">
              <div class="subDataCell">
                <span>인원수</span>
                <span>{total_number}명</span>
              </div>
              <div class="subDataCell">
                <span>목적</span>
                <span>{purpose}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function OrderEstimateInfo({ data }) {
  const {
    driverorcompany_profile,
    bus_cnt,
    bus_type,
    is_accomodation,
    is_convenience,
    is_meal,
    is_parking,
    is_tollgate,
    price,
    pricebycar,
    name,
    id,
  } = data ? data : undefined;

  const { driver_car_photo: photo, driver_com_name: company } =
    driverorcompany_profile;

  return (
    <>
      <div class="estimateBox">
        <img src={IP + photo} alt="기사님 사진" class="driverProfile" />
        <div class="estimateBoxDataArea">
          <div class="estimateBoxMainArea">
            <div class="driverDataBox">
              <span class="driverName">{name} 기사님</span>
              <div class="driverDataCell">
                <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                <span class="driverGrade">4.0</span>
                <span class="busData">{bus_type}</span>
              </div>
            </div>
            <div class="priceDataBox">
              <span class="totalPrice">{price}만원</span>
              <div class="priceDataCell">
                <span>{pricebycar}만원</span>
                <span> {bus_cnt}대</span>
              </div>
            </div>
          </div>

          <div class="estimateBoxSubArea">
            <div class="certificationBox" style={{ marginBottom: "0" }}>
              <div class="checkingCell">
                <img src="/assets/people.png" alt="인증 아이콘" />
                <span>{company}</span>
              </div>
              <div class="checkingCell">
                <img src="/assets/certification.png" alt="인증 아이콘" />
                <span>인증완료</span>
              </div>
            </div>
            <div class="additionalFeeBox">
              {is_tollgate && (
                <div class="checkingCell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26.817"
                    height="20.104"
                    viewBox="0 0 31.817 20.104"
                  >
                    <path
                      id="Icon_awesome-money-bill-alt"
                      fill="#b00020"
                      data-name="Icon awesome-money-bill-alt"
                      d="M17.5,16.227h-.8V11.62a.409.409,0,0,0-.4-.419h-.675a1.149,1.149,0,0,0-.662.211l-.762.535a.432.432,0,0,0-.11.581l.441.7a.385.385,0,0,0,.551.116l.023-.016v2.9h-.8a.409.409,0,0,0-.4.419v.838a.409.409,0,0,0,.4.419H17.5a.409.409,0,0,0,.4-.419v-.838A.409.409,0,0,0,17.5,16.227ZM30.226,4.5H1.591A1.635,1.635,0,0,0,0,6.175V22.928A1.635,1.635,0,0,0,1.591,24.6H30.226a1.635,1.635,0,0,0,1.591-1.675V6.175A1.635,1.635,0,0,0,30.226,4.5ZM2.386,22.091V18.74a3.269,3.269,0,0,1,3.182,3.351Zm0-11.727V7.013H5.568A3.269,3.269,0,0,1,2.386,10.364ZM15.909,20.415c-2.636,0-4.773-2.626-4.773-5.864s2.137-5.864,4.773-5.864,4.773,2.625,4.773,5.864S18.544,20.415,15.909,20.415Zm13.522,1.675H26.249a3.269,3.269,0,0,1,3.182-3.351Zm0-11.727a3.269,3.269,0,0,1-3.182-3.351h3.182Z"
                      transform="translate(0 -4.5)"
                    />
                  </svg>
                  <span>톨비</span>
                </div>
              )}
              {is_parking && (
                <div class="checkingCell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.575"
                    height="22.06"
                    viewBox="0 0 27.575 22.06"
                  >
                    <path
                      id="Icon_awesome-car-alt"
                      fill="#b00020"
                      data-name="Icon awesome-car-alt"
                      d="M25.2,13.021l-.646-1.614L23.409,8.544A6.4,6.4,0,0,0,17.435,4.5h-7.3A6.4,6.4,0,0,0,4.166,8.544L3.021,11.407l-.646,1.614A3.669,3.669,0,0,0,0,16.449v2.757a3.647,3.647,0,0,0,.919,2.409v3.106A1.839,1.839,0,0,0,2.757,26.56H4.6a1.839,1.839,0,0,0,1.838-1.838V22.883H21.141v1.838a1.839,1.839,0,0,0,1.838,1.838h1.838a1.839,1.839,0,0,0,1.838-1.838V21.615a3.644,3.644,0,0,0,.919-2.409V16.449A3.669,3.669,0,0,0,25.2,13.021ZM7.579,9.91a2.758,2.758,0,0,1,2.56-1.733h7.3A2.758,2.758,0,0,1,20,9.91l1.145,2.863H6.434L7.579,9.91ZM4.6,19.2a1.734,1.734,0,0,1-1.838-1.833A1.734,1.734,0,0,1,4.6,15.53a3.537,3.537,0,0,1,2.757,2.749C7.353,19.378,5.7,19.2,4.6,19.2Zm18.383,0c-1.1,0-2.757.183-2.757-.916a3.537,3.537,0,0,1,2.757-2.749,1.734,1.734,0,0,1,1.838,1.833A1.734,1.734,0,0,1,22.979,19.2Z"
                      transform="translate(0 -4.5)"
                    />
                  </svg>
                  <span>주차비</span>
                </div>
              )}
              {is_meal && (
                <div class="checkingCell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21.275"
                    height="26.275"
                    viewBox="0 0 26.275 26.275"
                  >
                    <path
                      id="Icon_map-food"
                      fill="#b00020"
                      data-name="Icon map-food"
                      d="M26.937,9.838,24.783,29.1H17.508L15.362,9.742h8.882L26,2.825l1,.342L25.311,9.823l1.626.014Zm-12.6,11.144s.272-2.5-3.5-2.5H4.825c-3.767,0-3.5,2.5-3.5,2.5ZM1.324,26.6s-.267,2.5,3.5,2.5h6.009c3.773,0,3.5-2.5,3.5-2.5ZM13.77,25.353c.617,0,1.116-.7,1.116-1.561s-.5-1.562-1.116-1.562H1.837c-.615,0-1.117.692-1.117,1.562s.5,1.561,1.117,1.561Z"
                      transform="translate(-0.72 -2.825)"
                    />
                  </svg>
                  <span>식사비</span>
                </div>
              )}
              {is_accomodation && (
                <div class="checkingCell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28.791"
                    height="21.331"
                    viewBox="0 0 33.791 21.331"
                  >
                    <path
                      id="Icon_metro-hotel"
                      fill="#b00020"
                      data-name="Icon metro-hotel"
                      d="M13.072,20.374a4.45,4.45,0,0,0,4.608-4.266,4.45,4.45,0,0,0-4.608-4.266,4.45,4.45,0,0,0-4.608,4.266A4.45,4.45,0,0,0,13.072,20.374ZM31.5,11.842H19.216V21.8H6.928V9H3.856V30.328H6.928V26.062H34.575v4.266h3.072V17.53A5.928,5.928,0,0,0,31.5,11.842Z"
                      transform="translate(-3.856 -8.997)"
                    />
                  </svg>
                  <span>숙박비</span>
                </div>
              )}
              {is_convenience && (
                <div class="checkingCell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.142"
                    height="22.349"
                    viewBox="0 0 25.142 22.349"
                  >
                    <path
                      id="Icon_awesome-heart"
                      fill="#b00020"
                      data-name="Icon awesome-heart"
                      d="M22.7,3.776a6.64,6.64,0,0,0-9.163.678l-.967,1.013L11.6,4.454A6.64,6.64,0,0,0,2.44,3.776a7.241,7.241,0,0,0-.486,10.371l9.5,9.967a1.523,1.523,0,0,0,2.224,0l9.5-9.967A7.236,7.236,0,0,0,22.7,3.776Z"
                      transform="translate(0.001 -2.248)"
                    />
                  </svg>
                  <span>편의시설</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
