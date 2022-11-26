import http from "./http-common";
const get = (id) => {
  return http.get("Users/" + id);
};

const getMyInfo = () => {
  return http.get("Users/me");
}

const UpdateUserInfo = (data) => {
  return http.put("Users/me", data);
}

const UserService = {
  get,
  getMyInfo,
  UpdateUserInfo
};
export default UserService;
