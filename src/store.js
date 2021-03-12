import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStep: 0,
    identifier: '',
    locale: 'fi'
  },
  mutations: {
    setLocale(state, payload) {
      state.locale = payload
    },
    setIdentifier(state, payload) {
      state.identifier = payload
    },
    setCurrentStep(state, payload) {
      // console.log('setting to ' + payload)
      state.currentStep = payload
    }
  }
})