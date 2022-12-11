import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

import { FaFacebookMessenger } from 'react-icons/fa';
import { BASE_URL, INFO_LOGIN, USER_INFO, USER_TOKEN } from '../common/SystemConstant';
import { useSelector, useDispatch } from 'react-redux';
import { getMyInfo } from '../redux/UserInfo/action';
import { formatNumberWithComma, ls } from "../common/ultil"
import coin from '../coin.png';
import { IoIosAddCircle } from 'react-icons/io';
import { useState } from 'react';
import UserService from '../services/UserSerice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import logo from '../logo.png';

function Header({ handleClickChatList }) {
  const currentUser = useSelector(state => state.userInfoReducer.userInfo);

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {

    const infoLogin = ls.get(INFO_LOGIN)
    localStorage.clear()
    if (infoLogin) {
      ls.set(INFO_LOGIN, infoLogin)
    }
    dispatch(getMyInfo(null));
    navigate('/')
  }

  const goToPage = (link) => {
    navigate(`/user/${link}`)
  }

  const handleUpdateStatus = (status) => {
    setLoaded(true);
    UserService.UpdateStatus(status)
      .then(response => {
        setLoaded(false);
        dispatch(getMyInfo(response.data));
        !currentUser?.status ? toast.success("Bạn đang ở trạng thái sẵn sàng nhận đơn hàng!", {
          position: toast.POSITION.TOP_CENTER
        }) :
          toast.success("Bạn đang ở trạng thái bận!", {
            position: toast.POSITION.TOP_CENTER
          });
      })
      .catch(error => {
        setLoaded(false);
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  }

  return (
    <header className="p-2 border-bottom header">
      <Loading loaded={loaded} />
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to={"/"} className="nav-link px-2 link-secondary pt-0 pb-0"><img src={logo} style={{ height: "40px", width: "60px" }} /></Link></li>
            <li><Link to={"/"} className="nav-link px-2 link-dark">HOME</Link></li>
          </ul>
          <div className="form-check form-switch me-3">
            <input disabled={!currentUser} onChange={() => handleUpdateStatus(!currentUser?.status)} className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" style={{ height: "20px", width: "40px" }} checked={currentUser?.status} />
          </div>
          <div onClick={() => goToPage('wallet')} className='d-flex justify-content-center rounded pt-1 pb-1 me-3 item-coin-header' style={{ width: "90px", backgroundColor: "#e8e8f1" }}>
            <img src={coin} style={{ height: "25px" }} />
            <div className="ps-1 pe-1 cursor-pointer ">{currentUser?.coin && formatNumberWithComma(currentUser.coin)}</div>
            <IoIosAddCircle color="#1890ff" size={25} />
          </div>
          {/* <div onClick={handleClickChatList} className="d-flex border rounded me-2"> */}
            <FaFacebookMessenger onClick={handleClickChatList} size={28} className="me-3" color='#1876f2' />
            {/* <div className=''>Tin nhắn</div> */}
          {/* </div> */}
          {currentUser ?
            <div className="dropdown text-end me-4">
              <a className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={BASE_URL + currentUser?.avatarUrl} alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>

              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1" style={{ width: "260px" }}>
                <div className="d-flex ">
                  <div className="ps-4 pe-3">
                    <img src={BASE_URL + currentUser?.avatarUrl} style={{ width: "45px", height: "45px", borderRadius: "50%" }} className="mt-2" alt="..." />
                  </div>
                  <div className="">
                    <div className="text-body">
                      <p className="card-text text-start mt-2 mb-0 fw-bold">{currentUser?.nickName}</p>
                      <p className="card-text text-start fw-bold ">ID: 2153860</p>
                    </div>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <li><a onClick={() => goToPage('me')} className="dropdown-item cursor-pointer">Trang cá nhân</a></li>
                <li><a onClick={() => goToPage('wallet')} className="dropdown-item cursor-pointer ">Ví</a></li>
                <li><a onClick={() => goToPage('orders')} className="dropdown-item cursor-pointer">Đơn hàng</a></li>
                <li><a onClick={() => goToPage('skills')} className="dropdown-item cursor-pointer">Kỹ năng cá nhân</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a onClick={handleSignOut} className="dropdown-item cursor-pointer">Sign out</a></li>
              </ul>

            </div> :
            <div>
              <button onClick={() => navigate('/login')} className='btn btn-primary me-3'> Đăng nhập</button>
            </div>}
        </div>
      </div>
    </header>
  )
}

export default Header