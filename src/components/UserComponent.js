import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import '../styles/userinfo.css';
import OrderComponent from './OrderComponent';
import SkillUser from './SkillUser';
import UserInfo from './UserInfo';
import WalletPage from './WalletPage';

function UserComponent({ type }) {
    console.log("type :", type)
    return (
        <>
            <Header />
            <div className='d-flex'>
                <NavBar />
                {type === 3 ? <OrderComponent />
                    : type === 2 ? <WalletPage />
                        : type === 4 ? <SkillUser />
                            : type === 1 ? <UserInfo />
                                : <></>}
            </div>

        </>
    )
}

export default UserComponent