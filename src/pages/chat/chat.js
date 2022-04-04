import React, { useEffect, useState, useRef } from 'react';
import { Api } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import routes from '../../utils/Routes';

export default function Chat() {
    // function scrollToBottom() {
    //     let objDiv = document.getElementById("chat-messages");
    //     console.log("OBBB", objDiv);
    //     objDiv.scrollTop = objDiv.scrollHeight;
    // }

    // scrollToBottom();

    // const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
    // const userName = JSON.parse(document.getElementById('json-username').textContent);
    
    // const roomName = 'testroom6';
    const roomName = 'dfa78ef0-d228-4ac5-be18-b8a7845035f2';
    const userName = 'react';

    const chatSocket = new WebSocket('ws://' + 'kingbus.co.kr:8000' + '/ws/' + roomName + '/');
    // const chatSocket = new WebSocket('ws://' + 'localhost:8001' + '/ws/' + roomName + '/');
// {% comment %} const chatSocket = new WebSocket('ws://' + window.location.host + '/ws/' + roomName + '/'); {% endcomment %} */}

    chatSocket.onmessage = function (e) {
        console.log('onmessage');

        const data = JSON.parse(e.data);

        if (data.message) {
            document
                .querySelector('#chat-messages')
                .innerHTML += ('<b>' + data.username + '</b>: ' + data.message + '<br>');
        } else {
            alert('The message is empty!');
        }

        // scrollToBottom();

    };

    chatSocket.onclose = function (e) {
        console.log('The socket close unexpectedly');
    }
    
    function onClickSubmit (e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;

            chatSocket.send(JSON.stringify({ 'message': message, 'username': userName, 'room': roomName }));

            messageInputDom.value = '';
        };

    function enterPress() {
        if (window.event.keyCode == 13) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;

            chatSocket.send(JSON.stringify({ 'message': message, 'username': userName, 'room': roomName }));

            messageInputDom.value = '';
        }
    }

    return (
        <>

            <section class="section" style={{marginTop: '10rem'}}>
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
                                <div id="chat-messages" style={{maxHeight: '300px', overflowY: "scroll"}}>
                                    <div>testsetastaetasttttttttttttessst</div>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input" type="text" placeholder="Message" id="chat-message-input" onkeyup={enterPress} />
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <a class="button is-info" style={{color: "black"}} type="submit" id="chat-message-submit" onClick={onClickSubmit}>Submit</a>
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