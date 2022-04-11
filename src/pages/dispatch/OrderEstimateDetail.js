import React, { useEffect, useState } from "react";
import { Api } from "../../utils/Api";
import { DispatchOrderForm } from "./Component";
import { useParams, useNavigate } from "react-router";
import routes from "../../utils/Routes";

export default function OrderEstimateDetail() {
  const { id } = useParams();
  const [datas, setDatas] = useState();
  let navigate = useNavigate();

  useEffect(async () => {
    try {
      const result = await Api.get(`/estimate/${id}`);
      console.log("RES", result);
      setDatas(result.data);
    } catch (err) {
      console.log("ERR", err.response);
    }
    slide();
  }, []);

  const slide = () => {
    const slideImg = document.querySelectorAll(".profileImg");
    const profileImgSlide = document.querySelector(".profileImgSlide");
    const slidePrevBtn = document.querySelector(".controlBtn img:nth-child(1)");
    const slideNextBtn = document.querySelector(".controlBtn img:nth-child(2)");
    const rocateDot = document.querySelectorAll(".rocateDot");
    const buttonBlockCover = document.querySelector(".buttonBlockCover");

    let slideCount = slideImg.length;
    let imageWidth = slideImg[0].width;
    let SlideWidthCount = 1;
    slidePrevBtn.addEventListener("click", preveBtn);
    slideNextBtn.addEventListener("click", nextBtn);

    function preveBtn() {
      buttonBlockCover.style.display = "block";
      profileImgSlide.style.transitionDuration = "0.4s";
      let translate = `${((SlideWidthCount - 2) * -100) / 8}%`;
      profileImgSlide.style.transform = `translate(${translate}, 0)`;
      SlideWidthCount = SlideWidthCount - 1;
      if (SlideWidthCount == 0) {
        setTimeout(function () {
          profileImgSlide.style.transitionDuration = "0s";
          profileImgSlide.style.transform = "translate(-62.5%, 0)";
        }, 400);
        SlideWidthCount = 6;
      }
      setTimeout(function () {
        buttonBlockCover.style.display = "none";
      }, 400);
      moveRocateDot();
    }

    function nextBtn() {
      buttonBlockCover.style.display = "block";
      profileImgSlide.style.transitionDuration = "0.4s";
      let translate = `${(SlideWidthCount * -100) / 8}%`;
      profileImgSlide.style.transform = `translate(${translate}, 0)`;
      SlideWidthCount = SlideWidthCount + 1;
      if (SlideWidthCount == 7) {
        setTimeout(function () {
          profileImgSlide.style.transitionDuration = "0s";
          profileImgSlide.style.transform = "translate(0, 0)";
        }, 400);
        SlideWidthCount = 1;
      }
      setTimeout(function () {
        buttonBlockCover.style.display = "none";
      }, 400);
      moveRocateDot();
    }

    function moveRocateDot() {
      //   console.log(SlideWidthCount);
      for (let i = 0; i < 6; i++) {
        rocateDot[i].classList.remove("rocation");
        if (SlideWidthCount == 1) {
          rocateDot[0].classList.add("rocation");
        } else if (SlideWidthCount == 2) {
          rocateDot[1].classList.add("rocation");
        } else if (SlideWidthCount == 3) {
          rocateDot[2].classList.add("rocation");
        } else if (SlideWidthCount == 4) {
          rocateDot[3].classList.add("rocation");
        } else if (SlideWidthCount == 5) {
          rocateDot[4].classList.add("rocation");
        } else if (SlideWidthCount == 6) {
          rocateDot[5].classList.add("rocation");
        }
      }
    }
  };

  const onClickSelect = async () => {
    try {
      const result = await Api.post("/dispatch", {
        order: datas.order.id,
        selected_estimate: datas.id,
      });
      console.log("RESSSS", result);
    } catch (err) {
      console.log("ERR", err.response);
    }
  };

  const onClickChat = async () => {
    let roomId = "";
    const { driverorcompany: id } = datas;
    try {
      const response = await Api.post("/chat", { driverorcompany: id });
      console.log("RES", response);
      roomId = response.data.room_id;
    } catch (err) {
      console.log("ERR", err.response);
      if (err.response.status === 301) {
        roomId = err.response.data.room_id;
        console.log("RRR", roomId);
      }
    }
    navigate(routes.chat(roomId));
  };
  function Content({ filter }) {
    const {
      driverorcompany_profile: driver,
      bus_cnt,
      bus_type,
      name,
      price,
      is_accomodation,
      is_convenience,
      is_meal,
      is_parking,
      is_tollgate,
      convenience,
    } = datas;

    return (
      <div class="estimateDetailBox">
        <div class="profileImgBox">
          <div class="profileImgCell">
            <div class="profileImgSlide">
              <img
                src="/assets/santorini.jpg"
                alt="산토리니"
                class="profileImg"
              />
              <img src="/assets/Prague.jpg" alt="프라하" class="profileImg" />
              <img src="/assets/seoul.png" alt="서울" class="profileImg" />
              <img src="/assets/paris.png" alt="파리" class="profileImg" />
              <img src="/assets/tokyo.png" alt="도쿄" class="profileImg" />
              <img src="/assets/Mongolia.jpg" alt="몽골" class="profileImg" />
              <img
                src="/assets/santorini.jpg"
                alt="산토리니"
                class="profileImg"
              />
              <img src="/assets/Prague.jpg" alt="프라하" class="profileImg" />
            </div>
            <div class="buttonBlockCover"></div>
          </div>
          <div class="controlBox">
            <div class="controlBtn">
              <img src="/assets/imgController.png" alt="컨트롤 아이콘 왼쪽" />
              <img src="/assets/imgController.png" alt="컨트롤 아이콘 오른쪽" />
            </div>
            <div class="imgRocateCell">
              <div class="rocateDot rocation"></div>
              <div class="rocateDot"></div>
              <div class="rocateDot"></div>
              <div class="rocateDot"></div>
              <div class="rocateDot"></div>
              <div class="rocateDot"></div>
            </div>
          </div>
        </div>

        <div class="driverdataArea">
          <img
            src="/assets/cmo_choi.png"
            alt="기사님 사진"
            class="driverProfile"
          />
          <div class="estimateBoxDataArea">
            <div class="estimateBoxMainArea">
              <div class="driverDataBox">
                <div class="driverName">
                  {name} 기사님
                  <img
                    class="driverRating"
                    src="/assets/grade4.0.png"
                    alt="평점 아이콘"
                  />
                  <span class="driverGrade">4.0</span>
                </div>
              </div>
              <div class="priceDataBox"></div>
            </div>
            <div class="estimateBoxSubArea">
              <div class="certificationBox">
                <div class="checkingCell">
                  <img src="/assets/people.png" alt="인증 아이콘" />
                  <span class="smallText">{driver.driver_com_name}</span>
                </div>
                <div class="checkingCell">
                  <img src="/assets/certification.png" alt="인증 아이콘" />
                  <span class="smallText">인증완료</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="estimateMainInforBox">
          <div class="estimateMainInforCell estimateMainInforCellBus">
            <span>버스정보</span>
            <span>{bus_type}</span>
          </div>
          <div class="estimateMainInforCell estimateMainInforCellBusNumber">
            <span>버스대수</span>
            <span>{bus_cnt}대</span>
          </div>
          <div class="estimateMainInforCell estimateMainInforCellPrice">
            <span>금액</span>
            <span>{price}만원</span>
          </div>
        </div>

        <div class="estimateDetailCell">
          <span class="estimateDetailTitle">부대비용</span>
          <div class="informationsToIcon">
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26.817"
                height="20.104"
                viewBox="0 0 31.817 20.104"
              >
                <path
                  id="Icon_awesome-money-bill-alt"
                  fill={is_tollgate ? "#B00020" : "#7F7F7F"}
                  data-name="Icon awesome-money-bill-alt"
                  d="M17.5,16.227h-.8V11.62a.409.409,0,0,0-.4-.419h-.675a1.149,1.149,0,0,0-.662.211l-.762.535a.432.432,0,0,0-.11.581l.441.7a.385.385,0,0,0,.551.116l.023-.016v2.9h-.8a.409.409,0,0,0-.4.419v.838a.409.409,0,0,0,.4.419H17.5a.409.409,0,0,0,.4-.419v-.838A.409.409,0,0,0,17.5,16.227ZM30.226,4.5H1.591A1.635,1.635,0,0,0,0,6.175V22.928A1.635,1.635,0,0,0,1.591,24.6H30.226a1.635,1.635,0,0,0,1.591-1.675V6.175A1.635,1.635,0,0,0,30.226,4.5ZM2.386,22.091V18.74a3.269,3.269,0,0,1,3.182,3.351Zm0-11.727V7.013H5.568A3.269,3.269,0,0,1,2.386,10.364ZM15.909,20.415c-2.636,0-4.773-2.626-4.773-5.864s2.137-5.864,4.773-5.864,4.773,2.625,4.773,5.864S18.544,20.415,15.909,20.415Zm13.522,1.675H26.249a3.269,3.269,0,0,1,3.182-3.351Zm0-11.727a3.269,3.269,0,0,1-3.182-3.351h3.182Z"
                  transform="translate(0 -4.5)"
                />
              </svg>
              <span class="smallText">톨비</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.575"
                height="22.06"
                viewBox="0 0 27.575 22.06"
              >
                <path
                  id="Icon_awesome-car-alt"
                  fill={is_parking ? "#B00020" : "#7F7F7F"}
                  data-name="Icon awesome-car-alt"
                  d="M25.2,13.021l-.646-1.614L23.409,8.544A6.4,6.4,0,0,0,17.435,4.5h-7.3A6.4,6.4,0,0,0,4.166,8.544L3.021,11.407l-.646,1.614A3.669,3.669,0,0,0,0,16.449v2.757a3.647,3.647,0,0,0,.919,2.409v3.106A1.839,1.839,0,0,0,2.757,26.56H4.6a1.839,1.839,0,0,0,1.838-1.838V22.883H21.141v1.838a1.839,1.839,0,0,0,1.838,1.838h1.838a1.839,1.839,0,0,0,1.838-1.838V21.615a3.644,3.644,0,0,0,.919-2.409V16.449A3.669,3.669,0,0,0,25.2,13.021ZM7.579,9.91a2.758,2.758,0,0,1,2.56-1.733h7.3A2.758,2.758,0,0,1,20,9.91l1.145,2.863H6.434L7.579,9.91ZM4.6,19.2a1.734,1.734,0,0,1-1.838-1.833A1.734,1.734,0,0,1,4.6,15.53a3.537,3.537,0,0,1,2.757,2.749C7.353,19.378,5.7,19.2,4.6,19.2Zm18.383,0c-1.1,0-2.757.183-2.757-.916a3.537,3.537,0,0,1,2.757-2.749,1.734,1.734,0,0,1,1.838,1.833A1.734,1.734,0,0,1,22.979,19.2Z"
                  transform="translate(0 -4.5)"
                />
              </svg>
              <span class="smallText">주차비</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21.275"
                height="26.275"
                viewBox="0 0 26.275 26.275"
              >
                <path
                  id="Icon_map-food"
                  fill={is_meal ? "#B00020" : "#7F7F7F"}
                  data-name="Icon map-food"
                  d="M26.937,9.838,24.783,29.1H17.508L15.362,9.742h8.882L26,2.825l1,.342L25.311,9.823l1.626.014Zm-12.6,11.144s.272-2.5-3.5-2.5H4.825c-3.767,0-3.5,2.5-3.5,2.5ZM1.324,26.6s-.267,2.5,3.5,2.5h6.009c3.773,0,3.5-2.5,3.5-2.5ZM13.77,25.353c.617,0,1.116-.7,1.116-1.561s-.5-1.562-1.116-1.562H1.837c-.615,0-1.117.692-1.117,1.562s.5,1.561,1.117,1.561Z"
                  transform="translate(-0.72 -2.825)"
                />
              </svg>
              <span class="smallText">식사비</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28.791"
                height="21.331"
                viewBox="0 0 33.791 21.331"
              >
                <path
                  id="Icon_metro-hotel"
                  fill={is_accomodation ? "#B00020" : "#7F7F7F"}
                  data-name="Icon metro-hotel"
                  d="M13.072,20.374a4.45,4.45,0,0,0,4.608-4.266,4.45,4.45,0,0,0-4.608-4.266,4.45,4.45,0,0,0-4.608,4.266A4.45,4.45,0,0,0,13.072,20.374ZM31.5,11.842H19.216V21.8H6.928V9H3.856V30.328H6.928V26.062H34.575v4.266h3.072V17.53A5.928,5.928,0,0,0,31.5,11.842Z"
                  transform="translate(-3.856 -8.997)"
                />
              </svg>
              <span class="smallText">숙박비</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.142"
                height="22.349"
                viewBox="0 0 25.142 22.349"
              >
                <path
                  id="Icon_awesome-heart"
                  fill={is_convenience ? "#B00020" : "#7F7F7F"}
                  data-name="Icon awesome-heart"
                  d="M22.7,3.776a6.64,6.64,0,0,0-9.163.678l-.967,1.013L11.6,4.454A6.64,6.64,0,0,0,2.44,3.776a7.241,7.241,0,0,0-.486,10.371l9.5,9.967a1.523,1.523,0,0,0,2.224,0l9.5-9.967A7.236,7.236,0,0,0,22.7,3.776Z"
                  transform="translate(0.001 -2.248)"
                />
              </svg>
              <span class="smallText">편의시설</span>
            </div>
          </div>
        </div>

        <div class="estimateDetailCell">
          <span class="estimateDetailTitle">편의시설</span>
          <div class="informationsToIcon">
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="24.5"
                viewBox="0 0 17 24.5"
              >
                <g
                  id="그룹_794"
                  data-name="그룹 794"
                  transform="translate(-1092 -209)"
                >
                  <g
                    id="사각형_10401"
                    data-name="사각형 10401"
                    transform="translate(1092 209)"
                    fill="none"
                    stroke={
                      convenience && convenience.includes("냉장고")
                        ? "#b80000"
                        : "#7F7F7F"
                    }
                    stroke-width="2"
                  >
                    <rect width="17" height="23" rx="3" stroke="none" />
                    <rect
                      x="1"
                      y="1"
                      width="15"
                      height="21"
                      rx="2"
                      fill="none"
                    />
                  </g>
                  <g
                    id="사각형_10402"
                    data-name="사각형 10402"
                    transform="translate(1092 209)"
                    fill="none"
                    stroke={
                      convenience && convenience.includes("냉장고")
                        ? "#b80000"
                        : "#7F7F7F"
                    }
                    stroke-width="2"
                  >
                    <path
                      d="M3,0H14a3,3,0,0,1,3,3v7a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V3A3,3,0,0,1,3,0Z"
                      stroke="none"
                    />
                    <path
                      d="M3,1H14a2,2,0,0,1,2,2V9a0,0,0,0,1,0,0H1A0,0,0,0,1,1,9V3A2,2,0,0,1,3,1Z"
                      fill="none"
                    />
                  </g>
                  <line
                    id="선_975"
                    data-name="선 975"
                    y2="2"
                    transform="translate(1096.5 213)"
                    fill="none"
                    stroke={
                      convenience && convenience.includes("냉장고")
                        ? "#b80000"
                        : "#7F7F7F"
                    }
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <line
                    id="선_976"
                    data-name="선 976"
                    y2="3"
                    transform="translate(1096.5 221)"
                    fill="none"
                    stroke={
                      convenience && convenience.includes("냉장고")
                        ? "#b80000"
                        : "#7F7F7F"
                    }
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <line
                    id="선_977"
                    data-name="선 977"
                    y2="1"
                    transform="translate(1097 231.5)"
                    fill="none"
                    stroke={
                      convenience && convenience.includes("냉장고")
                        ? "#b80000"
                        : "#7F7F7F"
                    }
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <line
                    id="선_978"
                    data-name="선 978"
                    y2="1"
                    transform="translate(1105 231.5)"
                    fill="none"
                    stroke={
                      convenience && convenience.includes("냉장고")
                        ? "#b80000"
                        : "#7F7F7F"
                    }
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                </g>
              </svg>

              <span class="smallText">냉장고</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.143"
                height="14.1"
                viewBox="0 0 20.143 14.1"
              >
                <path
                  id="Icon_awesome-wifi"
                  data-name="Icon awesome-wifi"
                  d="M19.983,6.117a14.634,14.634,0,0,0-19.822,0,.5.5,0,0,0-.011.723L1.227,7.91a.511.511,0,0,0,.7.012,12.075,12.075,0,0,1,16.279,0,.511.511,0,0,0,.7-.012l1.078-1.069A.5.5,0,0,0,19.983,6.117Zm-9.911,6.2a2.014,2.014,0,1,0,2.014,2.014A2.014,2.014,0,0,0,10.071,12.321ZM16.45,9.691a9.662,9.662,0,0,0-12.757,0,.5.5,0,0,0-.018.729l1.084,1.07a.514.514,0,0,0,.694.025,7.089,7.089,0,0,1,9.237,0,.513.513,0,0,0,.694-.025l1.084-1.07A.5.5,0,0,0,16.45,9.691Z"
                  transform="translate(0 -2.25)"
                  fill="#b80000"
                />
              </svg>

              <span class="smallText">와이파이</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.379"
                height="13.672"
                viewBox="0 0 22.379 13.672"
              >
                <path
                  id="Icon_awesome-usb"
                  data-name="Icon awesome-usb"
                  d="M22.379,11.06a.293.293,0,0,1-.157.262l-3.108,1.866a.308.308,0,0,1-.157.049A.326.326,0,0,1,18.8,13.2a.314.314,0,0,1-.157-.272V11.684H10.316c.883,1.382,1.413,3.729,2.428,3.729h.931v-.935a.307.307,0,0,1,.31-.31h3.108a.307.307,0,0,1,.31.31v3.108a.307.307,0,0,1-.31.31H13.986a.307.307,0,0,1-.31-.31v-.931h-.931c-2.63,0-2.829-4.971-4.35-4.971h-3.5a2.489,2.489,0,1,1,0-1.245c1.364,0,1.532.331,2.6-2.107,1.4-3.108,2.027-2.864,3.8-2.864a1.866,1.866,0,1,1,0,1.249h-1.04c-1.015,0-1.545,2.351-2.428,3.729H18.647V9.2a.313.313,0,0,1,.157-.272.293.293,0,0,1,.31.01l3.108,1.866A.266.266,0,0,1,22.379,11.06Z"
                  transform="translate(0 -4.226)"
                  fill="#b80000"
                />
              </svg>

              <span class="smallText">USB포트</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.198"
                height="17.199"
                viewBox="0 0 17.198 17.199"
              >
                <path
                  id="Icon_awesome-music"
                  data-name="Icon awesome-music"
                  d="M17.2,1.075A1.074,1.074,0,0,0,15.8.05L5.052,3.224A1.075,1.075,0,0,0,4.3,4.249V13.03A4.647,4.647,0,0,0,3.225,12.9C1.444,12.9,0,13.861,0,15.048S1.444,17.2,3.225,17.2s3.225-.962,3.225-2.15V7.2l8.6-2.52v6.2a4.647,4.647,0,0,0-1.075-.132c-1.781,0-3.225.962-3.225,2.15s1.444,2.15,3.225,2.15S17.2,14.086,17.2,12.9V1.075Z"
                  transform="translate(0 0.001)"
                  fill="#b80000"
                />
              </svg>

              <span class="smallText">음향기기</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.573"
                height="15.799"
                viewBox="0 0 22.573 15.799"
              >
                <path
                  id="Icon_awesome-coffee"
                  data-name="Icon awesome-coffee"
                  d="M6.769,14.664H13.54a3.386,3.386,0,0,0,3.386-3.386h1.129a4.514,4.514,0,0,0,0-9.028H4.23a.844.844,0,0,0-.846.846v8.182A3.386,3.386,0,0,0,6.769,14.664ZM18.054,4.507a2.257,2.257,0,0,1,0,4.514H16.926V4.507Zm1.682,13.542H1.7c-1.679,0-2.151-2.257-1.27-2.257H21c.882,0,.416,2.257-1.266,2.257Z"
                  transform="translate(0.004 -2.25)"
                  fill="#b80000"
                />
              </svg>

              <span class="smallText">커피메이커</span>
            </div>
            <div class="inforToIconCell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.417"
                height="14.132"
                viewBox="0 0 18.417 14.132"
              >
                <path
                  id="Icon_material-movie-creation"
                  data-name="Icon material-movie-creation"
                  d="M17.734,6l1.842,3.533H16.813L14.971,6H13.129l1.842,3.533H12.208L10.367,6H8.525l1.842,3.533H7.6L5.763,6H4.842A1.8,1.8,0,0,0,3.009,7.766L3,18.365a1.811,1.811,0,0,0,1.842,1.766H19.575a1.811,1.811,0,0,0,1.842-1.766V6Z"
                  transform="translate(-3 -6)"
                  fill="#b00020"
                />
              </svg>

              <span class="smallText">영화관람</span>
            </div>
          </div>
        </div>

        <div class="estimateDetailCell">
          <span class="estimateDetailTitle">회사정보</span>
          <div class="companyInformationBox">
            <img src="/assets/companyImage.png" alt="회사이미지" />
            <div class="companyInformationDataBox">
              <div class="companyInformationDataCell">
                <span>회사명</span>
                <span>성화투어</span>
              </div>
              <div class="companyInformationDataCell">
                <span>회사 소재지</span>
                <span>경기도 수원시</span>
              </div>
              <div class="companyInformationDataCell">
                <span>차고지</span>
                <span>경기도 수원시</span>
              </div>
              <div class="companyInformationDataCellLast">
                <span>설립년도</span>
                <span>2020.11.22</span>
              </div>
            </div>
          </div>
        </div>

        <div class="estimateDetailCell">
          <span class="estimateDetailTitle">리뷰</span>
          <div class="gradeTitleBox">
            <div class="gradeTitleCell">
              <span>평점</span>
              <span>4.8</span>
            </div>
            <div class="gradeCountTitleCell">
              <span>리뷰개수</span>
              <span>999+</span>
            </div>
          </div>
          <div class="gradeBox">
            <div class="gradeCell">
              <div class="userDataBox">
                <div class="userGradeCell">
                  <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                  <span>4.0</span>
                </div>
                <div class="userDataCell">
                  <span>이도울</span>
                  <span>2021.0.4.0.7</span>
                </div>
              </div>
              <div class="gradeContents">
                버스에 편의시설들도 다 좋고, 기사님도 아주 친절하십니다.
                성화투어 아주 추천드립니다~~버스에 편의시설들도 다 좋고,
                기사님도 아주 친절하십니다. 성화투어 아주 추천드립니다~~
              </div>
            </div>
            <div class="gradeCell">
              <div class="userDataBox">
                <div class="userGradeCell">
                  <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                  <span>4.0</span>
                </div>
                <div class="userDataCell">
                  <span>이도울</span>
                  <span>2021.0.4.0.7</span>
                </div>
              </div>
              <div class="gradeContents">
                버스에 편의시설들도 다 좋고, 기사님도 아주 친절하십니다.
                성화투어 아주 추천드립니다~~버스에 편의시설들도 다 좋고,
                기사님도 아주 친절하십니다. 성화투어 아주 추천드립니다~~
              </div>
            </div>
            <div class="gradeCell">
              <div class="userDataBox">
                <div class="userGradeCell">
                  <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                  <span>4.0</span>
                </div>
                <div class="userDataCell">
                  <span>이도울</span>
                  <span>2021.0.4.0.7</span>
                </div>
              </div>
              <div class="gradeContents">
                버스에 편의시설들도 다 좋고, 기사님도 아주 친절하십니다.
                성화투어 아주 추천드립니다~~버스에 편의시설들도 다 좋고,
                기사님도 아주 친절하십니다. 성화투어 아주 추천드립니다~~
              </div>
            </div>
            <div class="gradeCell">
              <div class="userDataBox">
                <div class="userGradeCell">
                  <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                  <span>4.0</span>
                </div>
                <div class="userDataCell">
                  <span>이도울</span>
                  <span>2021.0.4.0.7</span>
                </div>
              </div>
              <div class="gradeContents">
                버스에 편의시설들도 다 좋고, 기사님도 아주 친절하십니다.
                성화투어 아주 추천드립니다~~버스에 편의시설들도 다 좋고,
                기사님도 아주 친절하십니다. 성화투어 아주 추천드립니다~~
              </div>
            </div>
            <div class="gradeCell">
              <div class="userDataBox">
                <div class="userGradeCell">
                  <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                  <span>4.0</span>
                </div>
                <div class="userDataCell">
                  <span>이도울</span>
                  <span>2021.0.4.0.7</span>
                </div>
              </div>
              <div class="gradeContents">
                버스에 편의시설들도 다 좋고, 기사님도 아주 친절하십니다.
                성화투어 아주 추천드립니다~~버스에 편의시설들도 다 좋고,
                기사님도 아주 친절하십니다. 성화투어 아주 추천드립니다~~
              </div>
            </div>
            <div class="gradeCell">
              <div class="userDataBox">
                <div class="userGradeCell">
                  <img src="/assets/grade4.0.png" alt="평점 아이콘" />
                  <span>4.0</span>
                </div>
                <div class="userDataCell">
                  <span>이도울</span>
                  <span>2021.0.4.0.7</span>
                </div>
              </div>
              <div class="gradeContents">
                버스에 편의시설들도 다 좋고, 기사님도 아주 친절하십니다.
                성화투어 아주 추천드립니다~~버스에 편의시설들도 다 좋고,
                기사님도 아주 친절하십니다. 성화투어 아주 추천드립니다~~
              </div>
            </div>
          </div>
        </div>

        <div class="reservationBtn">예약하기</div>
      </div>
    );
  }
  return (
    <>{datas && <DispatchOrderForm Content={Content} order={datas.order} />}</>
  );
}
