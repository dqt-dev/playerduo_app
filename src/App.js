import './styles/header.css';
import './App.css';
import {Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Test from './components/Test';
import LoginPage from './components/LoginPage';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/user/:userId" search element={<UserDetail/>} />
      {/* <Route path="/test" element={<Test/>} /> */}
    </Routes>
  );
}

export default App;
