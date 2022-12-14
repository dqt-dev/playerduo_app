import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

import { BsChatLeftQuote } from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Header() {

  const handleGetUserInfo = () => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      return;
    }
    axios.get("https://localhost:7207/api/Users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserInfo(response.data)
      })
      .catch(error => {
        console.log(error);
        // toast.error(error.response.data, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
      });
  }

  useEffect(() => {
    handleGetUserInfo();
  }, []);


  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("user-token");
    navigate('/')
  }

  const [userInfo, setUserInfo] = useState(null);

  const goToOrder = () => {
    navigate('/user/orders')
  }

  return (
    <header className="p-2 border-bottom header">
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" className="nav-link px-2 link-secondary">ICON HOME</a></li>
            <li><a href="/" className="nav-link px-2 link-dark">HOME</a></li>
          </ul>
          <BsChatLeftQuote size={28} className="me-4" />
          {userInfo !== null ?
            <div className="dropdown text-end me-4">
              <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={"https://localhost:7207" + userInfo.avatarUrl} alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>

              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1" style={{width: "260px"}}>
                <div className="d-flex ">
                  <div className="ps-4 pe-3">
                    <img src={"https://localhost:7207" + userInfo.avatarUrl} style={{ width: "45px", borderRadius: "50%" }} className="mt-2" alt="..." />
                  </div>
                  <div className="">
                    <div className="text-body">
                      <p className="card-text text-start mt-2 mb-0 fw-bold">{userInfo.nickName}</p>
                      <p className="card-text text-start fw-bold ">ID: 2153860</p>
                    </div>
                  </div>
                </div>
                <hr className="dropdown-divider"/>
                <li><a className="dropdown-item" href="#">Trang c?? nh??n...</a></li>
                <li><a className="dropdown-item" href="#">V??</a></li>
                <li><a onClick={goToOrder} className="dropdown-item">????n h??ng</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a onClick={handleSignOut} className="dropdown-item">Sign out</a></li>
              </ul>

            </div> :
            <div>
              <button onClick={() => navigate('/login')} className='btn btn-primary me-3'> ????ng nh???p</button>
            </div>}
        </div>
      </div>
    </header>
  )
}

export default Header