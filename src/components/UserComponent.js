import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import '../styles/userinfo.css';
import ChatList from './ChatListComponent';
import OrderComponent from './OrderComponent';
import SkillUser from './SkillUser';
import UserInfo from './UserInfo';
import WalletPage from './WalletPage';

function UserComponent({ type }) {

    const navigate = useNavigate();


    const [currentUser, setCurrentUser] = useState("");

    const [isShowChat, setIsShowChat] = useState(false);

    const handleClickChatList = () => {
        const token = localStorage.getItem('user-token');
        if (!token) {
            navigate('/login');
        }
        setIsShowChat(!isShowChat);
    }

    return (
        <>
            <Header handleClickChatList = {handleClickChatList} currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <ChatList isShowChat={isShowChat} setIsShowChat={setIsShowChat} />
            <div className='d-flex'>
                <NavBar type={type} />
                {type === 3 ? <OrderComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    : type === 2 ? <WalletPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
                        : type === 4 ? <SkillUser currentUser={currentUser} setCurrentUser={setCurrentUser} />
                            : type === 1 ? <UserInfo currentUser={currentUser} setCurrentUser={setCurrentUser} />
                                : <></>}
            </div>

        </>
    )
}

export default UserComponent