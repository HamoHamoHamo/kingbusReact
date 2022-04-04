import React, { useEffect, useState, useRef } from 'react';
import { DispatchForm } from './Component';
import { Api } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { OrderInfo } from './Component';
import routes from '../../utils/Routes';

export default function OrderList() {
    const [datas, setDatas] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const response = await Api.get('order/list/u');
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

        const onClickCreate = (id) => {
            window.location.href = routes.orderDetail(id);
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
                return (
                    <div onBlur={(e) => { onBlur(e, idx) }} onFocus={(e) => { onFocus(e, idx) }} class="bothLinkBox" tabIndex="0" key={data.order}>
                        <div class="orderContainerPlusBtn">

                            <OrderInfo data={order} idx={cnt}/>
                        </div>
                        
                        <button onMouseDown={() => {onClickCreate(data.id)}} class="createEstimate displayNone">견적 선택하기</button>
                        
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