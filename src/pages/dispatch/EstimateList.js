import React, { useEffect, useState, useRef } from 'react';
import { DispatchForm } from './Component';
import { Api } from '../../utils/Api';
import { useNavigate  } from 'react-router-dom';
import { OrderInfo } from './Component';
import routes from '../../utils/Routes';

export default function EstimateList() {
    
    const [datas, setDatas] = useState({});
    useEffect(() => {
        async function getData() {
            try {
                const response = await Api.get('order/list');
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


    function Content({ filter }) {
        let cnt = -1;
        const navigate = useNavigate();
        //const infoRef = useRef();
        
        const onClickCreate = (id) => {
            console.log("CLICDKLJLSC", id)
            // navigate(routes.estimateCreate(id));
            window.location.href = routes.estimateCreate(id);
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

        const dataContent = datas.results && datas.results.map((data, idx) => {
            const { order } = data;
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
                        
                        <button onMouseDown={() => {onClickCreate(order.id)}} class="createEstimate displayNone">견적 등록하기</button>
                        
                    </div>
                )
            }
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
            <DispatchForm Content={Content} />
        </>
    )
}