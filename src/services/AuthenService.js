import http from "./http-common";
const Login = (loginRequest) => {
    return http.post("Authen/login", loginRequest);
  };

  const Register = (registerRequest) => {
    return http.post("Authen/register", registerRequest);
  }

  const ChangePassword = (request) => {
    return http.put("Authen/me/change-password", request);

  }
const AuthenService = {
    Login,
    Register,
    ChangePassword
};
export default AuthenService;