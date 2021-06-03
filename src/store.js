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
    games: [],
    dates: [
      {
        date: '22nd June, 2021',
        game: 'No Estimates',
        link: '',
        description: 'Chris Stones Agile Arcade'
      },
      {
        date: '12th June, 2021',
        game: 'No Estimates',
        link: '',
        description: 'Gamify IT (Women in Tech India), 2021'
      },
      {
        date: '14th May, 2021',
        game: 'The Pipeline Game',
        link: '',
        description: 'First public test of the game'
      },
      {
        date: '23rd March, 2021',
        game: 'No Estimates',
        link: 'https://vimeopro.com/user111580551/triagile-2021/video/533113766',
        description: 'Tri Agile, 2021'
      },
      {
        date: '2nd February, 2021',
        game: 'No Estimates',
        link: '',
        description: 'Reflect Agile 20'
      },
      {
        date: '23rd September, 2020',
        game: 'No Estimates',
        link: 'https://community-z.com/events/agile-z-day/talks/5120',
        description: 'Agile Z-Day, 2020'
      }
    ]
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
    },
    getDates: (state) => {
      return state.dates
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
