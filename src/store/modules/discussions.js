import DiscussionService from "../../service/DiscussionService";
// initial state
const state = {
  Closediscussions: [],
  ByQuaData: [],
  ByNumData: [],
};

// getters
const getters = {

};

// actions
const actions = {
  getClosedDiscussions({ commit }, periode) {
    DiscussionService.getClosedDiscussions(periode) 
      .then((response) => {
        commit("setClosedDiscussions", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  getClosedDiscussionsByUser({ commit }, periode) {
    commit("setClosedDiscussions", []);
    DiscussionService.getClosedDiscussionsByUser(periode)
      .then((response) => {
        commit("setClosedDiscussions", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  getReportGroupByNumber({ commit }, periode) {
    commit("setByNumData", []);
    DiscussionService.getReportGroupByNumber(periode)
      .then((response) => {
        commit("setByNumData", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  getReportGroupByQualification({ commit }, periode) {
    commit("setByQuaData", []);
    DiscussionService.getReportGroupByQualification(periode)
      .then((response) => {
        commit("setByQuaData", response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },



};

// mutations
const mutations = {
  setDisplayMessage(state, dm) {
    state.displayMessage = dm;
  },
  setClosedDiscussions(state, disc) {
    state.Closediscussions = disc;
  },
  setByNumData(state, data) {
    state.ByNumData = data;
  },
  setByQuaData(state, data) {
    state.ByQuaData = data;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
