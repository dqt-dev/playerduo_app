import http from "./http-common";
const getReportTypes = () => {
    return http.get("Reports/type");
  };
  const createReport = request => {
    return http.post(`Reports`, request);
  };
const ReportService = {
    getReportTypes,
    createReport
};
export default ReportService;