import http from "../http-common";
const getAll = data => {
    return http.post("Skills", data);
  };
const SkillService = {
  getAll
};
export default SkillService;