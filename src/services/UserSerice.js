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

const getTradesHistory = () => {
  return http.get("Users/me/tradehistory");
}

const Payment = (data) => {
  return http.put("Users/me/payment", data);
}

const UpdateStatus = (status) => {
  return http.put(`Users/status?isStatus=${status}`);
}


const UserService = {
  get,
  getMyInfo,
  UpdateUserInfo,
  getTradesHistory,
  Payment,
  UpdateStatus
};
export default UserService;
