import React from 'react'
import { useState } from 'react';
import AuthenService from '../services/AuthenService';

import { useNavigate } from 'react-router-dom';


import { toast, ToastContainer } from 'react-toastify';

function LoginPage() {
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
                console.log(response.data.token);
                // set token in local storage
                localStorage.setItem('user-token', response.data.token);
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
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card border-0 shadow rounded-3 my-5">
                            <div class="card-body p-4 p-sm-5">
                                <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        <label for="floatingPassword">Password</label>
                                    </div>

                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                        <label class="form-check-label" for="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                    </div>
                                    <div class="d-grid">
                                        <button onClick={() => handleLogin()} class="btn btn-primary btn-login text-uppercase fw-bold" type="button">Sign
                                            in</button>
                                    </div>
                                    <hr class="my-4" />
                                    <div class="d-grid mb-2">
                                        <button class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                            <i class="fab fa-google me-2"></i> Sign in with Google
                                        </button>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                                            <i class="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>

    )
}

export default LoginPage