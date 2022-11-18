import http from "../http-common";
const getAll = () => {
  return http.get("category");
};
const CategoryService = {
  getAll
};
export default CategoryService;