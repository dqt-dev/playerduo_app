import http from "./http-common";
const get = (id) => {
  return http.get("Users/" + id);
};

const getMyInfo = () => {
  return http.get("Users/me");
}

const UserService = {
  get,
  getMyInfo
};
export default UserService;
