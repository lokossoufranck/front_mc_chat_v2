import axios from "axios";
import { API_URL } from "../settings";

class DiscussionStatusService {
  create(status) {
    return axios
      .post(API_URL + "api/mc_chat/discussion_status", status)
      .then((response) => {
        return response.data;
      });
  }

  update(ds) {
    return axios
      .put(API_URL + "api/mc_chat/discussion_status/"+ ds.id, ds)
      .then((response) => {
        return response.data;
      });
  }
 
  getStatus(discussion_id) {
    return axios
      .get(API_URL + "api/mc_chat/last_discussion_status/"+discussion_id)
      .then((response) => {
        return response.data;
      });
  }
  
}

export default new DiscussionStatusService();
