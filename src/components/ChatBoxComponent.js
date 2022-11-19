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

function ChatBoxComponent({ userCurrent, userChatInfo, getChat }) {

    const navigate = useNavigate();

    const [userChatId, setUserChatId] = useState(userChatInfo.id);

    return (
        <div class="offcanvas offcanvas-end d-flex flex-column" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="">
                <div className='d-flex'>
                    <div type="button" class="btn btn-back text-reset mt-1" data-bs-dismiss="offcanvas" aria-label="Close"><MdArrowBackIos size={20} /></div>
                    <div className='d-flex'>
                        <div className='position-relative'>
                            <img className="rounded-50 mt-1" src={BASE_URL + userChatInfo.avatarUrl} style={{ height: "40px" }} />
                            {userChatInfo.status ? <div className="position-absolute bottom-0 end-0" style={{ background: "green", width: "10px", height: "10px", borderRadius: "50%" }}></div> :
                                <div className="position-absolute bottom-0 end-0" style={{ background: "red", width: "10px", height: "10px", borderRadius: "50%" }}></div>}
                        </div>
                        <h5 class="mt-2 ms-2" id="offcanvasExampleLabel">{userChatInfo.nickName}</h5>
                    </div>
                </div>
            </div>
            <hr className='text-gray mt-3 mb-1' style={{ width: "96%", marginLeft: "2%" }} />
            <div class=" pt-3 chat-box-content">
                {getChat && getChat.map((chat, index) => {
                    return (
                        <div key={index}>
                            {chat.senderId == userCurrent.id ?
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
                    <img className="rounded-50 me-2 align-self-center" src={BASE_URL + userCurrent.avatarUrl} style={{ height: "36px" }} />
                    <div className="ps-2" >
                        <TextareaAutosize maxRows='3' style={{ width: "270px" }} className="ps-2 pe-2" />
                    </div>
                    <TbSend size={26} className='btn-send align-self-end mb-2 ms-3' />
                </div>
            </div>
        </div>
    )
}

export default ChatBoxComponent