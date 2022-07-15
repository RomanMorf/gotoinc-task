import { localStoreCheck } from '@/helpers/localStoreCheck.js'
import { localStoreGet } from '@/helpers/localStoreGet.js'
import { localStoreSet } from '@/helpers/localStoreSet.js'

export const actions = {
  requestCreate: ({ commit, state }, newRequest) => {
    commit('addNewRequest', newRequest)
    localStoreSet('requests', state.requests)
  },
  requestsUpdate: ({ commit }, requests) => {
    localStoreSet('requests', requests)
    commit('setRequests', requests)
  },
  requestsGetFromLocal: ({ commit }) => {
    if (localStoreCheck('requests')) {
      const requests =  localStoreGet('requests')
      commit('setRequests', requests)
    }
  },
}