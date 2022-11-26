import React from "react";
import { useState } from "react";
import AuthenService from "../../services/AuthenService";
import {  USER_TOKEN} from "../../common/SystemConstant/index";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../Loading';

import { toast, ToastContainer } from "react-toastify";
import { getMyInfo } from "../../redux/UserInfo/action";
import UserService from "../../services/UserSerice";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    gender: 'true',
    email: "",
    phone: "",
    nickName: ""
  });

  const [message, setMessage] = useState({
    isValid: false,
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    email: "",
    phone: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const valid = validate();
    if (valid.valid) {
      setLoaded(true)
      AuthenService.Register({...info, gender: info.gender === 'true' ? true : false})
          .then((response) => {
            // set token in local storage
            setLoaded(false)

            localStorage.setItem(USER_TOKEN, response.data.token);
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
          .catch((e) => {
            setLoaded(false)
            toast.error(e.response.data, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
    }
  };

  const validateUserName = () => {
    const minLengthUserName = 8;
    let messageUserName = "";
    let valid = true;
    if (!info.userName) {
      messageUserName = "Vui lòng nhập tên đăng nhập!";
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
    let password = "";
    let minLengthPassword = 8;
    let regexAll =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valid = regexAll.test(info.password);
    if (!valid) {
      if (!info.password) {
        password = "Vui lòng nhập tên nhập mật khẩu!";
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

  const validatePhoneNumber = () => {
    let phone = "";
    let valid = true;
    if (!info.phone) {
      phone = "Số điện thoại không được để trống!";
      valid = false;
      return { valid, phone };
    } else if (!/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/i.test(info.phone)) {
      phone = "Số điện thoại bạn nhập không đúng!";
      valid = false;
      return { valid, phone };
    }
    return { valid, phone };
  };
  const validateEmail = () => {
    let email = "";
    let valid = true;
    if (!info.email) {
      email = "Email không được để trống!";
      valid = false;
      return { valid, email };
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(info.email)) {
      email = "Email bạn nhập không đúng định dạng!";
      valid = false;
      return { valid, email };
    }
    return { valid, email };
  };

  const validateConfirmPassword = () => {
    let confirmPassword = "";
    let valid = true;
    if (!info.confirmPassword) {
      confirmPassword = "Vui lòng nhập lại mật khẩu!";
      valid = false;
      return { valid, confirmPassword };
    }
    if (info.confirmPassword !== info.password) {
      confirmPassword = "Mật khẩu không khớp!";
      valid = false;
      return { valid, confirmPassword };
    }
    return { valid, confirmPassword };
  };

  const validate = () => {
    // validate user name
    const validUserName = validateUserName();
    // validate password
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const validEmail = validateEmail();
    const validPhoneNumber = validatePhoneNumber();
    const valid =
      validUserName.valid &&
      validPassword.valid &&
      validConfirmPassword.valid &&
      validEmail.valid &&
      validPhoneNumber.valid;
    let validResult = {
      valid,
      userName: validUserName.messageUserName,
      password: validPassword.password,
      confirmPassword: validConfirmPassword.confirmPassword,
      email: validEmail.email,
      phone: validPhoneNumber.phone,
    };
    setMessage(validResult);
    return validResult;
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setMessage({
      ...message,
      [name]: "",
    });
    setInfo({
      ...info,
      [name]: value,
    });
  };
  return (
    <>
     <Loading loading={loaded} />
      <div className="container">
        <div className="row">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Đăng ký
              </h5>
              <form>
                <div className="row">
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        name="phone"
                        type="text"
                        className="form-control form-control-sm"
                        id="phone"
                        placeholder="Số điện thoại"
                        value={info.phone}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="floatingInput">Số điện thoại</label>
                      <div
                        className={`invalid-feedback`}
                        style={{
                          display: message.phone ? "block" : "none",
                        }}
                      >
                        {message.phone}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={info.email}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="floatingInput">Email</label>
                      <div
                        className={`invalid-feedback`}
                        style={{ display: message.email ? "block" : "none" }}
                      >
                        {message.email}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        name="userName"
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Tên đăng nhập"
                        value={info.userName}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="floatingInput">Tên đăng nhập</label>
                      <div
                        className={`invalid-feedback`}
                        style={{ display: message.userName ? "block" : "none" }}
                      >
                        {message.userName}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Mật khẩu"
                        value={info.password}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="floatingPassword">Mật khẩu</label>
                      <div
                        className={`invalid-feedback`}
                        style={{ display: message.password ? "block" : "none" }}
                      >
                        {message.password}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        value={info.confirmPassword}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="floatingPassword">
                        Nhập lại mật khẩu
                      </label>
                      <div
                        className={`invalid-feedback`}
                        style={{
                          display: message.confirmPassword ? "block" : "none",
                        }}
                      >
                        {message.confirmPassword}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="hi">Giới tính</label>
                    <div className="form-floating mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value={true}
                          id="flexRadioDefault1"
                          onChange={handleOnChange}
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Nam
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value={false}
                          id="flexRadioDefault2"
                          onChange={handleOnChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    onClick={handleRegister}
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Đăng ký
                  </button>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <p className="text-center">
                    Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
