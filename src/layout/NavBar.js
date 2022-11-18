
import React from "react";
import {IoWalletOutline} from "react-icons/io5";
import {AiOutlineUser, AiOutlineShoppingCart} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi";

import '../styles/navbar.css';

function NavBar() {

    return (
        <div className='navbar-custom pt-3'>
            <h3 className="ms-3">Trung tâm cá nhân</h3>

            <div className="col-md-11 navbar-item-custom ms-2 ps-1">
                <div className="card-body">
                    <AiOutlineUser size={25}/>
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Thông tin cá nhân</a>
                </div>
                <div className="card-body">
                    <IoWalletOutline size={25}/>    
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Ví</a>
                </div>
                <div className="card-body">
                    <AiOutlineShoppingCart size={25}/>
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Đơn hàng</a>
                </div>
                <div className="card-body">
                    <BiLogOut size={25}/>
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Đăng xuất</a>
                </div>
            </div>

        </div>
    )
}

export default NavBar
