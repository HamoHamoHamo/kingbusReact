import React, { useEffect, useState, useRef } from 'react';
import { Api, IP } from '../../utils/Api';
import { useParams } from 'react-router-dom';
import routes from '../../utils/Routes';
import { useAppContext } from "../../Store";

export default function Chat() {
    const { id } = useParams();
    const { store: { refreshToken } } = useAppContext();
    const [name, setName] = useState('');
    const [msg, setMsg] = useState([]);
    const [ws, setWs] = useState('');
    const [children, setChildren] = useState(0);
    const [roomName, setRoomName] = useState('');
    const inputRef = useRef();
    const chatBoxRef = useRef();

    let prevDate = 0;
    useEffect(async () => {
        try{
            const response = await Api.get(routes.nameCheck);
            console.log("RESPONSE", response);
            setName(response.data.name);

        }
        catch(err){
            console.log("NAME ERR", err.response);
        }
        try{
            const chatData = await Api.get(`${IP}/chat/room/${id}`);
            console.log("CHAT", chatData)
            setMsg(chatData.data.messages);
            setRoomName(chatData.data.roomname);

            const chatSocket = new WebSocket('ws://' + 'localhost:8081' + '/ws/' + chatData.data.roomname + '/');
            setWs(chatSocket);

            chatSocket.onmessage = function (e) {
                console.log('onmessage', ws.onmessage);
        
                const data = JSON.parse(e.data);
                console.log("onmessage", data);
                if (data.message) {
                    setMsg((prev) => [
                        ...prev,
                        {
                            username: data.user,
                            content: data.message,
                            date_added: data.date
                        }
                    ])
                    // document
                    //     .querySelector('#chat-messages')
                    //     .innerHTML += ('<b>' + data.username + '</b>: ' + data.message + '<br>');
                }
        
                // scrollToBottom();
        
            };
            scrollToBottom();
        }
        catch(err){
            console.log("ERR", err);
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
        console.log("BOX CHANGES")
        // if (chatBoxRef.current){
        //     const cnt = chatBoxRef.current.childElementCount
        //     console.log("FEFSEFLFJLEF", cnt);
        //     setChildren(cnt);
        // }
    },[chatBoxRef.current && chatBoxRef.current.childElementCount])

    function scrollToBottom() {
        let objDiv = window.document.getElementById("chat-messages");
        if(objDiv){
            console.log("OBBB", objDiv);
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }

    // const roomName = 'dfa78ef0-d228-4ac5-be18-b8a7845035f2';
    const userName = name;

    // const chatSocket = new WebSocket('ws://' + 'localhost:8081' + '/ws/' + roomName + '/');

    // const chatSocket = io('ws://' + 'localhost:8081' + '/ws/' + roomName + '/', {
    //     auth: {
    //         token: `Bearer ${token}`,
    //     },
    // });
    console.log("TEST", roomName);
    // const chatSocket = new WebSocket('ws://' + 'localhost:8081' + '/ws/' + roomName + '/');
    // {% comment %} const chatSocket = new WebSocket('ws://' + window.location.host + '/ws/' + roomName + '/'); {% endcomment %} */}
    if(ws){
        ws.onclose = function (e) {
            console.log('The socket close unexpectedly');
        }
    }
    

    function onClickSubmit(e) {
        const message = inputRef.current.value;
        console.log("message", message);
        if(message){
            let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
            let time = {
                year: today.getFullYear(),  //현재 년도
                month: (today.getMonth() + 1)<10 ? `0${today.getMonth()+1}` : today.getMonth()+1, // 현재 월
                date: today.getDate()<10 ? `0${today.getDate()}` : today.getDate(), // 현제 날짜
                hours: today.getHours()<10 ? `0${today.getHours()}` : today.getHours(), //현재 시간
                minutes: today.getMinutes()<10 ? `0${today.getMinutes()}` : today.getMinutes(), //현재 분
            };
            const date = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}`;
            
            ws.send(JSON.stringify({ 'message': message, 'user': userName, 'room': roomName, 'date': date}));
            inputRef.current.value = '';
        }
        



        // const cnt = chatBoxRef.current.childElementCount
        // setChildren(cnt);
    };

    function enterPress(e) {
        if (e.key === 'Enter') {
            onClickSubmit(e);
        }
    }
    
    return (
        <>

            <section class="section" style={{ marginTop: '10rem' }}>
                <div class="container">
                    <div class="columns is-multiline">
                        <div class="column is-6 is-offset-3 mb-6">
                            <section class="hero is-primary">
                                <div class="hero-body">
                                    <p class="title">Chatty</p>
                                    <p class="subtitle">A simple chat built with Django, Channels and Redis</p>
                                </div>
                            </section>
                        </div>
                        <div class="column is-6 is-offset-3">
                            <div class="box">
                                <div ref={chatBoxRef} id="chat-messages" style={{ maxHeight: '300px', overflowY: "scroll" }}>
                                    {msg && msg.map((data, idx) => {
                                        // console.log("AAAA", data);
                                        const date = data.date_added.slice(0,10);
                                        const time = data.date_added.slice(11,16);
                                        let visibleDate = false;
                                        if(date !== prevDate){
                                            visibleDate = true;
                                            prevDate = date;
                                        }
                                        return(
                                            <>
                                                {visibleDate && 
                                                <div style={{fontSize: "15px", margin: "10px"}}>{date}</div>
                                                }
                                                <div style={{fontSize: "20px"}} key={idx}>{data.username}: {data.content}<span style={{fontSize: "10px", marginLeft: "10px"}}>{time}</span></div>
                                            
                                            </>
                                        )
                                        
                                    })}
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input ref={inputRef} class="input" type="text" placeholder="Message" id="chat-message-input" onKeyPress={enterPress} />
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button style={{ color: "black", fontSize: "20px" }} id="chat-message-submit" onClick={onClickSubmit}>submit</button>
                                </div>
                            </div>
                            <small class="has-text-grey-light">Your username:
                            </small>

                        </div>
                    </div>
                </div>
            </section>




        </>
    )
}