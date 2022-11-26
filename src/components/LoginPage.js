import React from 'react'
import { useState } from 'react';
import AuthenService from '../services/AuthenService';

import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';
import { getMyInfo } from './../redux/UserInfo/action';
import UserService from '../services/UserSerice';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    // toggle show password
    const handleTogglePassword = (event) => {
        event.stopPropagation();
        const showPassword = this.state.showPassword;
        this.setState({
            showPassword: !showPassword
        })
    }

    // handle username input
    const handleUsernameInput = (event) => {
        this.setState({
            username: event.target.value,
            isUsernameValid: event.target.value.length > 0
        })
    }

    // handle password input
    const handlePasswordInput = (event) => {
        this.setState({
            password: event.target.value,
            isPasswordValid: event.target.value.length > 0
        })
    }
    const handleLogin = () => {
        AuthenService.Login({username: userName, password: password})
            .then(response => {
                // set token in local storage
                localStorage.setItem('user-token', response.data.token);
                (async () => {
                    try {
                        const user = await UserService.getMyInfo();
                        if (user.data) {
                        dispatch(getMyInfo(user.data));
                    }
                    } catch (error) {
                        dispatch(getMyInfo(null));
                    }
                })();
                navigate("/");
            })
            .catch(e => {
                toast.error(e.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                    </div>
                                    <div className="d-grid">
                                        <button onClick={() => handleLogin()} className="btn btn-primary btn-login text-uppercase fw-bold" type="button">Sign
                                            in</button>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="d-grid mb-2">
                                        <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                            <i className="fab fa-google me-2"></i> Sign in with Google
                                        </button>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                                            <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoginPage