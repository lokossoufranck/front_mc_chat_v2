import DSService from "../../service/DiscussionStatusService";
// initial state
const state = {
  status:null,
  newStatus:null
};

// getters
const getters = {
  getStatus() {
    return state.status;
  },
};

// actions
const actions = {
  create({ commit }, status) {
    DSService.create(status)
      .then((response) => {
        commit("setNewStatus", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },


  getStatus({ commit },discussion_id) {
    DSService.getStatus(discussion_id)
      .then((response) => {
        commit("setStatus", response);
      })
      .catch((error) => {
        return error;
      });
  },


};

// mutations
const mutations = {
  setNewStatus(state, st) {
    state.newStatus = st;
  },


  setStatus(state, st) {
    state.status = st;
  },


};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
