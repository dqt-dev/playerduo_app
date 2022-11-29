import React, { useEffect, useState } from 'react'
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

function SkillUser() {

  const initSkill = {
    skillId: null,
    categoryName: "",
    imageUrl: "",
    audioUrl: "",
    description: "",
    price: "",
  };

  const userId = JSON.parse(localStorage.getItem('USER_INFO')).id

  const [skills, setSkills] = useState([initSkill]);

  const [skillDetail, setSkillDetail] = useState(initSkill);

  const [loaded, setLoaded] = useState(false);

  const [isPlay, setIsPlay] = useState(0);

  const [sound, setSound] = useState(null);

  const stopSound = () => {
    setIsPlay(0);
    if (sound) sound.stop();

}

const [duration, setDuration] = useState(0);

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
        setLoaded(false);
      })
      .catch(e => {
        console.log(e);
        setLoaded(false);
      });
  };

  const opendModalSkill = () => {

  }

  useEffect(() => {
    getSkills(userId);

  }, []);

  return (
    <div className='container'>
      <Loading loading={loaded} />
      <div className='pt-3 fw-bold container-fluid'>
        <div className=' mb-2'>
          Skill
        </div>
        <div>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalSkill" onClick={() => setSkillDetail(initSkill)}>Add New</button>
        </div>
        <hr className='mt-1 mb-0' />
        <div className='d-flex overflow-auto '>
          {skills && skills.map((skill, index) => {
            return (
              <div key={index} className="card mt-3" data-bs-toggle="modal" data-bs-target="#exampleModalSkill" onClick={() => setSkillDetail(skill)}>
                <div className="text-body ps-2 pe-2 pb-3">
                  <p className="card-text text-start mt-2 mb-1 fw-bold fs-4">{skill.categoryName}</p>
                  <p className="d-flex align-items-center mb-1 card-text fw-bold fs-5" >{skill.price}<img style={{ height: "24px", width: "24px" }} src={coin} />/ Trận</p>
                  <p className="d-flex align-items-center mb-2 card-text fw-bold fs-5" >Đánh giá:<img style={{ height: "20px", width: "20px" }} src={star} className="ms-2 me-2" /> {skill.rating}  |  Đã phục vụ: {skill.total}</p>
                  <hr />
                  <p className="card-text text-start mt-2 mb-1 fw-bold fs-4">Thông tin game</p>
                  <p className="align-items-center mb-1 card-text fs-5" >{skill.description}</p>
                  <div className="d-flex flex-row items-center px-4px border rounded-2" style={{ height: "24px", width: "60px" }}>
                    {isPlay === skill.skillId ? <img src={stop} alt="stop" className="w-16px h-16px mt-1 ms-1 me-2 icon-play" onClick={() => stopSound()} /> :
                      <img src={play} alt="play" className="w-16px h-16px mt-1 ms-1 me-2 icon-play" onClick={() => soundPlay(BASE_URL + skill.audioUrl, skill.skillId)} />}
                    <div>{Math.ceil(duration)}'</div>
                  </div>
                  <div>
                    <img className="mt-3 rounded" src={BASE_URL + skill.imageDetailUrl} style={{ height: "190px", width: "338px" }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        < ModalSkill skillDetail={skillDetail} setSkillDetail={setSkillDetail} title={"Update Skill"} />
      </div>
    </div>
  )
}

export default SkillUser
