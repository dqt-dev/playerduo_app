import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import { toast, ToastContainer } from 'react-toastify';
import SkillService from '../services/SkillService';

import ModalSkill from './ModalSkill';

import star from '../star.png'
import coin from '../coin.png'

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

  const getSkills = userId => {
    SkillService.getAll(
      {
        userId: userId,
      }
    )
      .then(response => {
        console.log("Okee:", response);
        setSkills(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const opendModalSkill = () => {

  }

  useEffect(() => {
    getSkills(userId);

  }, []);

  return (
    <div className='container'>
      <div className='pt-3 fw-bold container-fluid'>
        <div className=' mb-2'>
          Skill
        </div>
        <hr className='mt-1 mb-0' />
        <div className='list-order overflow-auto '>
          {skills && skills.map((skill, index) => {
            return (
              <div key={index} className="card mt-3" data-bs-toggle="modal" data-bs-target="#exampleModalSkill" onClick={() => setSkillDetail(skill)}>
                <div className="text-body ms-2">
                  <p className="card-text text-start mt-2 mb-1 fw-bold fs-4">{skill.categoryName}</p>
                  <p className="d-flex align-items-center mb-1 card-text fw-bold fs-5" >{skill.price}<img style={{ height: "24px", width: "24px" }} src={coin} />/ Trận</p>
                  <p className="d-flex align-items-center mb-2 card-text fw-bold fs-5" >Đánh giá:<img style={{ height: "20px", width: "20px" }} src={star} className="ms-2 me-2" /> {skill.rating}  |  Đã phục vụ: {skill.total}</p>
                </div>
              </div>
            )
          })}
        </div>
        < ModalSkill skillDetail={skillDetail}/>
      </div>
    </div>
  )
}

export default SkillUser
