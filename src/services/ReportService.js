import http from "./http-common";
const getReportTypes = data => {
    return http.post("Skills", data);
  };
  const createReport = skillId => {
    return http.get(`Skills/${skillId}`);
  };
const ReportService = {
    getReportTypes,
    createReport
};
export default ReportService;