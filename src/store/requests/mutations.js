export const mutations = {
  setRequests(state, requests) {
    state.requests = requests;
  },
  addNewRequest(state, newRequest) {
    state.requests = [...state.requests, newRequest];
  },
  cleareRequests(state) {
    state.requests = [];
  },
}