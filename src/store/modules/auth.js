import AuthService from '../../service/AuthService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };



export default {
  namespaced: true,
  state: { initialState, users: null },
  // getters
  getters: {
    get_user(state) {
      return state.user;
    },
  },

  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          //  commit('loginFailure');
          return Promise.reject(error.response.data);
        }
      );
    },
    logout({ commit }, user) {
      return AuthService.logout(user).then(
        user => {
          commit('logout');
          return Promise.resolve(user);
        },
        error => {
          return Promise.reject(error.response.data);
        }
      );
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error.response.data);
        }
      );
    },

    updateUser({ commit }, user) {
      return AuthService.updateUser(user).then(
        response => {
          commit("setUser", response.data);
        },
        error => {
          return Promise.reject(error.response.data);
        }
      );
    },

    updateUserPassword({ commit }, user) {
      return AuthService.updateUserPassword(user).then(
        response => {
          commit("setUser", response.data);
        },
        error => {
          return Promise.reject(error.response.data);
        }
      );
    },
    



    getUsers({ commit }) {
      AuthService.all()
        .then((response) => {
          commit("setUsers", response.data);
        })
        .catch((error) => {
          return error;
        });
    },

    getUser({ commit }, user_id) {
      AuthService.finUser(user_id)
        .then((response) => {
          commit("setUser", response.data);
        })
        .catch((error) => {
          return error;
        });
    },

    getUsersBy({ commit }, user) {
      AuthService.getAllUsersBy(user)
        .then((response) => {
          commit("setUsers", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          return error;
        });
    },



  },
  mutations: {
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
    registerSuccess(state) {
      state.status = {};
    },
    registerFailure(state) {
      state.status = {};
    },
    setUsers(state, utils) {
      state.users = utils;
    },
    setUser(state, util) {
      state.user = util;
    },
  }
};