import http from "./http-common";
const getAll = data => {
    return http.post("Skills", data);
  };
  const getSkillById = skillId => {
    return http.get(`Skills/${skillId}`);
  };
  const registerSkill = data => {
    return http.post(`Skills/me`, data);
  };
  const updateSkill = (skillId, data) => {
    return http.put(`Skills/${skillId}`, data);
  };
const SkillService = {
  getAll,
  getSkillById,
  registerSkill,
  updateSkill
};
export default SkillService;