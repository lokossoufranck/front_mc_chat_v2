import { API_URL, AllUsers } from '../settings';
import axios from 'axios';
export default class UserService {

    getAllUsers() {
        return axios.get(API_URL + AllUsers).then(response => response.data);
    }
  
}