import axios from "axios";

import { API_URL } from "../settings";
// Principalement dédié à la gestion du reporting
class DiscussionService {
  getClosedDiscussions(periode) {
    //la période est un objet ayant la structure {datedebut,datefin}
    return axios
      .post(API_URL + "api/mc_chat/closediscussions", periode)
      .then((response) => {
        return response.data;
      });
  }
  getClosedDiscussionsByUser(periode) {
    //la période est un objet ayant la structure {datedebut,datefin,user_id}
    return axios
      .post(API_URL + "api/mc_chat/closediscussionsbyuser", periode)
      .then((response) => {
        return response.data;
      });
  }

  getReportGroupByNumber(periode) {
    //la période est un objet ayant la structure {datedebut,datefin,user_id}
    return axios
      .post(API_URL + "api/mc_chat/getreportgroupbynumber", periode)
      .then((response) => {
        return response.data;
      });
  }



  getReportGroupByQualification(periode) {
    //la période est un objet ayant la structure {datedebut,datefin,user_id}
    return axios
      .post(API_URL + "api/mc_chat/getreportgroupbyqualification", periode)
      .then((response) => {
        return response.data;
      });
  }
  
  
  updateDiscussion(discussion) {
    return axios.put(API_URL + "api/mc_chat/discussion/" + discussion.id, discussion).then((response) => {
      return response;
    })
  }
  
  
  
  
}

export default new DiscussionService();
