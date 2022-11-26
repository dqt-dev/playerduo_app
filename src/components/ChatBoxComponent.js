import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import { MdArrowBackIos } from 'react-icons/md';
import { TbSend } from 'react-icons/tb';
import TextareaAutosize from 'react-textarea-autosize';

import { useNavigate } from 'react-router-dom';

import '../styles/chatbox.css';
import { BASE_URL } from '../common/SystemConstant';

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import MessageService from '../services/MessageService';
import { useRef } from 'react';

function ChatBoxComponent({ userCurrent, userChatInfo, getListChat }) {

    const [messages, setMessages] = useState([]);

    const [messageContent, setMessageContent] = useState("");

    const currentUserId = JSON.parse(localStorage.getItem('USER_INFO')) ? JSON.parse(localStorage.getItem('USER_INFO')).id : 0;

    const userTypingInit = {
        id: 0,
        isTyping: false
    }

    const [userTyping, setUserTyping] = useState(userTypingInit);

    const [connection, setConnection] = useState();

    const messageStateRef = useRef();

    messageStateRef.current = messages;

    const handleGetChat = (userChatId) => {

        MessageService.getMessagesWithUserId(userChatId)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                // toast.error(error.response.data, {
                //     position: toast.POSITION.TOP_RIGHT
                // });
            });
    };

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleSendClick();
        }
    };


    const connectToChatHub = async () => {
        console.log("connect to chat hub")
        console.log('current user id', currentUserId);

        if (connection) {
            console.log("connection exist")
            return;
        }

        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`${BASE_URL}/chat`)
                .configureLogging(LogLevel.Information)
                .build();

            // method to receive message from our server
            connection.on("ShakeHandMessage", (message) => {
                console.log('Shake hand message:', message);
            });
            // method to receive message from our server
            connection.on("ReceiveMessage", (message) => {
                console.log('message received:', message);
                //console.log(`current: ${this.state.current_user.id}, sender: ${message.senderId}`)
                //console.log('current != sender ?', this.state.current_user.id !== message.senderId)          
                // update messages list logic

                if (message.senderId == userChatInfo.id || message.senderId == currentUserId) {
                    let messages = messageStateRef.current;
                    console.log(' messages 11111:', messages)
                    setMessages([...messages, message]);
                    console.log('update list messages')
                }
            });

            connection.on("ChangeTypingState", (message) => {
                console.log('typing received:', message);

                setUserTyping({
                    id: message.senderId,
                    isTyping: message.isTyping
                })
            });

            await connection.start();
            //console.log('started connection')
            await connection.invoke("ConnectUserToChatHub", currentUserId.toString());
            //console.log('invoked connect')
            setConnection(connection);

        } catch (e) {
            console.log(e);
        }
    }

    // const [userChatId, setUserChatId] = useState(userChatInfo?.id);

    const sendMessage = async (messageContent) => {
        const messageDto = {
            senderId: currentUserId.toString(),
            receiverId: userChatInfo.id.toString(),
            content: messageContent,
            imageUrl: ''
        }
        //console.log('message dto to send', messageDto);
        try {
            console.log('send message DTO: ', messageDto)
            // invoke SendMessage method in the server
            await connection.invoke("SendMessage", messageDto);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSendClick = async () => {
        // send message
        // let image_url = '';
        // const image = this.state.image;
        if (messageContent.trim().length > 0) {
            await sendMessage(messageContent);
            setMessageContent("")
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (userChatInfo.id != '') {
                await connectToChatHub();
                handleGetChat(userChatInfo.id);
            }
        }
        fetchData();

    }, [userChatInfo.id]);

    return (
        <div className="offcanvas offcanvas-end d-flex flex-column" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="">
                <div className='d-flex'>
                    <div type="button" className="btn btn-back text-reset mt-1" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getListChat}><MdArrowBackIos size={20} /></div>
                    <div className='d-flex'>
                        <div className='position-relative'>
                            <img className="rounded-50 mt-1" src={BASE_URL + userChatInfo.avatarUrl} style={{ height: "40px" }} />
                            {userChatInfo.status ? <div className="position-absolute bottom-0 end-0" style={{ background: "green", width: "10px", height: "10px", borderRadius: "50%" }}></div> :
                                <div className="position-absolute bottom-0 end-0" style={{ background: "red", width: "10px", height: "10px", borderRadius: "50%" }}></div>}
                        </div>
                        <h5 className="mt-2 ms-2" id="offcanvasExampleLabel">{userChatInfo?.nickName}</h5>
                    </div>
                </div>
            </div>
            <hr className='text-gray mt-3 mb-1' style={{ width: "96%", marginLeft: "2%" }} />
            <div className=" pt-3 chat-box-content d-flex flex-column-reverse">
                {messages && messages.map((chat, index) => {
                    return (
                        <div key={index}>
                            {chat.senderId == userCurrent?.id ?
                                <div className='d-flex justify-content-end me-2' >
                                    <div className='pt-2 pb-2 ps-3 pe-3 mb-3 content-chat ' style={{ backgroundColor: '#F4F4F4', borderRadius: "16px" }}>
                                        {chat.content}
                                    </div>
                                </div> :
                                <div className='d-flex justify-content-start ms-2' >
                                    <div className='d-flex'>
                                        <img className="rounded-50 mt-1" src={BASE_URL + userChatInfo.avatarUrl} style={{ height: "36px" }} />
                                        <div className='pt-2 pb-1 ps-3 pe-3 ms-1 mb-3' style={{ backgroundColor: '#F4F4F4', borderRadius: "16px" }}>
                                            {chat.content}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <hr className='text-gray' style={{ width: "96%", marginLeft: "2%" }} />
            <div className='align-self-start ps-3'>
                <div className='d-flex'>
                    <img className="rounded-50 me-2 align-self-center" src={BASE_URL + userCurrent?.avatarUrl} style={{ height: "36px" }} />
                    <div className="ps-2" >
                        <TextareaAutosize placeholder="Aa"  onKeyDown={handleKeyDown} maxRows='3' style={{ width: "270px" }} className="ps-2 pe-2 border rounded" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                    </div>
                    <TbSend onClick={handleSendClick} size={26} className='btn-send align-self-end mb-2 ms-3' />
                </div>
            </div>
        </div>
    )
}

export default ChatBoxComponent