import MessageService from "../../service/MessageService";
// initial state
const state = {
  latestInputmessages: [],
  allStatus: [],
  messagesBySubcriber: [],
  readedMessagesBySubcriber: null,
  displayMessage: [],
  mode: "simple",
};

// getters
const getters = {
  getMode() {
    return state.mode;
  },
};

// actions
const actions = {
  getLatestInputmessages({ commit }, user) {
    MessageService.getLatestInputmessages(user)
      .then((response) => {
        commit("setLatestInputmessages", response);
      })
      .catch((error) => {
        return error;
      });
  },

  getMessagesBySubcriber({ commit }, subcriber) {
    MessageService.getMessagesBySubcriber(subcriber)
      .then((response) => {
        //  console.log(response);
        commit("setMessagesBySubcriber", response);
      })
      .catch((error) => {
        return error;
      });
  },

  getAllStatus({ commit }) {
    MessageService.getAllStatus()
      .then((response) => {
        commit("setAllStatus", response);
      })
      .catch((error) => {
        return error;
      });
  },

  readMessagesBySubcriber({ commit }, subcriber) {
    //Appel à l'API qui faite le update du champs is_read
    MessageService.readMessagesBySubcriber(subcriber)
      .then((response) => {
        commit("setReadedMessagesBySubcriber", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  setupDisplayMessage({ commit }, dm) {
    commit("setDisplayMessage", dm);
  },

  /*sendMessage({ commit }, msg) {
    MessageService.sendMessage(msg)
      .then((response) => {
        //Identifer les parametres corrects
        commit("setMessagesBySubcriber", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },*/
  sendMessage( msg) {
    MessageService.sendMessage(msg)
      .then((response) => {
        //Identifer les parametres corrects
       // commit("setMessagesBySubcriber", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },



};

// mutations
const mutations = {
  setLatestInputmessages(state, lmsg) {
    state.latestInputmessages = lmsg;
  },


  setMessagesBySubcriber(state, m) {
    state.messagesBySubcriber = m;
  },
  setReadedMessagesBySubcriber(state, m) {
    state.readMessagesBySubcriber = m;
  },
  setMode(state, m) {
    state.mode = m;
  },
  setDisplayMessage(state, dm) {
    state.displayMessage = dm;
  },
  setAllStatus(state, st) {
    state.allStatus = st;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
