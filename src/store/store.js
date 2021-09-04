import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: '',
    session: null,
    route: '',
    level: '',
    loggedInGames: {},
    userName: '',
    admin: false,
    mobile: false,
    tab: 'main',
    pricings: [],
    games: [],
    labGames: [],
    rss: {
      scope: '',
      id: ''
    },
    gameDates: [],
    updates: [],
    faqs: []
  },
  getters: {
    getId: (state) => {
      return state.id
    },
    getSession: (state) => {
      return state.session
    },
    getRoute: (state) => {
      return state.route
    },
    getLevel: (state) => {
      return state.level
    },
    getUserName: (state) => {
      return state.userName
    },
    getAdmin: (state) => {
      return state.admin
    },
    getMobile: (state) => {
      return state.mobile
    },
    getTab: (state) => {
      return state.tab
    },
    getGames: (state) => {
      return state.games
    },
    getLabGames: (state) => {
      return state.labGames
    },
    getGameDates: (state) => {
      return state.gameDates
    },
    getUpdates: (state) => {
      return state.updates
    },
    getFaqs: (state) => {
      return state.faqs
    },
    getPricings: (state) => {
      return state.pricings
    },
    getRss: (state) => {
      return state.rss
    }
  },
  mutations: {
    updateId: (state, payload) => {
      state.id = payload
    },
    updateLogin: (state, payload) => {
      state.session = payload.session
      state.route = payload.route
      state.level = payload.level
      state.loggedInGames = payload.games
      state.userName = payload.userName
      state.admin = payload.loggedInAsAdmin
    },
    updateMobile: (state, payload) => {
      state.mobile = payload
    },
    updateTab: (state, payload) => {
      state.tab = payload
    },
    loadGames: (state, payload) => {
      state.games = payload
    },
    loadLabGames: (state, payload) => {
      state.labGames = payload
    },
    updateGameDates: (state, payload) => {
      state.gameDates = payload
    },
    updateUpdates: (state, payload) => {
      state.updates = payload
    },
    updateFaqs: (state, payload) => {
      state.faqs = payload
    },
    updatePricings: (state, payload) => {
      state.pricings = payload
    },
    setRss: (state, payload) => {
      state.rss = {
        scope: payload.scope,
        id: payload.id
      }
    }
  },
  actions: {
    updateId: ({ commit }, payload) => {
      commit('updateId', payload)
    },
    updateLogin: ({ commit }, payload) => {
      commit('updateLogin', payload)
    },
    updateMobile: ({ commit }, payload) => {
      commit('updateMobile', payload)
    },
    updateTab: ({ commit }, payload) => {
      commit('updateTab', payload)
    },
    loadGames: ({ commit }, payload) => {
      commit('loadGames', payload)
    },
    loadLabGames: ({ commit }, payload) => {
      commit('loadLabGames', payload)
    },
    updateGameDates: ({ commit }, payload) => {
      commit('updateGameDates', payload)
    },
    updateUpdates: ({ commit }, payload) => {
      commit('updateUpdates', payload)
    },
    updateFaqs: ({ commit }, payload) => {
      commit('updateFaqs', payload)
    },
    updatePricings: ({ commit }, payload) => {
      commit('updatePricings', payload)
    },
    setRss: ({ commit }, payload) => {
      commit('setRss', payload)
    }
  }
})
