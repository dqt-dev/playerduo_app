import React from 'react'
import '../styles/header.css';
import logo from '../logo.png';

function Header() {
    return (
        <div className="menu">
            <div className='list-item'>
                <a className='item'><img src={logo} alt='logo' style={{height: "60px"}}/></a>
                <a className='item'>Trang chủ</a>
            </div>
            <div className='list-item'>
            <a className='item'><img src={logo} alt='logo' style={{height: "60px"}}/></a>
            </div>
        </div>
    )
}

export default Header