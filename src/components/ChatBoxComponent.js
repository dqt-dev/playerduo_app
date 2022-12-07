import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import { MdArrowBackIos } from 'react-icons/md';
import { TbSend } from 'react-icons/tb';
import TextareaAutosize from 'react-textarea-autosize';

import '../styles/chatbox.css';
import { BASE_URL } from '../common/SystemConstant';

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import MessageService from '../services/MessageService';
import { useRef } from 'react';
import Loading from './Loading';
import UserService from '../services/UserSerice';
import { useSelector } from 'react-redux';

function ChatBoxComponent({ userChatInfo, getListChat }) {
    const currentCurrent = useSelector(state => state.userInfoReducer.userInfo);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const [messages, setMessages] = useState([]);

    const [messageContent, setMessageContent] = useState("");

    const [connection, setConnection] = useState();

    const messageStateRef = useRef();

    messageStateRef.current = messages;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    // get messages between 2 user
    const handleGetChat = (userChatId) => {
        setLoaded(true);
        MessageService.getMessagesWithUserId(userChatId)
            .then(response => {
                setLoaded(false);
                setMessages(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };


    const connectToChatHub = async () => {

        if (connection) {
            return;
        }

        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`${BASE_URL}/chat`)
                .configureLogging(LogLevel.Information)
                .build();

            // method to receive message from our server
            connection.on("ReceiveMessage", (message) => {

                if (message.senderId == userChatInfo?.id || message.senderId == currentCurrent?.id) {
                    let messages = messageStateRef.current;
                    setMessages([...messages, message]);
                }
            });

            await connection.start();
            await connection.invoke("ConnectUserToChatHub", currentCurrent?.id.toString());

            setConnection(connection);

        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (messageContent) => {
        const messageDto = {
            senderId: currentCurrent?.id.toString(),
            receiverId: userChatInfo?.id.toString(),
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
        if (messageContent.trim().length > 0) {
            await sendMessage(messageContent);
            setMessageContent("")
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (userChatInfo?.id != '') {
                await connectToChatHub();
                handleGetChat(userChatInfo?.id);
            }
        }
        fetchData();

    }, [userChatInfo?.id]);


    useEffect(() => {
        getListChat()
    }, [messages]);

    return (
        <div className="offcanvas offcanvas-end d-flex flex-column" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <Loading loading={loaded} />
            <div className="">
                <div className='d-flex'>
                    <div type="button" className="btn btn-back text-reset mt-1" data-bs-dismiss="offcanvas" aria-label="Close" ><MdArrowBackIos size={20} /></div>
                    <div className='d-flex'>
                        <div className='position-relative'>
                            <img className="rounded-50 mt-1" src={BASE_URL + userChatInfo?.avatarUrl} style={{ height: "40px", width: "40px" }} />
                            {userChatInfo?.status ? <div className="div-online-2" style={{ left : '30px', bottom: '-1px', background: "green", width: "12px", height: "12px", borderRadius: "50%" }}></div> :
                                <div className="div-online-2 bottom-0 end-0" style={{ left : '30px', bottom: '-1px', background: "red", width: "10px", height: "10px", borderRadius: "50%" }}></div>}
                        </div>
                        <h5 className="mt-2 ms-2" id="offcanvasExampleLabel">{userChatInfo?.nickName}</h5>
                    </div>
                </div>
            </div>
            <hr className='text-gray mt-3 mb-1' style={{ width: "96%", marginLeft: "2%" }} />
            <div>
                <div className=" pt-3 chat-box-content d-flex flex-column" >
                    {messages && messages.map((chat, index) => {
                        return (
                            <div key={index} >
                                {chat.senderId == currentCurrent?.id ?
                                    <div className='d-flex justify-content-end me-2' >
                                        <div className='pt-2 pb-2 ps-3 pe-3 mb-3 content-chat ' style={{ backgroundColor: '#F4F4F4', borderRadius: "16px" }}>
                                            {chat.content}
                                            <div ref={messagesEndRef} />
                                        </div>
                                    </div> :
                                    <div className='d-flex justify-content-start ms-2' >
                                        <div className='d-flex'>
                                            <img className="rounded-50 mt-1" src={BASE_URL + userChatInfo?.avatarUrl} style={{ height: "36px", width: "36px" }} />
                                            <div className='pt-2 pb-1 ps-3 pe-3 ms-1 mb-3 content-chat' style={{ backgroundColor: '#F4F4F4', borderRadius: "16px" }}>
                                                {chat.content}
                                                <div ref={messagesEndRef} />
                                            </div>

                                        </div>

                                    </div>

                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <hr className='text-gray mt-0' style={{ width: "96%", marginLeft: "2%" }} />
            <div className='align-self-start ps-3'>
                <div className='d-flex'>
                    <img className="rounded-50 me-2 align-self-center" src={BASE_URL + currentCurrent?.avatarUrl} style={{ height: "36px", width: "36px" }} />
                    <div className="ps-2" >
                        <TextareaAutosize placeholder="Aa" onKeyDown={handleKeyDown} maxRows='3' style={{ width: "270px" }} className="ps-2 pe-2 border rounded" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                    </div>
                    <TbSend onClick={handleSendClick} size={26} className='btn-send align-self-end mb-2 ms-3' />
                </div>
            </div>
        </div>
    )
}

export default ChatBoxComponent