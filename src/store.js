import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    mobile: false,
    tab: 'main',
    pricing: {
      facilitation: {
        title: 'Facilitation',
        icon: 'fa-chalkboard-teacher',
        text: [
          'We can facilitate any of the games as a workshop, retro, team building session, or part of any of your existing training courses.',
          'We can also offer "train the coach" sessions to train your coaches/facilitators in how to run the games, and the learnings ' +
              'to bring out from them. Debrief materials supplied and included.'
        ],
        price: 99,
        from: true,
        timing: 'session'
      },
      dedicated: {
        title: 'Dedicated',
        icon: 'fa-server',
        text: [
          'Have your own, private, secure set of the games with their own databases customised to your organisational needs and branding,' +
              'with full training on games and learnings.',
          'Includes data persistence, secure login, phone support, early access to new features, custom games and full configuration ' +
              'with no limits on number of players, etc.'
        ],
        price: 24.99,
        selected: true,
        timing: 'month'
      },
      using: {
        title: 'Using',
        icon: 'fa-tv',
        text: [
          'Just use all the games, whenever you want, with some configuration to allow them to be more applicable to your organisation/team/circumstances.'
        ],
        price: 5.99,
        timing: 'month'
      }
    },
    games: []
  },
  getters: {
    getMobile: (state) => {
      return state.mobile
    },
    getTab: (state) => {
      return state.tab
    },
    getPricing: (state) => {
      return state.pricing
    },
    getGames: (state) => {
      return state.games
    }
  },
  mutations: {
    updateMobile: (state, payload) => {
      state.mobile = payload
    },
    updateTab: (state, payload) => {
      state.tab = payload
    },
    loadGames: (state, payload) => {
      state.games = payload
    }
  },
  actions: {
    updateMobile: ({ commit }, payload) => {
      commit('updateMobile', payload)
    },
    updateTab: ({ commit }, payload) => {
      commit('updateTab', payload)
    },
    loadGames: ({ commit }, payload) => {
      commit('loadGames', payload)
    }
  }
})
