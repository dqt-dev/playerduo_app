import React, { useEffect } from 'react';
import { useState } from 'react';
import AuthenService from '../services/AuthenService';
import {INFO_LOGIN} from "../common/SystemConstant/index"
import { useNavigate } from 'react-router-dom';

import {ls} from "../common/ultil"

import { toast, ToastContainer } from 'react-toastify';
import { getMyInfo } from './../redux/UserInfo/action';
import UserService from '../services/UserSerice';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [info,setInfo] = useState({
        userName: '',
        password: ''
    })
    const [remember,setRemember] = useState(false)

    useEffect(() => {
        const infoLogin =  ls.get(INFO_LOGIN)

        if (infoLogin) {
         setInfo(infoLogin)
         setRemember(true)
        }
     }, [])

    const [message, setMessage] = useState({
        isValid: false,
        userName: '',
        password: ''
    });

    // toggle show password
    const handleTogglePassword = (event) => {
        event.stopPropagation();
        const showPassword = this.state.showPassword;
        this.setState({
            showPassword: !showPassword
        });
    };

    // handle username input
    const handleUsernameInput = (event) => {
        this.setState({
            username: event.target.value,
            isUsernameValid: event.target.value.length > 0
        });
    };

    // handle password input
    const handlePasswordInput = (event) => {
        this.setState({
            password: event.target.value,
            isPasswordValid: event.target.value.length > 0
        });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const valid = validate();
        if (valid.valid) {

            AuthenService.Login({ username: info.userName, password: info.password })
                .then(response => {
                    // set token in local storage
                    console.log(remember)
                    if (remember) {
                        ls.set(INFO_LOGIN, info)
                    } else {
                        localStorage.removeItem(INFO_LOGIN)
                    }

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

    };

    const validateUserName = () => {
        const minLengthUserName = 8;
        let messageUserName = '';
        let valid = true;
        if (!info.userName) {
            messageUserName = 'Vui lòng nhập tên đăng nhập!';
            valid = false;
            return { valid, messageUserName };
        }
        if (info.userName.length < minLengthUserName) {
            valid = false;
            messageUserName = `Chiều dài tối thiếu phải là ${minLengthUserName} ký tự`;
            return { valid, messageUserName };
        }
        return { valid, messageUserName };
    };

    const validateRegex = (regex, text) => {
        return regex.exec(text);
    };

    const validatePassword = () => {
        let password = '';
        let minLengthPassword = 8;
        let regexAll = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const valid = regexAll.test(info.password);
        if (!valid) {
            if (!info.password) {
                password = 'Vui lòng nhập tên nhập mật khẩu!';
                return { valid, password };

            }
            if (info.password.length < minLengthPassword) {
                password = `Chiều dài tối thiếu phải là ${minLengthPassword} ký tự`;
                return { valid, password };
            }
            const regexCharLowerCase = /[a-z]/;
            if (!validateRegex(regexCharLowerCase, info.password)) {
                password = `Phải chứa ít nhất 1 chữ thường!`;
                return { valid, password };
            }
            const regexCharUpperCase = /[A-Z]/;
            if (!validateRegex(regexCharUpperCase, info.password)) {
                password = `Phải chứa ít nhất 1 chữ hoa!`;
                return { valid, password };
            }
            const regexNumber = /[0-9]/;
            if (!validateRegex(regexNumber, info.password)) {
                password = `Phải chứa ít nhất 1 số!`;
                return { valid, password };
            }
            const regexSpecialChar = /[[!@#$%^&*(),.?":{}|<>]/;
            if (!validateRegex(regexSpecialChar, info.password)) {
                password = `Phải chứa ít nhất 1 ký tự đặc biệc!`;
                return { valid, password };
            }
        }

        return { valid, password };
    };

    const validate = () => {
        // validate user name
        const validUserName = validateUserName();
        // validate password
        const validPassword = validatePassword();
        const valid = validUserName.valid && validPassword.valid;
        let validResult = {
            valid,
            userName: validUserName.messageUserName,
            password: validPassword.password
        };
        setMessage(validResult);
        return validResult;
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setMessage({
            ...message,
            [name]: ''
        })
        setInfo({
            ...info,
            [name]:value
        })
    };

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
                                        <input name="userName" type="text" className="form-control" id="floatingInput" placeholder="username" value={info.userName} onChange={handleOnChange} />
                                        <label htmlFor="floatingInput">User Name</label>
                                        <div className={`invalid-feedback`} style={{ display: message.userName ? "block" : "none" }}>
                                            {message.userName}
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" value={info.password} onChange={handleOnChange} />
                                        <label htmlFor="floatingPassword">Password</label>
                                        <div className={`invalid-feedback`} style={{ display: message.password ? "block" : "none" }}>
                                            {message.password}
                                        </div>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input onChange={(e) => {
                                            setRemember(!remember)
                                        }} className="form-check-input" type="checkbox" value={true} checked={remember} id="rememberPasswordCheck" />
                                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                    </div>
                                    <div className="d-grid">
                                        <button onClick={handleLogin} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
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
            <ToastContainer />
        </>

    );
}

export default LoginPage;