
import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi";

import '../styles/navbar.css';

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { INFO_LOGIN } from "../common/SystemConstant";
import { getMyInfo } from "../redux/UserInfo/action";
import { ls } from "../common/ultil"

function NavBar({ type }) {

    const [selection, setSelection] = useState(type);

    const navigate = useNavigate();

    const goToPage = (link) => {
        navigate(`/user/${link}`);
    }

    return (
        <div className='navbar-custom pt-3'>
            <h3 className="ms-3">Trung tâm cá nhân</h3>

            <div className="col-md-11 navbar-item-custom ms-2 ps-1">
                <div className={selection == 1 ? " card-body navbar-item-custom-selected" : "card-body "} onClick={() => { goToPage('me'); setSelection(1); }}>
                    <AiOutlineUser size={25} />
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Thông tin cá nhân</a>
                </div>
                <div className={selection == 2 ? " card-body navbar-item-custom-selected" : "card-body "} onClick={() => { goToPage('wallet'); setSelection(2); }}>
                    <IoWalletOutline size={25} />
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Ví</a>
                </div>
                <div className={selection == 3 ? " card-body navbar-item-custom-selected" : "card-body "} onClick={() => { goToPage('orders'); setSelection(3); }}>
                    <AiOutlineShoppingCart size={25} />
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer">Đơn hàng</a>
                </div>
                <div className={selection == 4 ? " card-body navbar-item-custom-selected" : "card-body "} onClick={() => { goToPage('skills'); setSelection(4); }}>
                    <AiOutlineUser size={25} />
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer" >Kỹ năng cá nhân</a>
                </div>
                <div className="card-body" onClick={() => { goToPage('change-password'); setSelection(5); }}>
                    <BiLogOut size={25} />
                    <a className="card-text text-start ms-3 text-decoration-none cursor-pointer" >Đổi mật khẩu</a>
                </div>
            </div>

        </div>
    )
}

export default NavBar
