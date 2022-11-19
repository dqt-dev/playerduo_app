import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    if (!userInfo) {
      setIsLogin(false)
    }
  }, [userInfo]);
  return isLogin ? children : <Navigate to={"/login"}/>;
};

export default PrivateRoute;
