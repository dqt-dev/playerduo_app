import axios from 'axios';
import React, { useState } from 'react';
import '../styles/chat.css';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ChatBoxComponent from './ChatBoxComponent';
import MessageService from '../services/MessageService';
import { BASE_URL } from '../common/SystemConstant';
import { handleConvertDate } from '../common/ultil';

function ChatList({ isShowChat, setIsShowChat }) {
  const userInfo = {
    avatarUrl: '',
    status: false,
    id: ''
  };

  const [listUserChat, setListUserChat] = useState()

  const [userChatInfo, setUserChatInfo] = useState(userInfo);

  const [userId, setUserId] = useState();

  const handleGetUserWithChat = (userId) => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      return;
    }
    axios.get("https://localhost:7207/api/Users/" + userId, {
    })
      .then(response => {
        setUserChatInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userId) {
      handleGetUserWithChat(userId);
    }
    if(isShowChat) getListChat();
    
  }, [isShowChat, userId]);


  const getListChat = () => {
    MessageService.getMyChats()
      .then(response => {
        setListUserChat(response.data);
      })
      .catch(error => {
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  return (
    <>
      {isShowChat ?
        <div className="position-fixed top-0 end-0 box-chat" >
          <div>
            <div style={{ width: "420px", height: "960px" }}>
              <div className='d-flex justify-content-between mt-2'>
                <div className='text-24px fw-bold ms-2'>
                  Tin nhắn
                </div>
                <div onClick={() => setIsShowChat(false)} className='text-24px me-2 cursor-pointer button-close'>
                  X
                </div>
              </div>
              {
                listUserChat && listUserChat.map((item, index) => {
                  return (
                    <div onClick={() => setUserId(item.userId)} key={index} className="d-flex items-center justify-content-between pb-2 pt-1 chat-element " data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                      <div className="text-18px font-bold text-#333333 ms-3">
                        <div className="d-flex position-relative">
                          <img className="w-44px h-44px rounded-50 mt-1" src={BASE_URL + item.avatarUrl} style={{ height: "44px", width: "44px" }} />
                          {item.status ? <div className="div-online-2" style={{ bottom: '0' , left: '8%', background: "#31a24c", width: "13px", height: "13px", borderRadius: "50%" }}></div> :
                                    <div className="div-online-2" style={{bottom: '0' , left: '8%', background: "red", width: "13px", height: "13px", borderRadius: "50%" }}></div>}
                          <div className='flex ms-2'>
                            <div className="d-flex items-center justify-content-between" style={{ width: "340px" }}>
                              <div className="text-18px cursor-pointer">{item.nickName}</div>
                              <div className=' flex justify-content-end text-12px cursor-pointer'>
                                {handleConvertDate(item.lastestTime)}
                              </div>
                            </div>
                            <div className="mt-5px text-16px text-#999999 text-message cursor-pointer">{item.lastestMessage}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }

            </div>

          </div>
        </div> : <></>}
      <ChatBoxComponent userChatInfo={userChatInfo} getListChat={getListChat} />
    </>

  );
}

export default ChatList;