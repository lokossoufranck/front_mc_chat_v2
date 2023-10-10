const DEBUG = true;
//const API_URL = 'http://localhost:3000/';
const OnlineUsers = 'api/mc_chat/usersonline'
const AllUsers = 'api/mc_chat/users'
const User = 'api/mc_chat/user/'
var host = window.location.hostname;
const API_URL = 'http://'+host+':3000/';
export {
    DEBUG,   API_URL , OnlineUsers, AllUsers, User
}
