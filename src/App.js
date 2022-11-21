import "./styles/header.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";
import LoginPage from "./components/LoginPage";
import UserDetail from "./components/UserDetail";
import UserInfo from "./components/UserInfo";
import SkillUser from "./components/SkillUser";
import React, { useEffect } from "react";
import UserService from "./services/UserSerice";
import { USER_TOKEN } from "./common/SystemConstant";
import { useDispatch } from "react-redux";
import { getMyInfo } from "./redux/UserInfo/action";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./components/Checkout";
const url = [
  {
    url: '/user/orders',
    component: <UserInfo type ={3}/>,
    id: 1
  },
  {
    url: '/user/skills',
    component: <UserInfo type ={4}/>,
    id: 2
  },
  {
    url: '/user/wallet',
    component: <UserInfo type ={2}/>,
    id: 3
  }
]
function App() {
  const dispatch = useDispatch();
  (async () => {
    const token = localStorage.getItem(USER_TOKEN);
    if (!token) {
      return;
    }
    try {
      const user = await UserService.getMyInfo();
      if (user.data) {
        dispatch(getMyInfo(user.data));
      }
    } catch (error) {
      dispatch(getMyInfo(null));
    }
  })();

  return (
    <PayPalScriptProvider options={{"client-id" : "AZ4c0ODM7QpQJAjznnMsFrIY9yEDnPTJuOGJgq0_YgFyYXJ2tcYn8Won2gjJ6GxiBVe0Vf0r--5AGst0"}}>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:userId" search element={<UserDetail/>} />
      <Route path="/test" element={<Test />} />
      <Route path="/checkout" element={<Checkout />} />
      {url.map(item => {
        return   <Route
        path={item.url}
        key={item.id}
        element={
          <PrivateRoute>
            {item.component}
          </PrivateRoute>
        }
      />
      })}

    </Routes>
    </PayPalScriptProvider>
  );
}

export default App;
