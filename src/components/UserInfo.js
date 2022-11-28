import React from 'react'
import { useState } from 'react';
import { BASE_URL, USER_INFO } from '../common/SystemConstant'
import { BsMic } from 'react-icons/bs';
import RecordModel from './RecordModel';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import UserService from '../services/UserSerice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loading from './Loading';

function UserInfo({user, setUser}) {

    const userId = useSelector(state => state.userInfoReducer.userInfo)?.id;

    const [avatar, setAvatar] = useState();

    const [editNickName, setEditNickName] = useState(false);
    const [editDescription, setEditDescription] = useState(false);

    const [loaded, setLoaded] = useState(false);


    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        console.log(event.target.files[0]);

        setAvatar(event.target.files[0]);

        
        // 👇️ reset file input
        event.target.value = null;


    };
    
    const handleUpdateAvatar = () => {
        let data = new FormData();
        if(avatar != null) {
            data.append('avatar', avatar);
        }
        setLoaded(true);
        UserService.UpdateUserInfo(data)
            .then(response => {
                setLoaded(false);
                localStorage.setItem(USER_INFO,JSON.stringify(response.data));
                setUser(response.data);
                toast.success(response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => {
                setLoaded(true);
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
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

    useEffect(() => {
        if (avatar) {
            handleUpdateAvatar();
            setAvatar('');
        }
    }, [avatar]);

    useEffect(() => {
        getUserInfo(userId);
    }, [userId]);

    const handleUpdateProfile = (field, value) => {
        let data = new FormData();
        if(value != null) {
            data.append(`${field}`, value);
        }

        UserService.UpdateUserInfo(data)
            .then(response => {
                setUser(response.data);
                localStorage.setItem(USER_INFO,JSON.stringify(response.data));
                toast.success("Cập nhật thông tin thành công", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(error => {
                toast.error("Cập nhật thông tin không thành công", {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    };

    

    return (
        <div className='order-container ms-4 pt-3 fw-bold text-20px'>
            <Loading loading={loaded} />
            <div className='text-24px mb-2'>
                Thông tin cá nhân
            </div>

            <hr className='mt-1 mb-0' />
            <div className='d-flex'>
                <div className=''>
                    <div>Ảnh đại diện</div>
                    <img onClick={handleClick} src={BASE_URL + user?.avatarUrl} style={{width: "400px"}}/>
                    <input
                        id='avatar'
                        style={{ display: 'none' }}
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div className='ms-4 mt-3'>
                    <div className='pt-2'>Biệt danh</div>
                    {!editNickName ?
                        <div className='d-flex'>
                            <div>{user?.nickName}</div>
                            <div className='' onClick={() => setEditNickName(true)}>
                                <img style={{ height: '20px', marginLeft: '5px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAwtJREFUWEfN2EtoE0EcBvDvv2nwouKjIioUFATBi89DkyAexAeIB0VBfJb20NIkUBXUHiT4pAVbaLbWg7ZYsQeLJw8qChVpVimIJ6+KvXgpolI92GY/2bZJZhOT7G62qYHAJtmd/eWbmf9MIvjPHuK3Jx5mHYFDJrEVwCIN+FAjeN6dko9O7uUbiKTEwmgh0AFisXpzEUxDcKt2La4nhuVPKZgvoESC2sQLDBA4XTIFwciqlTiYeCq/i51XMcgxJiMog6oIVAwjgq8QXNWIXybQTmKTLZESKM+gEphx1GC3/kY+W4hLES6fTOMVgW1OUJ5ATjEZgBuUa5BbjCPUOuzPzD5XIK+YcijRcE1PyRXrPMegSjGlUFadCgq2WMXTEcgvjA1lwlBnnya4kDTkdlmQ35gMKh7iqTQxmJ15gke9hpwsCZovjIWIhtlME30KqL/XkMaioHnF7OJ6TCNFYk0GpGmIJVOi/xNUBcxrEnVKOpMBweaelIwXgKqOsaa6oFU35E7BtF8QDDCYNHBWRFgAiobYT6Ihby9jW5ucbLLyz4nOjhl7N80WwcHafWhIJMTMbQbmjgqm4WyUVcVkE4od4FL+wBcSy7LSBcDkQBHuMdN4qcT2LRjAzu5R+eSli2bqjItusg0R60UszHbTxA0lnU7dkIvVxmQTitazi0CbUhfO9xrS5QXkNRnboI6G2EMipiQU1w1JugVVilET6iPQnAVpaNFTctcNyA+MCrpHoFEBNekpue8U5BdGBT1Qf1NpAZxJjkpua1BC5icmBwpxiMTxbEIBnNBHZahcQn5j1IQeEziqjPRj+lsZLgVqi3DDlIkR26pdZDko98UK6lC0nk8IHM58oAk6SLxHAEEBakgEAQRBBImZ91aDaCKwIq+xgrXJDUZN6CaBy24v9huTA4W5g8Q7EAEvKBEM1O5Fk7pqe2knC7IOWkM8B6DTDUoE3zUg3mPIQ6+A/OtsO8Z4hNvNNI5QsFEIwvpfh5gC5p6CKRDTomECgjEswVjymfz0C2NLyM9GK2nrL6zhBUO55aRFAAAAAElFTkSuQmCC" className="ml-12px w-18px h-18px cursor-pointer" data-v-2ea5ff2c="" />
                            </div>
                        </div> :
                        <div>
                            <input name= 'nickName' id = 'nickName' value={user?.nickName} onChange={(e) => setUser({ ...user, nickName : e.target.value})} className='mb-2'></input>
                            <div className='d-flex justify-content-center'>
                                <button onClick={() => {setEditNickName(false); setUser({ ...user, nickName : user?.nickName})}} type="button" className="btn btn-light">Hủy</button>
                                <button onClick={() => {setEditNickName(false); handleUpdateProfile('nickName', user?.nickName);}} type="button" className="btn btn-info">Lưu</button>
                            </div>
                        </div>
                    }
                    <hr />
                    <div className='mb-2'>
                        Giọng nói của bạn
                    </div>
                    <button className='rounded' data-bs-toggle="modal" data-bs-target="#exampleRecordModal"><BsMic color='blue' className='mb-1 me-1' />Ghi âm</button>
                    <hr />

                    {!editDescription ?
                        <div className='d-flex'>
                            <div>{user?.description}</div>
                            <div onClick={() => setEditDescription(true)}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAwtJREFUWEfN2EtoE0EcBvDvv2nwouKjIioUFATBi89DkyAexAeIB0VBfJb20NIkUBXUHiT4pAVbaLbWg7ZYsQeLJw8qChVpVimIJ6+KvXgpolI92GY/2bZJZhOT7G62qYHAJtmd/eWbmf9MIvjPHuK3Jx5mHYFDJrEVwCIN+FAjeN6dko9O7uUbiKTEwmgh0AFisXpzEUxDcKt2La4nhuVPKZgvoESC2sQLDBA4XTIFwciqlTiYeCq/i51XMcgxJiMog6oIVAwjgq8QXNWIXybQTmKTLZESKM+gEphx1GC3/kY+W4hLES6fTOMVgW1OUJ5ATjEZgBuUa5BbjCPUOuzPzD5XIK+YcijRcE1PyRXrPMegSjGlUFadCgq2WMXTEcgvjA1lwlBnnya4kDTkdlmQ35gMKh7iqTQxmJ15gke9hpwsCZovjIWIhtlME30KqL/XkMaioHnF7OJ6TCNFYk0GpGmIJVOi/xNUBcxrEnVKOpMBweaelIwXgKqOsaa6oFU35E7BtF8QDDCYNHBWRFgAiobYT6Ihby9jW5ucbLLyz4nOjhl7N80WwcHafWhIJMTMbQbmjgqm4WyUVcVkE4od4FL+wBcSy7LSBcDkQBHuMdN4qcT2LRjAzu5R+eSli2bqjItusg0R60UszHbTxA0lnU7dkIvVxmQTitazi0CbUhfO9xrS5QXkNRnboI6G2EMipiQU1w1JugVVilET6iPQnAVpaNFTctcNyA+MCrpHoFEBNekpue8U5BdGBT1Qf1NpAZxJjkpua1BC5icmBwpxiMTxbEIBnNBHZahcQn5j1IQeEziqjPRj+lsZLgVqi3DDlIkR26pdZDko98UK6lC0nk8IHM58oAk6SLxHAEEBakgEAQRBBImZ91aDaCKwIq+xgrXJDUZN6CaBy24v9huTA4W5g8Q7EAEvKBEM1O5Fk7pqe2knC7IOWkM8B6DTDUoE3zUg3mPIQ6+A/OtsO8Z4hNvNNI5QsFEIwvpfh5gC5p6CKRDTomECgjEswVjymfz0C2NLyM9GK2nrL6zhBUO55aRFAAAAAElFTkSuQmCC" className="ml-12px w-18px h-18px cursor-pointer" data-v-2ea5ff2c="" style={{ height: '20px', marginLeft: '5px' }} />
                            </div>
                        </div> :
                        <div>
                            <textarea value={user?.description} onChange={(e) => setUser({ ...user, description : e.target.value})} />
                            <div className='d-flex'>
                                <button onClick={() => {setEditDescription(false); setUser({ ...user, description : user?.description})}} type="button" className="btn btn-light">Hủy</button>
                                <button onClick={() => {setEditDescription(false); handleUpdateProfile('description', user?.description);}} type="button" className="btn btn-info">Lưu</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <RecordModel />

        </div>
    )
}

export default UserInfo