import axios from 'axios';
import React, { useState } from 'react';
import '../styles/chat.css';


import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ChatBoxComponent from './ChatBoxComponent';
import { useSelector } from 'react-redux';
import MessageService from '../services/MessageService';
import { BASE_URL } from '../common/SystemConstant';
import { dateTimeToString } from '../common/ultil';

function Chat({ isShowChat, setIsShowChat }) {
  const userInfo = {
    avatarUrl: '',
    status: false,
    id: ''
  };

  const [listUserChat, setListUserChat] = useState();

  const userCurrent = useSelector(state => state.userInfoReducer.userInfo);

  const [userChatInfo, setUserChatInfo] = useState(userInfo);

  const [userId, setUserId] = useState();

  const handleGetUserInfoById = (userId) => {
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
      // handleGetUserCurrent();
      handleGetUserInfoById(userId);
    }
    getListChat();
  }, [isShowChat, userId]);


  const getListChat = () => {
    MessageService.getMyChats()
      .then(response => {
        setListUserChat(response.data);
        console.log(response.data);
      })
      .catch(error => {
        // console.log(error.response.data)
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
                  Chat
                </div>
                <div onClick={() => setIsShowChat(false)} className='text-24px me-2 user-select-none button-close'>
                  X
                </div>
              </div>
              {
                listUserChat && listUserChat.map((item, index) => {
                  return (
                    <div onClick={() => setUserId(item.userId)} key={index} class="d-flex items-center justify-content-between pb-2 pt-1 chat-element " data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                      <div class="text-18px font-bold text-#333333 ms-3">
                        <div className="d-flex">
                          <img class="w-44px h-44px rounded-50 mt-1" src={BASE_URL + item.avatarUrl} style={{ height: "44px" }} />
                          <div className='flex ms-2'>
                            <div className="d-flex items-center justify-content-between" style={{ width: "340px" }}>
                              <div class="text-18px user-select-none">{item.nickName}</div>
                              <div className=' flex justify-content-end text-12px user-select-none'>
                                {/* {item.lastestTime} */}
                                {dateTimeToString(item.lastestTime)}
                              </div>
                            </div>
                            <div class="mt-5px text-16px text-#999999 text-message user-select-none">{item.lastestMessage}</div>
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
      <ChatBoxComponent userCurrent={userCurrent} userChatInfo={userChatInfo} getListChat={getListChat} />
    </>

  );
}

export default Chat;