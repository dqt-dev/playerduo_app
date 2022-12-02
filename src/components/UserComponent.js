import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import '../styles/userinfo.css';
import OrderComponent from './OrderComponent';
import SkillUser from './SkillUser';
import UserInfo from './UserInfo';
import WalletPage from './WalletPage';

function UserComponent({ type }) {

    const navigate = useNavigate();
    const [isShowChat, setIsShowChat] = useState(false);

    const handleChat = () => {
        const token = localStorage.getItem('currentUser-token');
        if (!token) {
          navigate('/login');
        }
        setIsShowChat(!isShowChat);
      }

    const [currentUser, setCurrentUser] = useState("");

    return (
        <>
            <Header handleChat = {handleChat} currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
            <div className='d-flex'>
                <NavBar type = {type}/>
                {type === 3 ? <OrderComponent currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
                    : type === 2 ? <WalletPage currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
                        : type === 4 ? <SkillUser currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
                            : type === 1 ? <UserInfo currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
                                : <></>}
            </div>

        </>
    )
}

export default UserComponent