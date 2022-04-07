import React, { useEffect, useState, useRef } from 'react';
import { DispatchForm, OrderInfo } from './Component';
import { Api } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import routes from '../../utils/Routes';
import { useAppContext } from "../../Store";

export default function OrderList() {
    const [datas, setDatas] = useState();
    const { store: { isAuthenticated, name } } = useAppContext();
    let navigate = useNavigate();
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
            window.location.href = routes.orderDetailList(id);
        }
        
        const onClickBox = (estOrOrder, selected) => {
            console.log("ID", estOrOrder);
            if(selected){
                return navigate(routes.orderEstimateDetail(estOrOrder));
            }
            console.log("NO", selected);
            return navigate(routes.orderDetailList(estOrOrder))
        }

        const dataContent = datas && datas.map((data, idx) => {
            console.log("data", data);
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
                let selected = false;
                if(data.dispatch_status === '2'){
                    selected = true
                }
                const estimateOrOderId = selected ? data.selected_estimate : order.id;

                return (
                    <div onClick={() => {onClickBox(estimateOrOderId, selected)}}>
                        <OrderInfo data={order} idx={cnt}/>
                    </div>
                        
                    
                )
            }
        })
        return (
            <div class="mainContentsArea">
                
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