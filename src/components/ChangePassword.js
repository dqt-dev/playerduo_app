import React from 'react'
import { toast } from 'react-toastify';
import { useNavigate, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
// import '../../../Style={{change "-email.c}}ss'
import { useState } from 'react';
import AuthenService from '../services/AuthenService';

const ChangePassword = () => {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const backToUserPage = () => {
        navigate("/user/me");
    }
    // // on save click 
    const handleSaveUpdate = () => {
        if (currentPassword.trim().length < 0
            || newPassword.trim().length < 0
            || confirmPassword.trim().length < 0
        ) {
            toast.warning('Vui lòng nhập đủ các trường bắt buộc!');
            return;
        }

        if (newPassword.trim().length < 8
            || confirmPassword.trim().length < 8
        ) {
            toast.warning('Dữ liệu không hợp lệ!');
            return;
        }

        const changePasswordRequest = {
            currentPassword: currentPassword.trim(),
            newPassword: newPassword.trim(),
            confirmPassword: confirmPassword.trim()
        }

        AuthenService.ChangePassword(changePasswordRequest)
            .then((response) => {
                toast.success("Đổi mật khẩu thành công", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => {
                // setLoaded(true);
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });

        setTimeout(() => {
            backToUserPage();
        }, 1000)
    }

    return (
        <div class="container card card-outline-secondary mt-4" style={{ width: "40%" }}>
            <div class="card-header">
                <h3 class="mb-0">Change Password</h3>
            </div>
            <div class="card-body">
                <form class="form" role="form" autocomplete="off">
                    <div class="form-group">
                        <label for="inputPasswordOld">Current Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="inputPasswordOld"
                            required=""
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label for="inputPasswordNew">New Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="inputPasswordNew"
                            required=""
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        >
                        </input>
                        <span class="form-text small text-muted">
                            The password must be 8-20 characters, and must <em>not</em> contain spaces.
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="inputPasswordNewVerify">Verify</label>
                        <input type="password" class="form-control" id="inputPasswordNewVerify" required=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        <span class="form-text small text-muted">
                            To confirm, type the new password again.
                        </span>
                    </div>
                    <div class="form-group d-flex justify-content-center mt-2">
                        <button type="button" onClick={ backToUserPage} class="btn btn btn-secondary btn-lg me-2 ">Hủy bỏ</button>
                        <button type="button" onClick={handleSaveUpdate} class="btn btn-success btn-lg ms-2">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ChangePassword