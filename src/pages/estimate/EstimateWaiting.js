import React, { useEffect, useState, useRef } from 'react';
import { EstimateForm } from './Component';
import { Api } from '../../utils/Api';
import { useNavigate  } from 'react-router-dom';
import { OrderEstimateInfo } from './Component';
import routes from '../../utils/Routes';

export default function EstimateWaiting({ status }) {
    const [datas, setDatas] = useState();
    const [refresh, setRefresh] = useState(0);
    const [cnt, setCnt] = useState(-1);
    useEffect(() => {
        async function getData() {
            try {
                const response = await Api.get(`estimate/list/u`); // url 수정필요
                console.log('test');
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
    }, [refresh]);


    function Content({ filter }) {
        console.log("TEST", filter);
        // const dataContent = 
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

        const onClickCreate = async (id) => {
            // navigate(routes.estimateCreate(id));
            if(window.confirm()){
                console.log("YES", id);
                try{
                    const response = await Api.delete(routes.estimateDetail(id))
                    alert('Delete Success');
                    console.log("RES", response);
                    setRefresh(1);
                }
                catch(err){
                    alert("ERR");
                    console.log("ERR", err.response);
                }
                
            }
            // window.location.href = routes..estimateCreate(id);
        }
        // idx 인덱스 값 받아와서 queryselector에서 인덱스에 넣어줘야 됨
        const dataContent = datas && datas.map((data, idx) => {
            const { order } = data;
            const startDate = new Date(filter.startDate);
            const finishDate = new Date(filter.finishDate);
            const departureDate = new Date(order.departure_date);
            
            console.log("status", status, data.dispatch_status);
            if(status !== parseInt(data.dispatch_status)){
                console.log("000");
                return <></>
            }
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
            
            

            // if(!order.departure.includes(filter.departure) || 
            //     !order.arrival.includes(filter.arrival) ||
            //     !departureDate >= startDate ||
            //     !departureDate <= finishDate ||
            //     !order.total_number >= filter.total_number ||
            //     !order.total_number < filter.total_number+10){
            //     console.log("WWWw");
            //     return(
            //         <></>
            //     )
            // }
            else {
                
                
                return (
                    <div onBlur={(e) => { onBlur(e, idx) }} onFocus={(e) => { onFocus(e, idx) }} class="bothLinkBox" tabIndex="0" key={idx}>
                        <div class="orderContainerPlusBtn">
    
                            <OrderEstimateInfo data={data} idx={idx}/>
                        </div>
                        {data.dispatch_status !== 4 &&
                            <button onMouseDown={() => {onClickCreate(data.id)}} class="createEstimate displayNone">견적 취소하기</button>
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
            <EstimateForm Content={Content} />
        </>
    )
}