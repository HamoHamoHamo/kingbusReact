import React, { useEffect, useState } from 'react';
import { Api } from '../../utils/Api';
import { useParams, useNavigate } from "react-router";
import routes from '../../utils/Routes';

export default function OrderEstimateDetail() {
    const { id } = useParams();
    const [datas, setDatas] = useState();
    let navigate = useNavigate();

    useEffect(async () => {
        try{
            const result = await Api.get(`/estimate/${id}`);
            console.log("RES", result);
            setDatas(result.data);
        }
        catch(err){
            console.log("ERR", err.response);
        }
        
        
    }, [])
    
    const onClickSelect = async () => {
        try{
            const result = await Api.post('/dispatch', {order: datas.order.id, selected_estimate: datas.id})
            console.log("RESSSS", result);

        }
        catch(err){
            console.log("ERR", err.response);
        }
    }

    const onClickChat = async () => {
        let roomId = '';
        const { driverorcompany: id } = datas;
        try{
            const response = await Api.post('/chat', {driverorcompany: id});
            console.log("RES", response);
            roomId = response.data.room_id;

        }
        catch(err){
            console.log("ERR", err.response);
            if(err.response.status === 301){
                roomId = err.response.data.room_id;
                console.log("RRR", roomId);
            }
        }
        navigate(routes.chat(roomId));
    }

    return(
        <>
            <div style={{marginTop: '10rem'}}>
                <button onClick={onClickSelect}>post Dispatch</button>
                <button onClick={onClickChat}>Chat</button>
            </div>
        </>
    )
}