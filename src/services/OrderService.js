import http from "./http-common";
const getReviewBySkillId = (skillId) => {
  return http.get("Orders/review/" + skillId);
};
const createNewOrder = (requestCreateOrder) => {
  return http.post("Orders/me", requestCreateOrder );
};
const getNewOrder = () => {
  return http.get("Orders/me");
};
const getOrdersManage = () => {
  return http.get("Orders/manage");
};
const putConfirmOrder = (orderId, order) => {
  return http.put(`Orders/${orderId}/confirm`, order)
}
const putCancelOrder = (orderId, order) => {
  return http.put(`Orders/${orderId}/cancel`, order)
}

const OrderService = {
    getReviewBySkillId,
    createNewOrder,
    getOrdersManage,
    putConfirmOrder,
    putCancelOrder,
    getNewOrder
};
export default OrderService;