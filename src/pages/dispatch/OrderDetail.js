import React, { useEffect, useState, useRef } from 'react';
import { DispatchForm } from './Component';
import { Api } from '../../utils/Api';
import { useParams } from "react-router";
import { OrderEstimateInfo } from './Component';
import routes from '../../utils/Routes';

export default function OrderDetail() {
    const { id } = useParams();
    const [datas, setDatas] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const response = await Api.get(`estimate/list/o/${id}`);
                console.log("RES", response);
                const { data } = response;
                setDatas(data);
                // setDatas(() => ({
                //     count,
                //     results
                // }));
                // content({ count, results });
            }
            catch (err) {
                console.log("err",);
            }
        }
        getData();
    }, [])

    function Content({ filter }) {
        let cnt = -1;

        const onClickCreate = async (order, estimate) => {
            console.log("order, estimate",order, estimate);
            const data = {
                order,
                selected_estimate: estimate
            }
            try{
                const result = await Api.post('dispatch', data);
                window.alert("견적 선택완료");

            }
            catch(err){
                console.log("ERR", err);
            }
            
        }
        
        const onBlur = (e, idx) => {
            
            const container = e.target
            const button = container.querySelector('.createEstimate');
            container.classList.remove('CreateBtnfocusIn')
            container.classList.add('CreateBtnfocusOut')
            button.classList.add('displayNone');            
        }

        const onFocus = (e, idx) => {
            console.log("EEEE", e.target);
            const container = e.target
            const button = container.querySelector('.createEstimate');
            container.classList.remove('CreateBtnfocusOut')
            container.classList.add('CreateBtnfocusIn')
            button.classList.remove('displayNone');
        }

        const dataContent = datas && datas.map((data, idx) => {
            console.log("data", data);
            const order = data;

            const startDate = new Date(filter.startDate);
            const finishDate = new Date(filter.finishDate);
            const departureDate = new Date(order.departure_date);
            
            
            if(filter.departure && !order.departure.includes(filter.departure)){
                console.log("1", order.departure.includes(filter.departure))
                return <></>
            }
            else if(filter.arrival && !order.arrival.includes(filter.arrival)){
                console.log("2")
                return <></>
            }
            else if(filter.startDate && !(departureDate >= startDate)){
                console.log("3")
                return <></>
            }
            else if(filter.finishDate && !(departureDate <= finishDate)){
                console.log("4")
                return <></>
            }
            else if(filter.total_number && !order.total_number){
                console.log("5")
                return <></>
            }
            else if(filter.total_number+10 && !order.total_number){
                console.log("6")
                return <></>
            }
            else if(filter.total_number && !(order.total_number >= filter.total_number)){
                console.log("5")
                return <></>
            }
            else if(filter.total_number && !(order.total_number < parseInt(filter.total_number) + 10)){
                console.log("6")
                return <></>
            }
            
            
            else {
                cnt = cnt+1;
                console.log("CCCNT", cnt);
                return (
                    <div onBlur={(e) => { onBlur(e, idx) }} onFocus={(e) => { onFocus(e, idx) }} class="bothLinkBox" tabIndex="0" key={idx}>
                        <div class="orderContainerPlusBtn">
    
                            <OrderEstimateInfo data={data} idx={cnt}/>
                        </div>
                        {data.dispatch_status !== 4 &&
                            <button onMouseDown={() => {onClickCreate(data.order.id, data.id)}} class="createEstimate displayNone">견적 선택하기</button>
                        }
                    </div>
                )
            }
        })
        return (
            <div class="mainContentsArea">
                <div class="orderStatus">
                    총 <span>건의 주문</span> 신청이 있습니다.
                </div>
                {dataContent}

            </div>
        )
    }
    return (
        <>
            <DispatchForm Content={Content} />



        </>
    )
}