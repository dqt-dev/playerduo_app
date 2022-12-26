import { Howl, Howler } from 'howler';
import React, { useState, useEffect } from 'react'
import '../styles/skillcard.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import star from '../star.png'
import coin from '../coin.png'
import { useNavigate } from 'react-router-dom';
import { AiOutlineInbox } from 'react-icons/ai';
import { BASE_URL } from '../common/SystemConstant';
import UserService from '../services/UserSerice';
import { toast } from 'react-toastify';
import SkillService from '../services/SkillService';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            className={className + " button-arrow me-3"}
            style={{ background: "rgb(157, 148, 147)", height: "70px", width: "40px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            className={className + " button-arrow ms-3"}
            style={{ background: "rgb(157, 148, 147)", height: "70px", width: "40px" }}
            onClick={onClick}
        >
        </button>
    );
}

function SkillCard(props) {
    const navigate = useNavigate();

    const { data, categoryName, isPlay, setIsPlay, categoryId, retrieveSkills } = props

    const goToUserPage = (userId, skillId) => {
        UserService.get(userId)
            .then(response => {
                if (!response?.data?.isEnabled) {
                    toast.error("Người dùng này đã bị vô hiệu hóa!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    return;
                }
            })
            .catch(e => {
                console.log(e);
            });
        SkillService.getSkillById(skillId)
            .then(response => {
                if (!response?.data?.isEnabled) {
                    toast.error("Kỹ năng này đã bị vô hiệu hóa!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate("/");
                    return;
                }
            })
            .catch(e => {
                console.log(e);
            });
        navigate("user/" + userId + "?skillId=" + skillId)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        variableWidth: true,
        infinite: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const [sound, setSound] = useState(null)

    const stopSound = () => {
        setIsPlay(0);
        sound && sound.stop();
    }

    const soundPlay = (src, skillId) => {
        Howler.stop();
        const sound = new Howl({ src })
        setSound(sound);
        setIsPlay(skillId)
        sound.play();
        sound.on('end', () => {
            stopSound();
        });
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <h2>Đồng hành đề cử:  <a onClick={() => navigate(`skill/${categoryId}`)} className="text-decoration-none category-title">{categoryName}</a></h2>
            {
                data.length > 0 ?
                    <Slider {...settings}>
                        {data.map((item, index) => {
                            return (
                                <div key={index} className="card-skill-main">
                                    <div className="card card-skill" style={{ width: "190px", height: "300px" }}>
                                        <div className="container-card">
                                            <img onClick={() => goToUserPage(item.userId, item.skillId)} src={BASE_URL + item.avatarUrl} className="card-img-top avatar" alt="..." style={{ width: "189px", height: "189px" }} />
                                            {item.status ? <div className="div-online-1" style={{ background: "#31a24c", width: "13px", height: "13px", borderRadius: "50%" }}></div> :
                                                <div className="div-online-1" style={{ background: "red", width: "13px", height: "13px", borderRadius: "50%" }}></div>}
                                            {isPlay !== item.skillId ? <img src="https://data.lita.cool/cdn-web/www/assets/player_audio_play_normal.eeb1a285.png" className="sound-icon" style={{ width: "30px" }}
                                                onClick={() => soundPlay(BASE_URL + item.audioUrl, item.skillId)} /> :
                                                <img src="https://data.lita.cool/cdn-web/www/assets/player_audio_play.f3bcd3a1.gif" className="sound-icon" style={{ width: "30px" }}
                                                    onClick={() => stopSound()} />}
                                        </div>
                                        <div onClick={() => goToUserPage(item.userId, item.skillId)} className="card-body" style={{ height: "70px", fontSize: "12px" }}>
                                            <p className="mb-1 card-text fw-bold fs-6 text-truncate" >{item.playerName}</p>
                                            <p className="d-flex align-items-center mb-2 card-text fw-bold" ><img style={{ height: "14px", width: "14px" }} src={star} /> {item.rating} | Đã phục vụ: {item.total}</p>
                                            <p className="d-flex align-items-center card-text fw-bold" >{item.price}<img style={{ height: "14px", width: "14px" }} src={coin} />/ Trận</p>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </Slider>
                    : <div>
                        <div className='d-flex justify-content-center'>
                            <AiOutlineInbox size={70} />
                        </div>
                        <p className='text-center fw-bold'>Hiện chưa có người đăng ký</p>
                    </div>
            }
        </div>
    )
}

export default SkillCard