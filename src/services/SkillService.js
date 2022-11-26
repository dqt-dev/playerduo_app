import http from "./http-common";
const getAll = data => {
    return http.post("Skills", data);
  };
  const getSkillById = skillId => {
    return http.get(`Skills/${skillId}`);
  };
const SkillService = {
  getAll,
  getSkillById
};
export default SkillService;