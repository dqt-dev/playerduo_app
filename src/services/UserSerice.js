import http from "../http-common";
const get = (id) => {
    return http.get("Users/" + id);
  };
const UserService = {
    get
};
export default UserService;