import React, { useEffect, useState, useRef } from 'react';
import EstimateForm from './EstimateForm';
import { Api } from '../../utils/Api';
import { useNavigate  } from 'react-router-dom';
import { OrderInfo } from './Component';
import routes from '../../utils/Routes';

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
        const navigate = useNavigate();
        //const infoRef = useRef();
        
        const onClickCreate = (id) => {
            console.log("CLICDKLJLSC", id)
            // navigate(routes.estimateCreate(id));
            window.location.href = routes.estimateCreate(id);
        }
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
            const { order } = data;
            // const { order, orders: {
            //     arrival,
            //     arrival_short,
            //     comeback_date,
            //     comeback_time,
            //     departure,
            //     departure_short,
            //     departure_date,
            //     departure_time,
            //     convenience,
            //     driver_schedule,
            //     is_driver,
            //     purpose,
            //     reference,
            //     stopover,
            //     total_number,
            //     way
            // } } = data
            // console.log("ORDER", orders);
            
            
            return (
                <div onBlur={(e) => { onBlur(e, idx) }} onFocus={(e) => { onFocus(e, idx) }} class="bothLinkBox" tabIndex="0" key={data.order}>
                    <div class="orderContainerPlusBtn">

                        <OrderInfo data={data.orders} idx={idx}/>
                    </div>
                    <a href="estimateCreate.html">
                        <button onMouseDown={() => {onClickCreate(order)}} class="createEstimate displayNone">견적 등록하기</button>
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
            <EstimateForm Content={Content} />
        </>
    )
}