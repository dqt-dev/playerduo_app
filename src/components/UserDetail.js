import React from 'react'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import '../styles/userdetail.css';

import star from '../star.png'
import coin from '../coin.png'
import icon from '../icon.png'
import stop from '../stop.png'
import play from '../play.png'
import { useState } from 'react';
import UserService from '../services/UserSerice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserDetail() {
    const { userId } = useParams();
    // Khởi tạo đối tượng tutorial
    const initUserInfo = {
        id: null,
        avatarUrl: "",
        nickName: "",
        status: false
    };
    // dùng useState để lưu đối tượng tutorial hiện tại đang focus
    const [user, setUser] = useState(initUserInfo);

    // get ra đối tượng tutorial bằng id
    const getTutorial = userId => {
        // gọi tới api get by id
        UserService.get(userId)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (userId)
            getTutorial(userId);
    }, [userId]);

    return (
        <>
            <Header />
            <div className='container'>
                <div className='card main-info'>
                    <div className="mb-3" style={{ width: "280px", height: "70px" }}>
                        <div className="row g-0 ms-4 ">
                            <div className="col-md-4 mx-auto item-center">
                                <img src={"https://localhost:7207" + user.avatarUrl} style={{ width: "72px", borderRadius: "50%" }} className="mt-2" alt="..." />
                                {user.status ? <div className="div-online-2" style={{ background: "#31a24c", width: "13px", height: "13px", borderRadius: "50%" }}></div> :
                                <div className="div-online-2" style={{ background: "red", width: "13px", height: "13px", borderRadius: "50%" }}></div>}
                            </div>
                            <div className="col-md-8 mt-2">
                                <div className="text-body">
                                    <p className="card-text text-start mt-2 mb-1 fw-bold">[M] Belin GB 🌚</p>
                                    <p className="card-text text-start fw-bold ">ID: 2153860</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex bd-highlight mt-3">
                    <div className='card' style={{ height: "800px", borderTopRightRadius: "18px", borderTopLeftRadius: "18px" }}>
                        <div className = "flex" style={{ width: "324px" }}>
                            <img src={"https://localhost:7207" + user.avatarUrl} style={{ width: "324px", borderTopRightRadius: "18px", borderTopLeftRadius: "18px" }} className="" alt="..." />
                            <img src="https://data.lita.cool/cdn-web/www/assets/icon-player-info-audio.61cc149d.png" alt="audio" class="audio-icon-large"></img>
                        </div>
                        <div>
                            image ở đây
                        </div>
                        <div>
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-2">Lý lịch</p>
                                <p className="card-text text-start fw-bold">{user.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='detail-skill-info ms-3'>
                        <div>
                            List skill of user
                        </div>
                        <div className="card skill-info-of-user mt-3">
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-2">PUBG Mobile</p>
                                <p className="d-flex align-items-center mb-1 card-text fw-bold fs-4" >150Đ<img style={{ height: "14px", width: "14px" }} src={coin} />/ Trận</p>
                                <p className="d-flex align-items-center mb-2 card-text fw-bold fs-4" >Đánh giá:<img style={{ height: "14px", width: "14px" }} src={star} className="ms-2" /> 4  |  Đã phục vụ: 5</p>
                                <button type="button" class="btn btn-lg btn-order ms-2">Đặt đơn</button>
                                <button type="button" class="btn btn-lg btn-chat ms-3"><img src={icon} />Chat</button>
                            </div>
                        </div>
                        <div className="card skill-info mt-3">
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-3">Thông tin game</p>
                                <p className="align-items-center mb-1 card-text fs-5" >Muốn lên thách đấu thì ghé em nhé, best adc là em nè 🙈</p>
                                <div className="d-flex flex-row items-center px-4px border rounded-2" style={{ height: "24px", width: "60px" }}>
                                    <img src={stop} alt="stop" class="w-16px h-16px mt-1 ms-1 me-2" />
                                    {/* <img src={play} alt="play" class="w-16px h-16px"/> */}
                                    <div>12'</div>
                                </div>
                                <div>
                                    <img class="mt-3" src="https://data.lita.cool/user/1097115/skill/level_33_t1636552836869.png?t=1636596868180" style={{ height: "190px", width: "338px" }} />
                                </div>
                            </div>
                            <div>
                                <div class="d-flex items-center justify-content-between mt-3">
                                    <div class="text-20px font-bold text-#333333 ms-3">Đánh Giá Của Người Dùng (249)</div>
                                    <div class="d-flex me-3">
                                        <img src={star} alt="rating" class="w-18px h-17px" />
                                        <div class="ml-5px text-20px font-bold text-#333333">5.00/5</div>
                                    </div>
                                </div>

                                <div class="d-flex items-center justify-content-between mt-3">
                                    <div class="text-20px font-bold text-#333333 ms-3">
                                        <div className="d-flex">
                                            <img class="w-44px h-44px rounded-50" src="https://data.lita.cool/user/759766/album/photo_20221031_164924_836_R97285.jpg?t=1667206164836" style={{ height: "44px" }} />
                                            <div className='flex'>
                                                <div className="d-flex items-center justify-content-between" style={{width: "880px"}}>
                                                    <div class=" text-16px text-#333333">Boo(爱云) 🧝🏻</div>
                                                    <div className='ps-10 flex justify-content-end'>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                    </div>
                                                </div>
                                                <div class="mt-5px text-12px text-#999999">7-18 22:20</div>
                                                <div class="text-16px text-#333333">Đánh hay vãi</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="d-flex items-center justify-content-between mt-3">
                                    <div class="text-20px font-bold text-#333333 ms-3">
                                        <div className="d-flex">
                                            <img class="w-44px h-44px rounded-50" src="https://data.lita.cool/user/759766/album/photo_20221031_164924_836_R97285.jpg?t=1667206164836" style={{ height: "44px" }} />
                                            <div className='flex'>
                                                <div className="d-flex items-center justify-content-between" style={{width: "880px"}}>
                                                    <div class=" text-16px text-#333333">Boo(爱云) 🧝🏻</div>
                                                    <div className='flex justify-content-end'>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                    </div>
                                                </div>
                                                <div class="mt-5px text-12px text-#999999">7-18 22:20</div>
                                                <div class="text-16px text-#333333">Đánh hay vãi</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="d-flex items-center justify-content-between mt-3">
                                    <div class="text-20px font-bold text-#333333 ms-3">
                                        <div className="d-flex">
                                            <img class="w-44px h-44px rounded-50" src="https://data.lita.cool/user/759766/album/photo_20221031_164924_836_R97285.jpg?t=1667206164836" style={{ height: "44px" }} />
                                            <div className='flex'>
                                                <div className="d-flex items-center justify-content-between">
                                                    <div class=" text-16px text-#333333">Boo(爱云) 🧝🏻</div>
                                                    <div className='flex justify-content-end'>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                        <img src={star} alt="eva" class=""></img>
                                                    </div>
                                                </div>
                                                <div class="mt-5px text-12px text-#999999">7-18 22:20</div>
                                                <div class="text-16px text-#333333">Đánh hay vãi</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
            <Footer />
        </>
    )
}

export default UserDetail