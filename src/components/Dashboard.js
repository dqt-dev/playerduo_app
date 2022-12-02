import React, { useState, useEffect } from 'react'
import CategoryService from "../services/CategoryService";
import SkillService from '../services/SkillService';
import Header from '../layout/Header';
import SiderBar from '../layout/SiderBar';
import Content from '../components/Content';
import Footer from '../layout/Footer';

import { useNavigate } from 'react-router-dom';
import Chat from './ChatListComponent';
import Loading from './Loading';
import ChatList from './ChatListComponent';

function Dashboard() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");

  const [loaded, setLoaded] = useState(false);

  const [categories, setCategories] = useState([]);

  const [skill, setSkill] = useState([]);

  const [isShowChat, setIsShowChat] = useState(false);

  const handleClickChatList = () => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      navigate('/login');
    }
    setIsShowChat(!isShowChat);
  }

  // chỉ thực thi khi render lần đầu tiên
  useEffect(() => {
    retrieveCategories();
    retrieveSkills();
  }, []);
  // truy vấn đến database, gọi hàm get all đế lấy ra tất cả các record 
  const retrieveCategories = () => {
    setLoaded(true);
    CategoryService.getAll()
      .then(response => {
        setLoaded(false);
        setCategories(response.data);
      })
      .catch(e => {
        setLoaded(false);
        console.log(e);
      });
  };

  // gọi tới api create
  const retrieveSkills = () => {
    SkillService.getAll({ "isEnabled": true })
      .then(response => { // get các field được nhập vào 
        setSkill(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <>
     <Loading loading={loaded} />
      <Header handleClickChatList = {handleClickChatList} currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
      <ChatList isShowChat={isShowChat} setIsShowChat={setIsShowChat} />
      <div className='main'>
        <SiderBar />
        <Content categories={categories} skill={skill} />
      </div>
      <Footer />
    </>
  )
}


export default Dashboard
