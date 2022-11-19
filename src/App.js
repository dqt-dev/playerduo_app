import "./styles/header.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";
import LoginPage from "./components/LoginPage";
import UserDetail from "./components/UserDetail";
import UserInfo from "./components/UserInfo";
import React, { useEffect } from "react";
import UserService from "./services/UserSerice";
import { USER_TOKEN } from "./common/SystemConstant";
import { useDispatch } from "react-redux";
import { getMyInfo } from "./redux/UserInfo/action";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
const url = [
  {
    url: '/user/orders',
    component: <UserInfo />,
    id: 1
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
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:userId" search element={<UserDetail />} />
      <Route path="/test" element={<Test />} />
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
  );
}

export default App;
