import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import '../styles/userinfo.css';
import OrderComponent from './OrderComponent';
import SkillUser from './SkillUser';
import UserInfo from './UserInfo';
import WalletPage from './WalletPage';

function UserComponent({ type }) {

    const [user, setUser] = useState("");

    return (
        <>
            <Header user = {user} setUser = {setUser} />
            <div className='d-flex'>
                <NavBar />
                {type === 3 ? <OrderComponent user = {user} setUser = {setUser}/>
                    : type === 2 ? <WalletPage user = {user} setUser = {setUser}/>
                        : type === 4 ? <SkillUser user = {user} setUser = {setUser}/>
                            : type === 1 ? <UserInfo user = {user} setUser = {setUser}/>
                                : <></>}
            </div>

        </>
    )
}

export default UserComponent