import axios from "axios";
//import authHeader from "../helper/auth_header";

import { API_URL } from "../settings";

class MessageService {
  getLatestInputmessages(util) {
    return axios
      .post(API_URL + "api/mc_chat/latestinputmessages", {
        user_id: util.user_id,
      })
      .then((response) => {
        return response.data;
      });
  }
  getMessagesBySubcriber(subcriber) {
    return axios
      .post(API_URL + "api/mc_chat/messagesbysubcriber", subcriber)
      .then((response) => {
        return response.data;
      });
  }
  readMessagesBySubcriber(subcriber) {
    return axios
      .post(API_URL + "api/mc_chat/readmessagesbysubcriber", subcriber)
      .then((response) => {
        return response.data;
      });
  }

  sendMessage(msg) {
    return axios.post(API_URL + "sendmessage", msg).then((response) => {
      return response.data;
    });
  }
  getAllStatus() {
    return axios
      .get(API_URL + "api/mc_chat/status")
      .then((response) => {
        return response.data;
      });
  }
  
}

export default new MessageService();
