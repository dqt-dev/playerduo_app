import http from "../http-common";
const getReviewBySkillId = (skillId) => {
  return http.get("Orders/review/" + skillId);
};
const createNewOrder = (requestCreateOrder) => {
  return http.post("Orders/me", requestCreateOrder );
};
const OrderService = {
    getReviewBySkillId,
    createNewOrder
};
export default OrderService;