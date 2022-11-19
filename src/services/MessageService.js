import http from "./http-common";
const getMessagesWithUserId = (id) => {
  return http.get("Messages?withUserId=" + id);
};

const getMyChats =  () => {
    return http.get("Messages/me/chat-users");
}
const MessageService = {
    getMessagesWithUserId,
    getMyChats,
};
export default MessageService;
