import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../common/SystemConstant'

function UserInfo() {
    const [nickName, setNickName] = useState("tuan");
    const [description, setDescription] = useState("gà quá");

    const [editNickName, setEditNickName] = useState(false);
    const [editDescription, setEditDescription] = useState(false);

    return (
        <div className='order-container ms-4 pt-3 fw-bold text-20px'>
            <div className='text-24px mb-2'>
                Thông tin cá nhân
            </div>

            <hr className='mt-1 mb-0' />
            <div className='d-flex'>
                <div className=''>
                    <div>Ảnh đại diện</div>
                    <img src={BASE_URL + '/storage/a9a4d4dc-f799-4248-a0b6-2617376a19c3.jpg'} />
                </div>
                <div className='ms-4'>
                    <div>Biệt danh</div>
                    { !editNickName ?
                        <div className='d-flex'>
                        <div>{nickName}</div>
                        <div onClick={() => setEditNickName(true)}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAwtJREFUWEfN2EtoE0EcBvDvv2nwouKjIioUFATBi89DkyAexAeIB0VBfJb20NIkUBXUHiT4pAVbaLbWg7ZYsQeLJw8qChVpVimIJ6+KvXgpolI92GY/2bZJZhOT7G62qYHAJtmd/eWbmf9MIvjPHuK3Jx5mHYFDJrEVwCIN+FAjeN6dko9O7uUbiKTEwmgh0AFisXpzEUxDcKt2La4nhuVPKZgvoESC2sQLDBA4XTIFwciqlTiYeCq/i51XMcgxJiMog6oIVAwjgq8QXNWIXybQTmKTLZESKM+gEphx1GC3/kY+W4hLES6fTOMVgW1OUJ5ATjEZgBuUa5BbjCPUOuzPzD5XIK+YcijRcE1PyRXrPMegSjGlUFadCgq2WMXTEcgvjA1lwlBnnya4kDTkdlmQ35gMKh7iqTQxmJ15gke9hpwsCZovjIWIhtlME30KqL/XkMaioHnF7OJ6TCNFYk0GpGmIJVOi/xNUBcxrEnVKOpMBweaelIwXgKqOsaa6oFU35E7BtF8QDDCYNHBWRFgAiobYT6Ihby9jW5ucbLLyz4nOjhl7N80WwcHafWhIJMTMbQbmjgqm4WyUVcVkE4od4FL+wBcSy7LSBcDkQBHuMdN4qcT2LRjAzu5R+eSli2bqjItusg0R60UszHbTxA0lnU7dkIvVxmQTitazi0CbUhfO9xrS5QXkNRnboI6G2EMipiQU1w1JugVVilET6iPQnAVpaNFTctcNyA+MCrpHoFEBNekpue8U5BdGBT1Qf1NpAZxJjkpua1BC5icmBwpxiMTxbEIBnNBHZahcQn5j1IQeEziqjPRj+lsZLgVqi3DDlIkR26pdZDko98UK6lC0nk8IHM58oAk6SLxHAEEBakgEAQRBBImZ91aDaCKwIq+xgrXJDUZN6CaBy24v9huTA4W5g8Q7EAEvKBEM1O5Fk7pqe2knC7IOWkM8B6DTDUoE3zUg3mPIQ6+A/OtsO8Z4hNvNNI5QsFEIwvpfh5gC5p6CKRDTomECgjEswVjymfz0C2NLyM9GK2nrL6zhBUO55aRFAAAAAElFTkSuQmCC" class="ml-12px w-18px h-18px cursor-pointer" data-v-2ea5ff2c="" />
                        </div>
                    </div> :
                    <div>
                        <input value= {nickName} onChange = {(e) => setNickName(e.target.value)}></input>
                    <div className='d-flex'>
                        <button onClick={() => setEditNickName(false)} type="button" class="btn btn-light">Hủy</button>
                        <button onClick={() => setEditNickName(false)} type="button" class="btn btn-info">Lưu</button>
                    </div>
                    </div>
                    }
                    

                    <div>
                        Giọng nói của bạn
                    </div>
                    <button>ghi âm</button>
                    
                    { !editDescription ?
                        <div className='d-flex'>
                        <div>{description}</div>
                        <div onClick={() => setEditDescription(true)}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAwtJREFUWEfN2EtoE0EcBvDvv2nwouKjIioUFATBi89DkyAexAeIB0VBfJb20NIkUBXUHiT4pAVbaLbWg7ZYsQeLJw8qChVpVimIJ6+KvXgpolI92GY/2bZJZhOT7G62qYHAJtmd/eWbmf9MIvjPHuK3Jx5mHYFDJrEVwCIN+FAjeN6dko9O7uUbiKTEwmgh0AFisXpzEUxDcKt2La4nhuVPKZgvoESC2sQLDBA4XTIFwciqlTiYeCq/i51XMcgxJiMog6oIVAwjgq8QXNWIXybQTmKTLZESKM+gEphx1GC3/kY+W4hLES6fTOMVgW1OUJ5ATjEZgBuUa5BbjCPUOuzPzD5XIK+YcijRcE1PyRXrPMegSjGlUFadCgq2WMXTEcgvjA1lwlBnnya4kDTkdlmQ35gMKh7iqTQxmJ15gke9hpwsCZovjIWIhtlME30KqL/XkMaioHnF7OJ6TCNFYk0GpGmIJVOi/xNUBcxrEnVKOpMBweaelIwXgKqOsaa6oFU35E7BtF8QDDCYNHBWRFgAiobYT6Ihby9jW5ucbLLyz4nOjhl7N80WwcHafWhIJMTMbQbmjgqm4WyUVcVkE4od4FL+wBcSy7LSBcDkQBHuMdN4qcT2LRjAzu5R+eSli2bqjItusg0R60UszHbTxA0lnU7dkIvVxmQTitazi0CbUhfO9xrS5QXkNRnboI6G2EMipiQU1w1JugVVilET6iPQnAVpaNFTctcNyA+MCrpHoFEBNekpue8U5BdGBT1Qf1NpAZxJjkpua1BC5icmBwpxiMTxbEIBnNBHZahcQn5j1IQeEziqjPRj+lsZLgVqi3DDlIkR26pdZDko98UK6lC0nk8IHM58oAk6SLxHAEEBakgEAQRBBImZ91aDaCKwIq+xgrXJDUZN6CaBy24v9huTA4W5g8Q7EAEvKBEM1O5Fk7pqe2knC7IOWkM8B6DTDUoE3zUg3mPIQ6+A/OtsO8Z4hNvNNI5QsFEIwvpfh5gC5p6CKRDTomECgjEswVjymfz0C2NLyM9GK2nrL6zhBUO55aRFAAAAAElFTkSuQmCC" class="ml-12px w-18px h-18px cursor-pointer" data-v-2ea5ff2c="" />
                        </div>
                    </div> :
                    <div>
                        <textarea value= {description} onChange = {(e) => setDescription(e.target.value)}/>
                    <div className='d-flex'>
                        <button onClick={() => setEditDescription(false)} type="button" class="btn btn-light">Hủy</button>
                        <button onClick={() => setEditDescription(false)} type="button" class="btn btn-info">Lưu</button>
                    </div>
                    </div>
                    }
                </div>


            </div>

        </div>
    )
}

export default UserInfo