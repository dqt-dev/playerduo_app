import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import '../styles/userbycategory.css';
import SkillService from '../services/SkillService';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../common/SystemConstant';
import CategoryService from '../services/CategoryService';
import { Howl, Howler } from 'howler';
import { AiOutlineInbox } from 'react-icons/ai';

function UsersByCategory() {

    const navigate = useNavigate();

    const { categoryId } = useParams(); // get skillId from url

    const [skill, setSkill] = useState(
        {
            categoryName: '',
            imageUrl: ''
        }
    );

    const [cond1, setCond1] = useState('');

    const [cond2, setCond2] = useState('');

    const [listUser, setListUser] = useState([]);

    const [isPlay, setIsPlay] = useState(0);

    const [sound, setSound] = useState(null);

    const stopSound = () => {
        setIsPlay(0);
        if (sound) sound.stop();
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

    const handleReset = () => {
        setCond1('');
        setCond2('');
    };

    // find skill from category
    const getSkill = categoryId => {
        CategoryService.getAll()
            .then(response => {
                setSkill(response.data[categoryId - 1])
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getUserByCategory = (categoryId) => {
        SkillService.getAll({ "isEnabled": true })
            .then(response => {
                let listUser = response.data.filter(s => s.categoryId == categoryId);
                setListUser(listUser);
            })
            .catch(e => {
                console.log(e);
            });
    }

    // call onlye only one when contructor is called
    useEffect(() => {
        getSkill(categoryId);
    }, []);

    // call when filter is change
    useEffect(() => {
        getUserByCategory(categoryId);
    }, [cond1]);

    const goToUserPage = (userId, skillId) => {
        navigate("user/" + userId + "?skillId=" + skillId)
    }

    return (
        <>
            <Header />
            <div>
                <div className='gameName'>
                    <div >
                        <img style={{ width: "44px", height: "44px" }} src={BASE_URL + skill.imageUrl}></img>
                    </div>
                    <div className='text-24'>
                        {skill.categoryName}
                    </div>
                </div>
                <div className='userFill'>
                    <div style={{ color: "#999999" }}>
                        Lọc:
                    </div>
                    <div className='ms-3 me-3'>
                        <select value={cond1} onChange={(e) => setCond1(e.target.value)} class={cond1 === '' ? "form-select form-select-sm " : "form-select form-select-sm selected"} style={{ maxWidth: "150px" }} >
                            <option selected value="">Đề cử</option>
                            <option value="1">Mới nhất</option>
                            <option value="2">Đánh giá cao nhất</option>
                            <option value="3">Giá cao nhất</option>
                            <option value="4">Giá thấp nhất</option>
                        </select>
                    </div>
                    <div style={{ width: "3px", height: "24px", backgroundColor: "#E5E5E5", borderRadius: "2px" }}>

                    </div>
                    <div className='ms-3 me-3'>
                        <select value={cond2} onChange={(e) => setCond2(e.target.value)} class={cond2 === '' ? "form-select form-select-sm " : "form-select form-select-sm selected"} >
                            <option value="">Giới tính</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                        </select>
                    </div>

                    <div onClick={handleReset} className='ms-4 user-select-none btn-reset ' style={{ fontSize: "20px", color: "#6B39FF" }}>Reset</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "18px", paddingLeft: "40px", paddingRight: "40px" }}>
                    {listUser.length > 0 ? listUser.map((skill, index) => {
                        return (
                            <div key={index} className='towUser-inline' style={{}}>
                                <a style={{ display: "flex" }}>
                                    <div className='img-stateIcon-voiceIcon' style={{ width: "200px", height: "200px" }}>
                                        <div>
                                            <img className='imgUser' src={BASE_URL + skill.avatarUrl}>

                                            </img>
                                        </div>
                                        <div className={skill.status ? "onlineStatus" : "offlineStatus"}>
                                        </div>
                                        <div className='voiceIcon-time'>
                                            {isPlay !== skill.skillId ? <img src="https://data.lita.cool/cdn-web/www/assets/player_audio_play_normal.eeb1a285.png" className="sound-icon" style={{ width: "30px" }}
                                                onClick={() => soundPlay(BASE_URL + skill.audioUrl, skill.skillId)} /> :
                                                <img src="https://data.lita.cool/cdn-web/www/assets/player_audio_play.f3bcd3a1.gif" className="sound-icon" style={{ width: "30px" }}
                                                    onClick={() => stopSound()} />}
                                        </div>
                                    </div>
                                    <div className='infoUser'>
                                        <div className='display-flex1'>
                                            <div style={{ fontWeight: "700", fontSize: "18px", width: "100%" }}>
                                                {skill.playerName}
                                            </div>
                                            <div style={{ width: "auto" }}>
                                            </div>
                                            <img style={{ width: "14px", height: "14px", display: "block", objectFit: "cover", maxWidth: "100%", marginTop: "auto", marginBottom: "auto", }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAtFJREFUSEulVE1IVFEU/s4oKEHUoo39QKGTQeQfKFaLFlGQFARBCC1CmXEEscCCNi1mEa1DCZoCyUWI/bqqKC2VrMhVUEGEjVOmtonchPDuPSfu873nnTfTc6C7eT/33PN95zvfuYQSV7ZbdsofjIpGBZfjeHyIZks5SqUEmZivHfKMFY6IBiB4Hh+mo6WcLQkgm5BWdvBGGDAA5kmC/fERerseSGkAnfKYFY6xYc+A93xSe5/a/hvgW1KalYN3hrUNYCohQUvtQ5qJAomsQO5K2dxTjLPGIV8aWyZhTO4px2G6R6a2oisPQNJSubSMamcFcWHUgnFKKzS7SS39XTANsOkFY0ZrPIgxPgvjy4YqzO66TSs+Gkm/VCzlcE002lhjhzDIlUN5Sf3k3reRyez7vbArM3vEEBF8Z4WXsUr00OIlOS0ORvxAN4GXxNbdfw/2/Bgr1q3KPi9I0c+LUqc13vvMAjksxgHbIlIF52wgT4FyoNXtwWKf9LDCABt5LAZ5rrGSh//nEVi1spGpt3GKrgdNXjgvSe0gIwIK62++3SThRnugAaByrSvMSDVO0i1DPs9F8z1yVhiDWiHmu8ZuatAHk9hIKJ6b1hrP0Oisn6ChwEVh8+a6JcUKN6yJdV1jN89lLGv//FgSdNeNU8bOWXTQcklZYI0q3+th54Qn2lTCGosNY7Q1TLgowFxC5lljW4FdveEqmIFViX7Uj9P2dQF+dcmmZY3fxViHLWxPuKlqYwybq8doOVKiuaQcEI3pf1kxrL99hZQBB/e9oNeRALmEdDEjU6BzyJLB1OYPn7HnzWiApPRrhV776jCaC7tXdsa8a4WUMFoC9p5NmTHQNEnnoiVKyCArdFilfyTgcs0wjdoHP52Qk8rBFWjsta6ZkaYpao8EyCalQRw8gmBFO7hasxt3KE3m/ixYkpbYh2mcEY0LzNgCoL1hgl7ZgX8B2qSUB/vv33EAAAAASUVORK5CYII='>
                                            </img>
                                            <div style={{ fontSize: "14px", color: "#333333", fontWeight: "700", textAlign: "center", marginLeft: "5px", paddingTop: "3px" }}>
                                                {skill.rating}
                                            </div>
                                            <div style={{ fontSize: "14px", color: "#999999", textAlign: "center", marginLeft: "3px", paddingTop: "3px" }}>
                                                {`(${skill.total})`}
                                            </div>
                                        </div>
                                        <div className='display-flex1' style={{ height: "20px", marginTop: "16px" }}>
                                            <img style={{ width: "20px", height: "20px" }} src='data:image/png;base64,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'>
                                            </img>
                                            <div style={{ position: "relative", bottom: "3px", marginLeft: "8px" }}>
                                                Level Rank
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "16px" }}>
                                            {skill.description}
                                        </div>

                                        <div style={{ display: "flex", position: "absolute", bottom: "10px" }}>
                                            <div >
                                                <img style={{ width: "20px", height: "20px" }} src='data:image/png;base64,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'></img>
                                            </div>
                                            <div style={{ color: "#FF9B00", fontSize: "18px", marginLeft: "4px" }}>
                                                {skill.price}
                                            </div>
                                            <div style={{ marginLeft: "2px" }}>
                                                /Trận
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    }) :
                        <div style={{marginLeft: "45%"}}>
                            <div className='d-flex justify-content-center'>
                                <AiOutlineInbox size={70} />
                            </div>
                            <p className='text-center fw-bold align-items-center'>Không có dữ liệu</p>
                        </div>}
                </div>
            </div>

        </>
    )
}

export default UsersByCategory