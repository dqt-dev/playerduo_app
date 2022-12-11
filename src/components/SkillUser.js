import React, { useEffect, useRef, useState } from 'react'
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import SkillService from '../services/SkillService';

import '../styles/skilluser.css';

import ModalSkill from './ModalSkill';
import stop from '../stop.png'
import play from '../play.png'
import star from '../star.png'
import coin from '../coin.png'
import Loading from './Loading'
import { BASE_URL } from '../common/SystemConstant';
import { Howl, Howler } from 'howler';
import { AiOutlineInbox } from 'react-icons/ai';
import { getAudioDurationInSeconds } from '@remotion/media-utils';

function SkillUser() {

  // const initSkill = {
  //   categoryId: 0,
  //   skillId: null,
  //   categoryName: "",
  //   imageUrl: "",
  //   audioUrl: "",
  //   description: "",
  //   price: 0
  // };

  const userId = JSON.parse(localStorage.getItem('USER_INFO')).id

  const [skills, setSkills] = useState([]);

  const [skillTemps, setSkillTemps] = useState([]);

  const [skillDetail, setSkillDetail] = useState();

  const [loaded, setLoaded] = useState(false);

  const [isPlay, setIsPlay] = useState(0);

  const [sound, setSound] = useState(null);

  const [type, setType] = useState(true); // true: create | false: update

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

  const getSkills = userId => {

    setLoaded(true);
    SkillService.getAll(
      {
        userId: userId,
      }
    )
      .then(response => {
        setSkills(response.data);
        console.log(response.data);
        setLoaded(false);
      })
      .catch(e => {
        console.log(e);
        setLoaded(false);
      });
  };


  const getSkillTemps = () => {

    setLoaded(true);
    SkillService.getSkillTemp(
    )
      .then(response => {
        console.log(response.data);
        setSkillTemps(response.data);
        setLoaded(false);
      })
      .catch(e => {
        console.log(e);
        setLoaded(false);
      });
  };


  useEffect(() => {
    getSkills(userId);
    getSkillTemps();
  }, []);

  return (
    <div className='container ms-4'>
      <Loading loading={loaded} />
      <div className='pt-3 fw-bold'>
        <div className='text-20px mb-2 '>
          Quản lý kĩ năng cá nhân
        </div>
        <div>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalSkill" onClick={() => { setSkillDetail(); setType(true) }}>Tạo mới kỹ năng</button>
        </div>
        {/* <hr className='mt-1 mb-0' /> */}
        <div className='d-flex overflow-auto flex-wrap mt-3' style={{ height: "790px" }}>
          {skills && skills.length > 0 ? [...skills, ...skillTemps].map((skill, index) => {
            return (
              <div >
                <div key={index} className={skill?.isEnabled === true && skill?.isUpdated === false ? "card me-5 mb-4 position-relative" : "disable card me-5 mb-4 position-relative"}   >
                  <div className="text-body ps-2 pe-2 pb-3" data-bs-toggle="modal" data-bs-target="#exampleModalSkill" onClick={() => { setSkillDetail(skill); setType(false) }}>
                    <p className="card-text text-start mt-2 mb-1 fw-bold fs-4">{skill?.categoryName}</p>
                    <p className="d-flex align-items-center mb-1 card-text fw-bold fs-5" >{skill?.price}<img style={{ height: "24px", width: "24px" }} src={coin} />/ Trận</p>
                    <p className="d-flex align-items-center mb-2 card-text fw-bold fs-5" >Đánh giá:<img style={{ height: "20px", width: "20px" }} src={star} className="ms-2 me-2" /> {skill?.rating}  |  Đã phục vụ: {skill?.total}</p>
                    <hr />
                    <p className="card-text text-start mt-2 mb-1 fw-bold fs-4">Thông tin game</p>
                    <p className="align-items-center mb-1 card-text  text-truncate" style={{ width: "335px" }}>{skill?.description}</p>
                    <div className='mt-4'>
                      <img className="mt-3 rounded" src={BASE_URL + skill?.imageDetailUrl} style={{ height: "190px", width: "338px" }} />
                    </div>
                  </div>
                  <div className="d-flex flex-row items-center border rounded-2 position-absolute" zIndex='1' style={{ height: "24px", width: "60px", top: "48%", left: '9px' }}>
                    {isPlay === skill?.skillId ? <img src={stop} alt="stop" className="w-16px h-16px mt-1 ms-1 me-2 icon-play" onClick={() => stopSound()} /> :
                      <img src={play} alt="play" className="w-16px h-16px mt-1 ms-1 me-2 icon-play" onClick={() => soundPlay(BASE_URL + skill?.audioUrl, skill?.skillId)} />}
                    {/* <div>{Math.ceil(duration)}'</div> */}
                  </div>
                  {!skill?.isEnabled &&
                    <div className="position-absolute text-20px" style={{ color: "red", top: '10px', right: '9px', zIndex: 1, background: "white" }}>
                      Chờ kiểm duyệt...
                    </div>}
                  {skill?.isUpdated && skill?.isEnabled &&
                    <div className="position-absolute text-20px" style={{ color: "red", top: '10px', right: '9px', zIndex: 1, background: "white" }}>
                      Chờ cập nhập...
                    </div>}
                </div>
              </div>
            )
          }) :
            <div style={{ marginLeft: "45%" }}>
              <div className='d-flex justify-content-center'>
                <AiOutlineInbox size={70} />
              </div>
              <p className='text-center fw-bold align-items-center'>Không có dữ liệu</p>
            </div>
          }
        </div>
        < ModalSkill skillBeforeUpdate={skills?.filter(skill => skill.skillId === skillDetail?.skillId)} skills={skills} skillDetail={skillDetail} setSkillDetail={setSkillDetail} type={type} getSkills={getSkills} getSkillTemps = {getSkillTemps}/>
      </div>
    </div>
  )
}

export default SkillUser
