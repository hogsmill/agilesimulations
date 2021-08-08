import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: '',
    session: null,
    route: '',
    userName: '',
    admin: false,
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
          'Have your own, private, secure set of the games customised to your organisational needs and branding, ' +
              'with full training on games and learnings. Early access to new games and custom features if required',
          'Includes data persistence, secure login, phone support, custom games and full configuration ' +
              'with no limits on number of players, etc.'
        ],
        price: 24.99,
        timing: 'month'
      },
      regularUse: {
        title: 'Regular Use',
        icon: 'fa-calendar-alt',
        text: [
          'All the "single use" games, plus all the games and activities that can be run regularly such as Team Health Checks, ' +
            '5 Team Dysfunctions, Planning Poker and more. All with trend graphs and consolidation across teams and the whole ' +
            'organisation.',
          'All on a dedicated server where your data is stored securely and persistently.'
        ],
        price: 12.99,
        selected: true,
        timing: 'month'
      },
      using: {
        title: 'Using',
        icon: 'fa-tv',
        text: [
          'Just use all the "single-use" games, whenever you want, with configuration to allow you to make them as relevant and applicable ' +
              'to your organisation/team/circumstances.'
        ],
        price: 5.99,
        timing: 'month'
      }
    },
    games: [],
    rss: {
      scope: '',
      id: ''
    },
    gameDates: [],
    updates: []
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
    getPricing: (state) => {
      return state.pricing
    },
    getGames: (state) => {
      return state.games
    },
    getGameDates: (state) => {
      return state.gameDates
    },
    getUpdates: (state) => {
      return state.updates
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
    updateGameDates: (state, payload) => {
      state.gameDates = payload
    },
    updateUpdates: (state, payload) => {
      state.updates = payload
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
    updateGameDates: ({ commit }, payload) => {
      commit('updateGameDates', payload)
    },
    updateUpdates: ({ commit }, payload) => {
      commit('updateUpdates', payload)
    },
    setRss: ({ commit }, payload) => {
      commit('setRss', payload)
    }
  }
})
