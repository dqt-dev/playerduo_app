import React from 'react'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import '../styles/userdetail.css';
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { AiOutlineInbox } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';

import star from '../star.png'
import coin from '../coin.png'
import icon from '../icon.png'
import stop from '../stop.png'
import play from '../play.png'
import { useState } from 'react';
import UserService from '../services/UserSerice';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SkillService from '../services/SkillService';
import { Howl, Howler } from 'howler';
import OrderService from '../services/OrderService';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import OrderForm from './OrderForm';
import { BASE_URL } from '../common/SystemConstant';
import { handleConvertDate } from '../common/ultil';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from './ChatListComponent';
import { getMyInfo } from '../redux/UserInfo/action';
import ReportModal from './ReportModal';

function UserDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initSkill = {
        skillId: null,
        categoryName: "",
        imageUrl: ""
    };

    const initUserInfo = {
        id: null,
        avatarUrl: "",
        nickName: "",
        status: false
    };

    const reviewTemplate = {
        id: null,
        avatarUrl: "",
        nickName: "",
        comment: "",
        rating: 0,
        createdAt: "",
    }

    const [loaded, setLoaded] = useState(false);

    const { userId } = useParams(); // get userId from Url

    const [userChatId, setUserChatId] = useState(userId);

    const [searchParam] = useSearchParams(0);  // set skillId from Url
    const [skillId, setSkillId] = useState(searchParam.get('skillId'));

    const [isPlay, setIsPlay] = useState(0); // set play or stop

    const [skills, setSkills] = useState([initSkill]); // skills for render 

    const [currentSkill, setCurrentSkill] = useState(initSkill); // current skill 

    const [sound, setSound] = useState(null);

    const [duration, setDuration] = useState(0);

    const [reviews, setReviews] = useState([reviewTemplate]);

    const [isShowChat, setIsShowChat] = useState(false);

    const [quality, setQuality] = useState(1);

    const [user, setUser] = useState(initUserInfo);

    const currentUser = useSelector(state => state.userInfoReducer.userInfo);

    const [userVoice, setUserVoice] = useState(false);

    const stopSound = () => {
        setIsPlay(0);
        setUserVoice(false); // stop user voice if click user voice
        if (sound) sound.stop();
    }

    const myFunction = (data) => getAudioDurationInSeconds(BASE_URL + data.audioUrl).then((duration) => {
        setDuration(duration)
    });

    const handleChat = () => {
        const token = localStorage.getItem('user-token');
        if (!token) {
            navigate('/login');
        }
        setUserChatId(userId)
        !isShowChat && setIsShowChat(!isShowChat);
    }

    const soundPlay = (src, skillId, userVoice) => {
        Howler.stop();
        const sound = new Howl({ src })
        setSound(sound);
        skillId !== null && setIsPlay(skillId)
        setUserVoice(userVoice);
        sound.play();
        sound.on('end', () => {
            stopSound();
        });

    }

    const handleOrder = (skillId, quality) => {
        if (quality < 1) {
            toast.error("Số lượng ít nhất là 1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if(currentUser?.isEnabled === false)
        {
            toast.error("Bạn đã bị vô hiệu hóa tài khoản, vui lòng liên hệ Quản trị viên để giải quyết!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        const requestCreateOrder = {
            'skillId': skillId,
            'quality': quality
        }
        setLoaded(true);
        OrderService.createNewOrder(requestCreateOrder)
            .then(response => {
                setLoaded(false);
                dispatch(getMyInfo(response.data));
                toast.success("Đặt đơn hàng thành công, vui lòng chờ phản hồi!", {
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

    const getUserInfo = userId => {
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

    const changeSkill = skillId => {
        setSkillId(skillId);
        stopSound();
    }

    const getSkills = userId => {
        SkillService.getAll(
            {
                userId: userId,
                isEnabled: true
            }
        )
            .then(response => {
                setSkills(response.data);
                let temp = response.data.filter(skill => skill?.skillId == skillId);

                setCurrentSkill(...temp);
                myFunction(...temp)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getReviewBySkillId = skillId => {
        OrderService.getReviewBySkillId(skillId)
            .then(response => {
                setReviews(response.data.resultObj);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (userId, skillId) {
            const setup = async () => {
                await
                    getUserInfo(userId);
                getSkills(userId);
                getReviewBySkillId(skillId);
            };
            setup();
        }
    }, [skillId, userId]);

    const handleClickChatList = () => {
        const token = localStorage.getItem('user-token');
        if (!token) {
            navigate('/login');
        }
        setIsShowChat(!isShowChat);
    }

    // const handleCheck = () => { 
    //     const token = localStorage.getItem('user-token');
    //     if (!token) {
    //         navigate('/login');
    //     }
    // }

    return (
        <div>
            <Loading loading={loaded} />
            <Header handleClickChatList={handleClickChatList} />
            <ChatList isShowChat={isShowChat} setIsShowChat={setIsShowChat} userChatId={userChatId} setUserChatId={setUserChatId} />
            <ReportModal reportedUserId={userId} />
            <div className='container mt-3' style={{ position: "relative" }}>
                <div className='card main-info d-flex '>
                    <div className="mb-3 d-flex justify-content-between" style={{ height: "70px" }}>
                        <div className="d-flex ps-4">
                            <img src={BASE_URL + user.avatarUrl} style={{ width: "72px", height: "72px", borderRadius: "50%" }} className="mt-2" alt="..." />
                            {user.status ? <div className="div-online-2" style={{ background: "#31a24c", width: "13px", height: "13px", borderRadius: "50%" }}></div> :
                                <div className="div-online-2" style={{ background: "red", width: "13px", height: "13px", borderRadius: "50%" }}></div>}
                            <div className="pt-2 ps-3">
                                <div className="text-body">
                                    <div className='d-flex'>
                                        <p className="card-text text-start mt-2 mb-1 fw-bold">{user?.nickName}</p>
                                        <div className='mt-1'>
                                            {user?.gender ? <TbGenderMale color='blue' size={20}/> : <TbGenderFemale color='red' size={20}/>}
                                        </div>
                                    </div>
                                    <p className="card-text text-start fw-bold ">ID: {user?.id}</p>
                                </div>
                            </div>
                        </div>

                        <BsThreeDots size={20} className='mt-2 me-2' data-bs-toggle="modal" data-bs-target="#exampleModalReport" />
                    </div>
                </div>
                <div className="d-flex bd-highlight mt-3">
                    <div className='card' style={{ height: "800px", borderTopRightRadius: "18px", borderTopLeftRadius: "18px" }}>
                        <div className="flex position-relative" style={{ width: "324px" }}>
                            <img src={BASE_URL + user.avatarUrl} style={{ width: "324px", height: "324px", borderTopRightRadius: "18px", borderTopLeftRadius: "18px" }} className="" alt="..." />
                        </div>
                        {!userVoice ?
                            <img
                                src="https://data.lita.cool/cdn-web/www/assets/player_audio_play_normal.eeb1a285.png"
                                className="position-absolute"
                                style={{ width: "50px", right: "5px", top: "270px" }}
                                onClick={() => soundPlay(BASE_URL + user.audioUrl, null, true)}
                            /> :
                            <img
                                src="https://data.lita.cool/cdn-web/www/assets/player_audio_play.f3bcd3a1.gif"
                                className="position-absolute"
                                style={{ width: "50px", right: "5px", top: "270px" }}
                                onClick={() => stopSound()}
                            />}
                        <div>
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-2">Lý lịch</p>
                                <p className="card-text text-start fw-bold" style= {{width: "300px"}}>{user?.description !== null ? user?.description : "Chưa có thông tin mô tả..."}</p>
                            </div>
                        </div>

                    </div>
                    <div className='detail-skill-info ms-3'>
                        <div className="d-flex flex-wrap">
                            {skills.map((skill) => {
                                if (skill?.skillId == skillId)
                                    return (
                                        <div onClick={() => { changeSkill(skill?.skillId); myFunction(currentSkill?.audioUrl) }} className="text-center me-4 skill-index mb-3" key={skill?.skillId} style={{ position: "relative", height: "48px", width: "124px" }}>
                                            <div style={{ border: "solid #1890ff", width: "130px", borderRadius: "10px" }}>
                                                <img src={BASE_URL + skill?.imageSmallUrl} style={{ height: "48px", width: "124px" }} />
                                                <div className='category-name-div fw-bold fs-10px ms-1'>{skill?.categoryName}</div>
                                            </div>
                                        </div>
                                    )
                                return (
                                    <div onClick={() => { changeSkill(skill?.skillId); myFunction(currentSkill?.audioUrl) }} className="text-center me-4 mt-1 skill-index mb-3" key={skill?.skillId} style={{ position: "relative", height: "48px", width: "124px" }}>
                                        <img src={BASE_URL + skill?.imageSmallUrl} style={{ height: "48px", width: "124px" }} />
                                        <div className='category-name-div fw-bold fs-10px'>{skill?.categoryName}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="card skill-info-of-user mt-3">
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-2">{currentSkill?.categoryName}</p>
                                <p className="d-flex align-items-center mb-1 card-text fw-bold fs-4" >{currentSkill?.price}<img style={{ height: "24px", width: "24px" }} src={coin} />/ Trận</p>
                                <p className="d-flex align-items-center mb-2 card-text fw-bold fs-4" >Đánh giá:<img style={{ height: "20px", width: "20px" }} src={star} className="ms-2 me-2" /> {currentSkill?.rating}  |  Đã phục vụ: {currentSkill?.total}</p>
                                <button  type="button" className="btn btn-lg btn-order ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={userId == currentUser?.id  || currentUser === null} >
                                    Đặt đơn
                                </button>
                                <button type="button" onClick={handleChat} className="btn btn-lg btn-chat ms-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" disabled={userId == currentUser?.id  || currentUser === null} ><img src={icon} />Chat</button>

                                <OrderForm user={user} currentSkill={currentSkill} quality={quality} setQuality={setQuality} handleOrder={handleOrder} />
                            </div>
                        </div>
                        <div className="card skill-info mt-3 mb-2">
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-3">Thông tin game</p>
                                <p className="align-items-center mb-1 card-text fs-5" >{currentSkill?.description}</p>
                                <div className="d-flex flex-row items-center px-4px border rounded-2" style={{ height: "24px", width: "60px" }}>
                                    {isPlay === currentSkill?.skillId ? <img src={stop} alt="stop" className="w-16px h-16px mt-1 ms-1 me-2" onClick={() => stopSound()} /> :
                                        <img src={play} alt="play" className="w-16px h-16px mt-1 ms-1 me-2" onClick={() => soundPlay(BASE_URL + currentSkill?.audioUrl, currentSkill?.skillId)} />}
                                    <div>{Math.ceil(duration)}'</div>
                                </div>
                                <div>
                                    <img className="mt-3" src={BASE_URL + currentSkill?.imageDetailUrl} style={{ height: "190px", width: "338px" }} />
                                </div>
                            </div>
                            <div className='pb-3'>
                                <div className="d-flex items-center justify-content-between mt-3">
                                    <div className="text-20px font-bold text-#333333 ms-3">Đánh Giá Của Người Dùng ({reviews.length})</div>
                                    <div className="d-flex me-3">
                                        <img src={star} alt="rating" className="mt-1 w-24px h-24px" />
                                        <div className=" text-20px font-bold text-#333333 ms-1">{currentSkill?.rating}/5</div>
                                    </div>
                                </div>
                                {reviews.length > 0 ? reviews.map((review, index) => {
                                    const starArray = [...Array(review.rating).keys()].map(i => i + 1);
                                    return (
                                        <div key={index} className="d-flex items-center justify-content-between mt-3">
                                            <div className="text-20px font-bold text-#333333 ms-3">
                                                <div className="d-flex">
                                                    <img className="w-44px h-44px rounded-50 mt-1" src={BASE_URL + review.avatarUrl} style={{ height: "44px" }} />
                                                    <div className='flex ms-2'>
                                                        <div className="d-flex items-center justify-content-between" style={{ width: "870px" }}>
                                                            <div className=""> {review.nickName}</div>
                                                            <div className='ps-10 flex justify-content-end'>
                                                                {starArray.map(i => <img key={i} src={star} alt="eva" className=""></img>)}
                                                            </div>
                                                        </div>
                                                        <div className="mt-5px text-16px text-#999999">{review.updatedAt && handleConvertDate(review.updatedAt)}</div>
                                                        <div className="text-16px text-#333333">{review.comment}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                    <div>
                                        <div className='d-flex justify-content-center'>
                                            <AiOutlineInbox size={70} />
                                        </div>
                                        <p className='text-center fw-bold'>Chưa có dữ liệu đánh giá</p>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserDetail