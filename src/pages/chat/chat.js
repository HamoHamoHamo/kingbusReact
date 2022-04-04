import React, { useEffect, useState, useRef } from 'react';
import { Api, IP } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import routes from '../../utils/Routes';
import { useAppContext } from "../../Store";
import axios from 'axios';
import { io } from "socket.io-client";

export default function Chat() {
    const { store: { refreshToken } } = useAppContext();
    const [name, setName] = useState('');
    const [msg, setMsg] = useState([]);
    const [ws, setWs] = useState('');
    const [input, setInput] = useState('');
    const [children, setChildren] = useState(0);
    const inputRef = useRef();
    const chatBoxRef = useRef();

    useEffect(async () => {
        const response = await Api.get(`${IP}/userinfo/name`);
        console.log("RESPONSE", response);
        setName(response.data.name);

        const chatData = await Api.get(`${IP}/chat/room/6`);
        console.log("CHAT", chatData)
        setMsg(chatData.data);
        scrollToBottom();
        const chatSocket = new WebSocket('ws://' + 'localhost:8081' + '/ws/' + roomName + '/');
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
                        content: data.message
                    }
                ])
                // document
                //     .querySelector('#chat-messages')
                //     .innerHTML += ('<b>' + data.username + '</b>: ' + data.message + '<br>');
            }
    
            // scrollToBottom();
    
        };
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


    // const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
    // const userName = JSON.parse(document.getElementById('json-username').textContent);

    // const roomName = 'testroom6';
    const roomName = 'dfa78ef0-d228-4ac5-be18-b8a7845035f2';
    const userName = name;

    // const chatSocket = new WebSocket('ws://' + 'localhost:8081' + '/ws/' + roomName + '/');

    // const chatSocket = io('ws://' + 'localhost:8081' + '/ws/' + roomName + '/', {
    //     auth: {
    //         token: `Bearer ${token}`,
    //     },
    // });
    console.log("TEST");
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
        ws.send(JSON.stringify({ 'message': message, 'user': userName, 'room': roomName }));
        inputRef.current.value = '';

        const cnt = chatBoxRef.current.childElementCount
        console.log("FEFSEFLFJLEF", cnt);
        setChildren(cnt);
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
                                        
                                        return(
                                            <div style={{fontSize: "20px"}} key={idx}>{data.username}: {data.content}   //</div>
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