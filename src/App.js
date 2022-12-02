import "./styles/header.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";
import LoginPage from "./components/LoginPage";
import UserDetail from "./components/UserDetail";
import UserComponent from "./components/UserComponent";
import React from "react";
import UserService from "./services/UserSerice";
import { USER_TOKEN } from "./common/SystemConstant";
import { useDispatch } from "react-redux";
import { getMyInfo } from "./redux/UserInfo/action";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./components/Checkout";
import UsersByCategory from "./components/UsersByCategory";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import LoginGuard from "./components/LoginGuard/LoginGuard";
import PaypalSuccess from "./components/PaypalSuccess";
import ChangePassword from "./components/ChangePassword";
const url = [
  {
    url: '/user/orders',
    component: <UserComponent type={3} />,
    id: 1
  },
  {
    url: '/user/skills',
    component: <UserComponent type={4} />,
    id: 3
  },
  {
    url: '/user/wallet',
    component: <UserComponent type={2} />,
    id: 2
  },
  {
    url: '/user/me',
    component: <UserComponent type ={1}/>,
    id: 4
  },
  {
    url: '/user/change-password',
    component: <ChangePassword type={5} />,
    id: 5
  },
]
const urlLoginGuard = [
  {
    url: '/register',
    component: <RegisterPage/>,
    id: 1
  },
  {
    url: '/login',
    component: <LoginPage/>,
    id: 2
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
    <PayPalScriptProvider options={{ "client-id": "AYoWdX_c-b3hsale2IsHdAp9DRYujZqsaSuj7s7Q5tB4eLOv5-mpcNttdzPKFCCTFbs5ia5CbZwNgYVe" }}>
      <ToastContainer/>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      {urlLoginGuard.map(item => {
        return <Route
        path={item.url}
        key={item.id}
        element={
          <LoginGuard>
            {item.component}
          </LoginGuard>
        }
      />
      })}
      <Route path="/user/:userId" search element={<UserDetail/>} />
      <Route path="/test" element={<Test />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/skill/:categoryId" search element={<UsersByCategory/>} />
      <Route path="/payment/success" search element={<PaypalSuccess/>} />
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
