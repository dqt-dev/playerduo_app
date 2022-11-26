import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

import { BsChatLeftQuote } from 'react-icons/bs';
import { BASE_URL } from '../common/SystemConstant';
import { useSelector, useDispatch } from 'react-redux';
import { getMyInfo } from '../redux/UserInfo/action';

import coin from '../coin.png';
import { IoIosAddCircle } from 'react-icons/io';

function Header({ handleChat }) {
  const userInfo = useSelector(state => state.userInfoReducer.userInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear()
    dispatch(getMyInfo(null));
    navigate('/')
  }

  const goToPage = (link) => {
    navigate(`/user/${link}`)
  }

  return (
    <header className="p-2 border-bottom header">
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to={"/"} className="nav-link px-2 link-secondary">ICON HOME</Link></li>
            <li><Link to={"/"} className="nav-link px-2 link-dark">HOME</Link></li>
          </ul>
          <div class="form-check form-switch me-3">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" style={{height: "20px", width: "40px"}}/>
          </div>
          <div onClick={() => goToPage('wallet')} className='d-flex justify-content-center rounded pt-1 pb-1 me-3 item-coin-header' style={{ width: "90px", backgroundColor: "#e8e8f1" }}>
            <img src={coin} style={{ height: "25px" }} />
            <div className="ps-1 pe-1">53</div>
            <IoIosAddCircle color="#1890ff" size={25} />
          </div>
          <BsChatLeftQuote onClick={handleChat} size={28} className="me-4" />
          {userInfo !== null ?
            <div className="dropdown text-end me-4">
              <a className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={BASE_URL + userInfo.avatarUrl} alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>

              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1" style={{ width: "260px" }}>
                <div className="d-flex ">
                  <div className="ps-4 pe-3">
                    <img src={BASE_URL + userInfo.avatarUrl} style={{ width: "45px", borderRadius: "50%" }} className="mt-2" alt="..." />
                  </div>
                  <div className="">
                    <div className="text-body">
                      <p className="card-text text-start mt-2 mb-0 fw-bold">{userInfo.nickName}</p>
                      <p className="card-text text-start fw-bold ">ID: 2153860</p>
                    </div>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <li><a onClick={() => goToPage('me')} className="dropdown-item cursor-pointer">Trang cá nhân</a></li>
                <li><a onClick={() => goToPage('wallet')} className="dropdown-item cursor-pointer ">Ví</a></li>
                <li><a onClick={() => goToPage('orders')} className="dropdown-item cursor-pointer">Đơn hàng</a></li>
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