import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

import { BsChatLeftQuote } from 'react-icons/bs';
import { BASE_URL, INFO_LOGIN } from '../common/SystemConstant';
import { useSelector, useDispatch } from 'react-redux';
import { getMyInfo } from '../redux/UserInfo/action';
import { ls } from "../common/ultil"
import coin from '../coin.png';
import { IoIosAddCircle } from 'react-icons/io';
import { useState } from 'react';
import UserService from '../services/UserSerice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function Header({ handleChat, user, setUser }) {
  const userId = useSelector(state => state.userInfoReducer.userInfo)?.id;

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    
    const infoLogin = ls.get(INFO_LOGIN)
    localStorage.clear()
    if (infoLogin) {
      ls.set(INFO_LOGIN, infoLogin)
    }
    setUser(null);
    dispatch(getMyInfo(null));
    navigate('/')
  }

  const getUserInfo = (userId) => {
    setLoaded(true);
    UserService.get(userId)
      .then(response => {
        setLoaded(false);
        setUser(response.data);
      })
      .catch(e => {
        setLoaded(false);
        console.log(e);
      });
  };

  const goToPage = (link) => {
    navigate(`/user/${link}`)
  }

  const handleUpdateStatus = (status) => {
    UserService.UpdateStatus(status)
      .then(response => {
        setLoaded(false);
        !user?.status ? toast.success("Bạn đang ở trạng thái sẵn sàng nhận đơn hàng!", {
          position: toast.POSITION.TOP_RIGHT
        }) :
          toast.success("Bạn đang ở trạng thái bận!", {
            position: toast.POSITION.TOP_RIGHT
          });
      })
      .catch(error => {
        setLoaded(false);
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  }

  useEffect(() => {
    if(userId)
    getUserInfo(userId);
  }, [userId]);

  return (
    <header className="p-2 border-bottom header">
      <Loading loaded={loaded} />
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to={"/"} className="nav-link px-2 link-secondary">ICON HOME</Link></li>
            <li><Link to={"/"} className="nav-link px-2 link-dark">HOME</Link></li>
          </ul>
          <div className="form-check form-switch me-3">
            <input disabled={!user} onChange={() => { handleUpdateStatus(!user?.status); setUser({...user, status : !user?.status}); }} className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" style={{ height: "20px", width: "40px" }} checked={user?.status} />
          </div>
          <div onClick={() => goToPage('wallet')} className='d-flex justify-content-center rounded pt-1 pb-1 me-3 item-coin-header' style={{ width: "90px", backgroundColor: "#e8e8f1" }}>
            <img src={coin} style={{ height: "25px" }} />
            <div className="ps-1 pe-1">{user?.coin}</div>
            <IoIosAddCircle color="#1890ff" size={25} />
          </div>
          <BsChatLeftQuote onClick={handleChat} size={28} className="me-4" />
          {user ?
            <div className="dropdown text-end me-4">
              <a className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={BASE_URL + user?.avatarUrl} alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>

              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1" style={{ width: "260px" }}>
                <div className="d-flex ">
                  <div className="ps-4 pe-3">
                    <img src={BASE_URL + user?.avatarUrl} style={{ width: "45px", borderRadius: "50%" }} className="mt-2" alt="..." />
                  </div>
                  <div className="">
                    <div className="text-body">
                      <p className="card-text text-start mt-2 mb-0 fw-bold">{user?.nickName}</p>
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