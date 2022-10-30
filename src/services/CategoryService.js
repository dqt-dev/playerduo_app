import http from "../http-common";
const getAll = () => {
  return http.get("category");
};
const TCategoryService = {
  getAll
};
export default TCategoryService;