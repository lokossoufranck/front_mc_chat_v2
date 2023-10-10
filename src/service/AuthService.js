import axios from "axios";
import { API_URL } from "../settings";
import authHeader from "../helper/auth_header";
//const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "api/mc_chat/auth/signin", {
        username: user.username,
        password: user.password,
      })
      .then(this.handleResponse)
      .then((response) => {
        if (response.data.token) {
          //Enregistrement de la réponse du serveur dans le local storage du navigateur
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout(user) {
    return axios.post(API_URL + 'api/mc_chat/auth/logout', user).then(response => {
      if (response.status == 200) {
        //Suppression de l'id du local storage du navigateur
        localStorage.removeItem('user');
        //  console.log('storage is clean');
      }
      return response.data;
    });

  }

  register(user) {
    return axios.post(API_URL + "api/mc_chat/auth/signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }

  updateUser(user) {
    return axios.put(API_URL + "api/mc_chat/user/" + user.id, user).then((response) => {
      return response;
    })
  }

  /* updateUserPassword(user) {
    return axios.put(API_URL + "api/mc_chat/userpassword"+ user.id,user).then((response) => {
      return response;
    })
  } */

  handleResponse(response) {
    if (response.status === 401) {
      this.logout();
      location.reload(true);

      const error = response.data && response.data.message;
      return Promise.reject(error);
    }

    return Promise.resolve(response);
  }

  all() {
    return axios.get(API_URL + "api/mc_chat/users", { headers: authHeader() });
  }

  finUser(user_id) {
    return axios.get(API_URL + "api/mc_chat/user/" + user_id, { headers: authHeader() });
  }







  getAllUsersBy(user) {
    return axios.post(API_URL + "api/mc_chat/usersby", { user_id: user.user_id });
  }

  getAllUsers() {
    return axios
      .get(API_URL + "api/mc_chat/auth/users")
      .then((response) => {
        return response.data;
      });
  }


}

export default new AuthService();
