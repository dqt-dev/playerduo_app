import http from "./http-common";
const Login = (loginRequest) => {
    return http.post("Authen/login", loginRequest);
  };
const AuthenService = {
    Login
};
export default AuthenService;