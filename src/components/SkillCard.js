import { Howl, Howler } from 'howler';
import React, { useState, useEffect } from 'react'
import '../styles/skillcard.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import star from '../star.png'
import coin from '../coin.png'
import { useNavigate } from 'react-router-dom';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            className={className + " button-arrow me-4"}
            style={{ background: "rgb(157, 148, 147)", height: "70px", width: "40px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            className={className + " button-arrow ms-4"}
            style={{ background: "rgb(157, 148, 147)", height: "70px", width: "40px" }}
            onClick={onClick}
        >
        </button>
    );
}

function SkillCard(props) {
    const navigate = useNavigate();

const goToUserPage = (userId, skillId) =>
{
    navigate("user/"+ userId + "?skillId=" + skillId)
}

    const { data, categoryName, isPlay, setIsPlay } = props

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: data.length % 6,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const [sound, setSound] = useState(null)

    const soundPlay = (src, skillId) => {
        Howler.stop();
        const sound = new Howl({ src })
        setSound(sound);
        setIsPlay(skillId)
        setTimeout(() => {
            sound.play();
            //setIsPlay(0)
        }, 1000);


    }

    const stopSound = () => {
        sound.stop();
        setIsPlay(0)
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <h2>Đồng hành đề cử:  <a className="text-decoration-none category-title">{categoryName}</a></h2>
            {
                data.length > 0 ?
                    <Slider {...settings}>
                        {data.map((item, index) => {
                            return (
                                <div onClick={() => goToUserPage(item.userId, item.skillId)} key={index} className = "flex-row-reverse">
                                    <div className="card card-skill" style={{ width: "190px", height: "300px" }}>
                                        <div className="container-card">
                                            <img src={"https://localhost:7207" + item.avatarUrl} className="card-img-top avatar" alt="..." style={{ width: "189px" }} />
                                            {item.status ? <div className="div-online-1" style={{ background: "#31a24c", width: "13px", height: "13px", borderRadius: "50%" }}></div> : <></>}
                                            {isPlay !== item.skillId ? <img src="https://data.lita.cool/cdn-web/www/assets/player_audio_play_normal.eeb1a285.png" className="sound-icon" style={{ width: "30px" }}
                                                onClick={() => soundPlay("https://localhost:7207" + item.audioUrl, item.skillId)} /> :
                                                <img src="https://data.lita.cool/cdn-web/www/assets/player_audio_play.f3bcd3a1.gif" className="sound-icon" style={{ width: "30px" }}
                                                    onClick={() => stopSound()} />}
                                        </div>
                                        <div className="card-body" style={{ height: "70px", fontSize: "12px" }}>
                                            <p className="mb-1 card-text fw-bold fs-6" >{item.playerName}</p>
                                            <p className="d-flex align-items-center mb-2 card-text fw-bold" ><img style={{ height: "14px", width: "14px" }} src={star} /> {item.rating} | Đã phục vụ: {item.total}</p>
                                            <p className="d-flex align-items-center card-text fw-bold" >{item.price}<img style={{ height: "14px", width: "14px" }} src={coin} />/ Trận</p>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </Slider> 
                    : <h1>Hiện tại chưa có người đăng kí thể loại game này!</h1>
            }
            {/* <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            /> */}
        </div>
    )
}

export default SkillCard