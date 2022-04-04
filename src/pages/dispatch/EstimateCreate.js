import React, { useEffect, useState, useRef } from 'react';
import './EstimateCreate.css';
import { Api } from '../../utils/Api';
import { useParams } from "react-router";
import { OrderInfo } from './Component';

export default function EstimateCreate() {
    const { id } = useParams();
    const [inputs, setInputs] = useState({is_tollgate: false, is_parking: false, is_accomodation: false, is_meal: false, is_convenience: false});
    const toll = useRef();
    const parking = useRef();
    const accomodation = useRef();
    const meal = useRef();
    const convenience = useRef();
    const totalPrice = useRef();
    const [datas, setDatas] = useState();

    useEffect(async () => {
        const result = await Api.get(`order/${id}`);
        console.log("RESULT", result);
        setDatas(result.data);
    }, [])

    const onChange = (e) => {
        
        const { value, name } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value,
        }))
        console.log("INPUts", inputs);
    }

    const postEstimate = async () => {
        const data = {
            ...inputs,
            order: id,
            price: inputs.pricebycar * inputs.bus_cnt
        }
        try {
            const response = await Api.post('estimate', data);
            console.log("RESPONSE", response);
            window.alert("견적 생성 완료");
        }
        catch(err){
            console.log("ERR", err.response.data.detail);
            
            if(err.response.data.detail === "You can't apply more than 1 offer in same Order!"){
                window.alert('한 주문에 여러 견적을 넣을 수 없습니다.');
            }else {
                window.alert('에러', err);
            }
        }

    }

    const onClickService = (e) => {
        const target = e.target;
        const SurchargeCell = document.querySelectorAll(".SurchargeCell");
        if (target.checked === true) {
            SurchargeCell[target.id].querySelector(".SurchargeCell svg path").style.fill = "#b00020"
            SurchargeCell[target.id].querySelector(".SurchargeCell span").style.color = "#b00020"
            SurchargeCell[target.id].classList.remove("changeColor")
            SurchargeCell[parseInt(target.id) + 5].classList.remove("displayNone")

            setInputs(prev => ({
                ...prev,
                [target.name]: true
            }))
        
            
        } else {            
            SurchargeCell[target.id].querySelector(".SurchargeCell svg path").style.fill = "#7F7F7F"
            SurchargeCell[target.id].querySelector(".SurchargeCell span").style.color = "#7F7F7F"
            SurchargeCell[target.id].classList.add("changeColor")
            SurchargeCell[parseInt(target.id) + 5].classList.add("displayNone")

            setInputs(prev => ({
                ...prev,
                [target.name]: false
            }))
        }
        
    }
    
    return (
        <>
            <div class="topOrder" style={{ height: "auto" }}>

                {datas && <OrderInfo data={datas} />}

            </div>
            <div class="mainContainer">
                <div class="mainContentsArea">

                    <div class="estimateCreate">

                        <div class="estimateCreateContainer">
                            <div class="estimateinputBox">
                                <div class="paymentInputCell estimateInputCell">
                                    <span class="estimateInputCellText">금액</span>
                                    <input onChange={onChange} name="pricebycar" type="number" class="estimateInput estimateInputPayment" />
                                    <span class="paymentUnit">만원</span>
                                </div>
                                <div class="busKindsInputCell estimateInputCell">
                                    <span class="estimateInputCellText">차량종류</span>
                                    <select onChange={onChange} name="bus_type" class="estimateSelect">
                                        <option value=""></option>
                                        <option value="45인승">45인승</option>
                                        <option value="21인승">21인승</option>
                                        <option value="16인승">16인승</option>
                                    </select>
                                </div>
                                <div class="additionalFeeInputCell estimateInputCell">
                                    <span class="estimateInputCellText">부대비용</span>
                                    <div class="surchargeContainer">
                                        <div class="SurchargeBox">
                                            <label class="SurchargeCell changeColor" id="0" >
                                                <input onChange={onClickService} type="checkbox" id="0" hidden="true" name="is_tollgate" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="31.817" height="20.104" viewBox="0 0 31.817 20.104">
                                                    <path id="Icon_awesome-money-bill-alt" data-name="Icon awesome-money-bill-alt" d="M17.5,16.227h-.8V11.62a.409.409,0,0,0-.4-.419h-.675a1.149,1.149,0,0,0-.662.211l-.762.535a.432.432,0,0,0-.11.581l.441.7a.385.385,0,0,0,.551.116l.023-.016v2.9h-.8a.409.409,0,0,0-.4.419v.838a.409.409,0,0,0,.4.419H17.5a.409.409,0,0,0,.4-.419v-.838A.409.409,0,0,0,17.5,16.227ZM30.226,4.5H1.591A1.635,1.635,0,0,0,0,6.175V22.928A1.635,1.635,0,0,0,1.591,24.6H30.226a1.635,1.635,0,0,0,1.591-1.675V6.175A1.635,1.635,0,0,0,30.226,4.5ZM2.386,22.091V18.74a3.269,3.269,0,0,1,3.182,3.351Zm0-11.727V7.013H5.568A3.269,3.269,0,0,1,2.386,10.364ZM15.909,20.415c-2.636,0-4.773-2.626-4.773-5.864s2.137-5.864,4.773-5.864,4.773,2.625,4.773,5.864S18.544,20.415,15.909,20.415Zm13.522,1.675H26.249a3.269,3.269,0,0,1,3.182-3.351Zm0-11.727a3.269,3.269,0,0,1-3.182-3.351h3.182Z" transform="translate(0 -4.5)" fill="#7f7f7f" />
                                                </svg>
                                                <span class="SurchargeCellText">톨비</span>
                                            </label>
                                            <label class="SurchargeCell changeColor" id="1" >
                                                <input onClick={onClickService} type="checkbox" id="1" hidden="true" name="is_parking" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27.575" height="22.06" viewBox="0 0 27.575 22.06">
                                                    <path id="Icon_awesome-car-alt" data-name="Icon awesome-car-alt" d="M25.2,13.021l-.646-1.614L23.409,8.544A6.4,6.4,0,0,0,17.435,4.5h-7.3A6.4,6.4,0,0,0,4.166,8.544L3.021,11.407l-.646,1.614A3.669,3.669,0,0,0,0,16.449v2.757a3.647,3.647,0,0,0,.919,2.409v3.106A1.839,1.839,0,0,0,2.757,26.56H4.6a1.839,1.839,0,0,0,1.838-1.838V22.883H21.141v1.838a1.839,1.839,0,0,0,1.838,1.838h1.838a1.839,1.839,0,0,0,1.838-1.838V21.615a3.644,3.644,0,0,0,.919-2.409V16.449A3.669,3.669,0,0,0,25.2,13.021ZM7.579,9.91a2.758,2.758,0,0,1,2.56-1.733h7.3A2.758,2.758,0,0,1,20,9.91l1.145,2.863H6.434L7.579,9.91ZM4.6,19.2a1.734,1.734,0,0,1-1.838-1.833A1.734,1.734,0,0,1,4.6,15.53a3.537,3.537,0,0,1,2.757,2.749C7.353,19.378,5.7,19.2,4.6,19.2Zm18.383,0c-1.1,0-2.757.183-2.757-.916a3.537,3.537,0,0,1,2.757-2.749,1.734,1.734,0,0,1,1.838,1.833A1.734,1.734,0,0,1,22.979,19.2Z" transform="translate(0 -4.5)" fill="#7f7f7f" />
                                                </svg>
                                                <span class="SurchargeCellText">주차비</span>
                                            </label>
                                            <label class="SurchargeCell changeColor" id="2" >
                                                <input onClick={onClickService} type="checkbox" id="2" hidden="true" name="is_meal" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26.275" height="26.275" viewBox="0 0 26.275 26.275">
                                                    <path id="Icon_map-food" data-name="Icon map-food" d="M26.937,9.838,24.783,29.1H17.508L15.362,9.742h8.882L26,2.825l1,.342L25.311,9.823l1.626.014Zm-12.6,11.144s.272-2.5-3.5-2.5H4.825c-3.767,0-3.5,2.5-3.5,2.5ZM1.324,26.6s-.267,2.5,3.5,2.5h6.009c3.773,0,3.5-2.5,3.5-2.5ZM13.77,25.353c.617,0,1.116-.7,1.116-1.561s-.5-1.562-1.116-1.562H1.837c-.615,0-1.117.692-1.117,1.562s.5,1.561,1.117,1.561Z" transform="translate(-0.72 -2.825)" fill="#7f7f7f" />
                                                </svg>
                                                <span class="SurchargeCellText">식사비</span>
                                            </label>
                                            <label class="SurchargeCell changeColor" id="3" >
                                                <input onClick={onClickService} type="checkbox" id="3" hidden="true" name="is_accomodation" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="33.791" height="21.331" viewBox="0 0 33.791 21.331">
                                                    <path id="Icon_metro-hotel" data-name="Icon metro-hotel" d="M13.072,20.374a4.45,4.45,0,0,0,4.608-4.266,4.45,4.45,0,0,0-4.608-4.266,4.45,4.45,0,0,0-4.608,4.266A4.45,4.45,0,0,0,13.072,20.374ZM31.5,11.842H19.216V21.8H6.928V9H3.856V30.328H6.928V26.062H34.575v4.266h3.072V17.53A5.928,5.928,0,0,0,31.5,11.842Z" transform="translate(-3.856 -8.997)" fill="#7f7f7f" />
                                                </svg>
                                                <span class="SurchargeCellText">숙박비</span>
                                            </label>
                                            <label class="SurchargeCell changeColor" id="4" >
                                                <input onClick={onClickService} type="checkbox" id="4" hidden="true" name="is_convenience" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25.142" height="22.349" viewBox="0 0 25.142 22.349">
                                                    <path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M22.7,3.776a6.64,6.64,0,0,0-9.163.678l-.967,1.013L11.6,4.454A6.64,6.64,0,0,0,2.44,3.776a7.241,7.241,0,0,0-.486,10.371l9.5,9.967a1.523,1.523,0,0,0,2.224,0l9.5-9.967A7.236,7.236,0,0,0,22.7,3.776Z" transform="translate(0.001 -2.248)" fill="#7f7f7f" />
                                                </svg>
                                                <span class="SurchargeCellText">편의시설</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="vehiclesInputCell estimateInputCell">
                                    <span class="estimateInputCellText">차량대수</span>
                                    <input onChange={onChange} name="bus_cnt" type="number" class="estimateInput" />
                                </div>
                            </div>
                            <div class="estimateTotalBox">
                                <span>총 금액</span>
                                <div>
                                    <span ref={totalPrice} class="totalAmount">{inputs.pricebycar && inputs.bus_cnt && inputs.pricebycar * inputs.bus_cnt}</span>
                                    <span>만원</span>
                                </div>
                            </div>
                        </div>

                        <div class="previweCell">
                            <div class="previweCellDashed frontDashed"></div>
                            <span>미리보기</span>
                            <div class="previweCellDashed backDashed"></div>
                        </div>

                        <div class="orderContainer">


                            <a href="companyProfile.html">
                                <div class="profileBox">
                                    <img src="/assets/ceo_intro_kim.jpg" alt="기사님 사진(임시)" />
                                    <div class="profileBtn">프로필 자세히 보기</div>
                                </div>
                            </a>

                            <div class="orderInfoContainer">
                                <div class="orderInfoContainerTop">
                                    <div class="driverInfoBox">
                                        <div class="driverGradeCell">
                                            <img src="/assets/grade4.0.png" alt="평점4.0아이콘" />
                                            <span>4.0</span>
                                        </div>
                                        <div class="driverInfoCell">
                                            <span>김형주 기사님</span>
                                            <span>{inputs.bus_type}</span>
                                        </div>
                                    </div>
                                    <div class="priceCell">
                                        <div>₩<span>{inputs.pricebycar && inputs.bus_cnt && inputs.pricebycar * inputs.bus_cnt}</span>만원</div>
                                        <div class="previwePrice">
                                            1대
                                            <span class="previweAmount">{inputs.pricebycar}</span>만원
                                            <span class="previweVehicles">{inputs.bus_cnt}</span>대
                                        </div>
                                    </div>
                                </div>


                                <div class="orderInfoContainerBottom">
                                    <div class="certificationBox">
                                        <div class="certificationCell">
                                            <img src="/assets/certification.png" alt="인증서 아이콘" />
                                            <div>
                                                <span>소속</span>
                                                <div class="certificationCompany">성화투어</div>
                                            </div>
                                        </div>
                                        <div class="certificationCell">
                                            <img src="/assets/certification.png" alt="인증서 아이콘" />
                                            <div>
                                                <span>공제조합 증명서</span>
                                                <span>인증완료</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="SurchargeBox prviweSurchargeBox">
                                        <div ref={toll} class="SurchargeCell previweSurchargeCell displayNone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="31.817" height="20.104" viewBox="0 0 31.817 20.104">
                                                <path id="Icon_awesome-money-bill-alt" fill="#b00020" data-name="Icon awesome-money-bill-alt" d="M17.5,16.227h-.8V11.62a.409.409,0,0,0-.4-.419h-.675a1.149,1.149,0,0,0-.662.211l-.762.535a.432.432,0,0,0-.11.581l.441.7a.385.385,0,0,0,.551.116l.023-.016v2.9h-.8a.409.409,0,0,0-.4.419v.838a.409.409,0,0,0,.4.419H17.5a.409.409,0,0,0,.4-.419v-.838A.409.409,0,0,0,17.5,16.227ZM30.226,4.5H1.591A1.635,1.635,0,0,0,0,6.175V22.928A1.635,1.635,0,0,0,1.591,24.6H30.226a1.635,1.635,0,0,0,1.591-1.675V6.175A1.635,1.635,0,0,0,30.226,4.5ZM2.386,22.091V18.74a3.269,3.269,0,0,1,3.182,3.351Zm0-11.727V7.013H5.568A3.269,3.269,0,0,1,2.386,10.364ZM15.909,20.415c-2.636,0-4.773-2.626-4.773-5.864s2.137-5.864,4.773-5.864,4.773,2.625,4.773,5.864S18.544,20.415,15.909,20.415Zm13.522,1.675H26.249a3.269,3.269,0,0,1,3.182-3.351Zm0-11.727a3.269,3.269,0,0,1-3.182-3.351h3.182Z" transform="translate(0 -4.5)" />
                                            </svg>
                                            <span>톨비</span>
                                        </div>
                                        <div ref={parking} class="SurchargeCell previweSurchargeCell displayNone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27.575" height="22.06" viewBox="0 0 27.575 22.06">
                                                <path id="Icon_awesome-car-alt" fill="#b00020" data-name="Icon awesome-car-alt" d="M25.2,13.021l-.646-1.614L23.409,8.544A6.4,6.4,0,0,0,17.435,4.5h-7.3A6.4,6.4,0,0,0,4.166,8.544L3.021,11.407l-.646,1.614A3.669,3.669,0,0,0,0,16.449v2.757a3.647,3.647,0,0,0,.919,2.409v3.106A1.839,1.839,0,0,0,2.757,26.56H4.6a1.839,1.839,0,0,0,1.838-1.838V22.883H21.141v1.838a1.839,1.839,0,0,0,1.838,1.838h1.838a1.839,1.839,0,0,0,1.838-1.838V21.615a3.644,3.644,0,0,0,.919-2.409V16.449A3.669,3.669,0,0,0,25.2,13.021ZM7.579,9.91a2.758,2.758,0,0,1,2.56-1.733h7.3A2.758,2.758,0,0,1,20,9.91l1.145,2.863H6.434L7.579,9.91ZM4.6,19.2a1.734,1.734,0,0,1-1.838-1.833A1.734,1.734,0,0,1,4.6,15.53a3.537,3.537,0,0,1,2.757,2.749C7.353,19.378,5.7,19.2,4.6,19.2Zm18.383,0c-1.1,0-2.757.183-2.757-.916a3.537,3.537,0,0,1,2.757-2.749,1.734,1.734,0,0,1,1.838,1.833A1.734,1.734,0,0,1,22.979,19.2Z" transform="translate(0 -4.5)" />
                                            </svg>
                                            <span>주차비</span>
                                        </div>
                                        <div ref={accomodation} class="SurchargeCell previweSurchargeCell displayNone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26.275" height="26.275" viewBox="0 0 26.275 26.275">
                                                <path id="Icon_map-food" fill="#b00020" data-name="Icon map-food" d="M26.937,9.838,24.783,29.1H17.508L15.362,9.742h8.882L26,2.825l1,.342L25.311,9.823l1.626.014Zm-12.6,11.144s.272-2.5-3.5-2.5H4.825c-3.767,0-3.5,2.5-3.5,2.5ZM1.324,26.6s-.267,2.5,3.5,2.5h6.009c3.773,0,3.5-2.5,3.5-2.5ZM13.77,25.353c.617,0,1.116-.7,1.116-1.561s-.5-1.562-1.116-1.562H1.837c-.615,0-1.117.692-1.117,1.562s.5,1.561,1.117,1.561Z" transform="translate(-0.72 -2.825)" />
                                            </svg>
                                            <span>톨비</span>
                                        </div>
                                        <div ref={meal} class="SurchargeCell previweSurchargeCell displayNone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="33.791" height="21.331" viewBox="0 0 33.791 21.331">
                                                <path id="Icon_metro-hotel" fill="#b00020" data-name="Icon metro-hotel" d="M13.072,20.374a4.45,4.45,0,0,0,4.608-4.266,4.45,4.45,0,0,0-4.608-4.266,4.45,4.45,0,0,0-4.608,4.266A4.45,4.45,0,0,0,13.072,20.374ZM31.5,11.842H19.216V21.8H6.928V9H3.856V30.328H6.928V26.062H34.575v4.266h3.072V17.53A5.928,5.928,0,0,0,31.5,11.842Z" transform="translate(-3.856 -8.997)" />
                                            </svg>
                                            <span>톨비</span>
                                        </div>
                                        <div ref={convenience} class="SurchargeCell previweSurchargeCell displayNone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25.142" height="22.349" viewBox="0 0 25.142 22.349">
                                                <path id="Icon_awesome-heart" fill="#b00020" data-name="Icon awesome-heart" d="M22.7,3.776a6.64,6.64,0,0,0-9.163.678l-.967,1.013L11.6,4.454A6.64,6.64,0,0,0,2.44,3.776a7.241,7.241,0,0,0-.486,10.371l9.5,9.967a1.523,1.523,0,0,0,2.224,0l9.5-9.967A7.236,7.236,0,0,0,22.7,3.776Z" transform="translate(0.001 -2.248)" />
                                            </svg>
                                            <span>톨비</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <button onClick={postEstimate} class="createEstimate createEstimateregistration">견적 등록하기</button>

                    </div>

                </div>

            </div>
        </>
    )

}