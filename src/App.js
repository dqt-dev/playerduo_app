import './styles/header.css';
import './App.css';
import Header from './components/Header';
import SiderBar from './components/SiderBar';
import Content from './components/Content';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react'
import CategoryService from "./services/CategoryService";
import SkillService from './services/SkillService';

function App() {
  const [categories, setCategories] = useState([])

  const [skill, setSkill] = useState([])

  const [requestSkill, setRequestSkill] = useState({})

  // chỉ thực thi khi render lần đầu tiên
  useEffect(() => {
    retrieveCategories();
    retrieveSkills();
  }, []);
  // truy vấn đến database, gọi hàm get all đế lấy ra tất cả các record 
  const retrieveCategories = () => {
    CategoryService.getAll()
      .then(response => {
        setCategories(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // gọi tới api create
  const retrieveSkills = () => {
    SkillService.getAll(requestSkill)
      .then(response => { // get các field được nhập vào 
        setRequestSkill({
        })
        
        setSkill(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <>
      <Header/>
      <div className='main'>
        <SiderBar/>
        <Content categories = {categories} skill = {skill}/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
