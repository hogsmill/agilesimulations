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
          'Have your own, private, secure set of the games with their own databases customised to your organisational needs and branding, ' +
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
        date: '10th July, 2021',
        game: 'Funconf',
        link: 'https://www.townscript.com/e/funconf2021',
        description: 'Funconf Gamification Conference'
      },
      {
        date: '22nd June, 2021',
        game: 'No Estimates',
        link: 'https://www.meetup.com/the-agile-arcade-serious-gaming-group/',
        description: 'Chris Stones Agile Arcade'
      },
      {
        date: '14th June, 2021',
        game: 'Coin Game',
        link: '',
        description: 'Part of a Training Course'
      },
      {
        date: '14th June, 2021',
        game: 'Context Switching',
        link: '',
        description: 'Part of a Training Course'
      },
      {
        date: '14th June, 2021',
        game: 'Planning Poker',
        link: '',
        description: 'Part of a Training Course'
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
    ],
    updates: [
      {
        date: '2021-07-12',
        text: [
          'An excellent running of the No Estimates game at Funconf on the 11th July - <a href="https://www.townscript.com/e/funconf2021">Funconf</a> - India\'s First Gamification focused Unconference. As usual, lots of engagement and some great discussion.',
          'We\'ve also started work on assessment-based apps - the Spotify Health Check and 5 Team Dysfunctions; contact us for more info. These can be run regularly to take the pulse of your teams, with graphs and analysis to spot trends, etc.'
        ],
        image: 'funconf2.jpg',
        tags: ['agilesimulations', 'funconf', 'noestimates', 'spotifyhealthcheck', '5dysfunctions']
      },
      {
        date: '2021-06-28',
        text: [
          'A few people have had trouble joining No Estimates games recenty, so we\'ve had a big re-factor and hopefully removed some pesky race conditions (<i>no one wants race conditions at my age...</i>). We\'re going to put out a URL this Friday (2/7/21) so that for anyone who\'s had issues previously can give it a go.',
          'The next public running of No Estimates will be at <a href="https://www.townscript.com/e/funconf2021">Funconf</a> - India\'s First Gamification focused Unconference - on the 11th July.'
        ],
        image: 'funconf3.jpg',
        tags: ['agilesimulations', 'funconf', 'noestimates']
      },
      {
        date: '2021-06-22',
        text: [
          'We\'ve developed a new screen in battleships so you can watch a game as it is played. Great for training courses where the rest of the participants can watch 2 victims, sorry, players, playing the game as it develops...',
          'The next public running of No Estimates wil be tomorrow (22/6) at Chris Stone\'s Agile Arcade. Honoured to be asked to do this by the godfather of onine games and retros.',
        ],
        image: 'battleships-watch.jpg',
        tags: ['agilesimulations', 'agilearcade', 'agilebattleships', 'agiletraining']
      },
      {
        date: '2021-06-21',
        text: [
          'We were unable to find time to report last week - we were actually using the games, for the first ever, as part of a training course for a client! Exciting times! They went down really well, and we learned a lot.',
          'The next public running of No Estimates wil be on Tuesday 22/6 at Chris Stone\'s Agile Arcade. Honoured to be asked to do this by the godfather of online games and retros.'
        ],
        image: 'agile-arcade.jpg',
        tags: ['agilesimulations', 'agilearcade', 'remotetraining']
      },
      {
        date: '2021-06-07',
        text: [
          'The past couple of weeks have been spent re-building <href="https://agilesimulations.co.uk">the web site</a> to make it easier to understand, navigate and use. All comments welcome. It\'s still very orange, obviously... :-)',
          'We\'ve also re-vamped the <a href=" https://agilesimulations.co.uk/context-switching/?walkThrough">Context Switching game</a> to make it more user friendly. Feel free to have a play.',
          'The next public running of No Estimates wil be at Gamify IT on 12/6/21; watch this space for more details.',
        ],
        image: 'web-site.png',
        tags: ['pipelinegame', 'agilesimulations', 'gamifyit', 'contextswitching']
      },
      {
        date: '2021-05-24',
        text: [
          'The big news this week is that Agile Simulations is now a limited company! This will make no difference to our pricing etc., but should make it easier to purchase/licence our services and products; many organisations won\'t deal with individuals.',
          'The next public running of No Estiates wil be at Gamify IT on 12/6/21; watch this space for more details.'
        ],
        image: 'companies-house.jpg',
        tags: ['pipelinegame', 'agilesimulations', 'gamifyit']
      },
      {
        date: '2021-05-17',
        text: [
          '<b>The Pipeline Game</b>',
          'A first playing of the MVP of this game really gave us some excellent feedback last week. A long way to go, but the concept seems of enough interest to start making this into a full-blown game.',
          'Look out for future runnings of new iterations!'
        ],
        image: 'pipeline-game.jpg',
        tags: ['pipelinegame', 'agilesimulations', 'testinproduction']
      },
      {
        date: '2021-05-10',
        text: [
          '<b>The Pipeline Game</b>',
          'If you\'re interested, we\'re running a test session of the MVP (hopefully V!) on Friday 14th of May. Get in contact if you\'d to play or observe. We\'re very keen to get early feedback on this new game.',
          '<b>Kanban Playground</b>',
          'The Kanban playground is basically No Estimates with the estimation stuff stripped out, and exra features added - hard and soft WIP, expedite lanes, backlog creation, etc. etc. to allow you to explore different policies and settings without using your "real" boards. Stil not completely finished. but feel free to have a play and let us know what else you need. https://agilesimulations.co.uk/kanban-playground/?host'
        ],
        tags: ['pipelinegame', 'kanban', 'agilesimulations', 'testinproduction']
      },
      {
        date: '2021-05-03',
        text: [
          '<b>Kanban Playground</b>',
          'The Kanban playground is basically No Estimates with the estimation stuff stripped out, and exra features added - hard and soft WIP, expedite lanes, backlog creation, etc. etc. to allow you to explore different policies and settings without using your "real" boards. Stil not completely finished. but feel free to have a play and let us know what else you need. https://agilesimulations.co.uk/kanban-playground/?host',
          '<b>Pipeline Game</b>',
          'This new game is coming along well, and we\'re looking for early feedback. If you\'re interested, we\'d love to run you through what we have so far. As a concept, it\'s pretty cool but is it enough of a "game"?'
        ],
        tags: ['pipelinegame', 'kanban', 'agilesimulations']
      },
      {
        date: '2021-04-26',
        text: [
          'This week, we\'ve been concentrating on a new game - The Pipeline Game. This is a game to explore whether we should get rid of all bugs in the software before we deliver it, or deliver rapidly to fix bugs as they are found. Which is best in terms of customer satisfaction, learnings and quality? The game allows you to explore different strategies to see the effect on these things. As with all games, it is highly configurable to best fit your organisation/domain.',
          'Watch this space for more details, beta-testing opportunities and release date...'
        ],
        tags: ['pipelinegame', 'agilesimulations']
      },
      {
        date: '2021-04-12',
        text: [
          '<b>No Estimates</b>',
          'Not much to see this week, but a lot behind the scenes stuff this week to improve deployment and update of dedicated servers for paid versions of the games and more monitoring in place to auto-detect and fix some tech debt issues.',
          '<b>Sessions</b>',
          'Two No Estimates, and two Coin Game sessions last week for attendees of the <a href="https://conference.ctocraft.com/">CTO Craft Com conference</a>. Some great learnings good fun playing with small groups.'
        ],
        tags: ['ctocraft', 'noestimates', 'coingame']
      },
      {
        date: '2021-04-05',
        text: [
          '<b>No Estimates</b>',
          'Some of the graphs have been updated to make them easier to read; Cycle Time is now ordered by days taken to make it more obvious what\'s happening, and the Scatter Plot now has the 75%, 90% and 95% lines superimposed to make reading it easier.',
          'We\'ve also added in the ability to change currency of the reports, etc. to allow some internationalisation.',
          '<b>Sessions</b>',
          'Two No Estimates sessions this week for attendees of the <a href="https://conference.ctocraft.com/">CTO Craft Com conference</a>. We\'re also running two Coin Game workshops for the same conference. A good week for game-based mindset change...'
        ],
        tags: ['ctocraft', 'noestimates', 'coingame', 'scatterplot', 'cycletime']
      },
      {
        date: '2021-03-29',
        text: [
          '<b>No Estimates</b>',
          'Two excellent sessions last week (Tri Agile 2021 and a corporate agile community event) with some great learnings for both particiapnts and ourselves. One thing we learned; we need to know when people leave the game (for whatever reason), so we\'ve updated the game to show this.',
          'Two sessions next week for attendees of the <a href="https://conference.ctocraft.com/">CTO Craft Com conference</a>'
        ],
        tags: ['ctocraft', 'triagile2021', 'noestimates']
      },
      {
        date: '2021-03-22',
        text: [
          '<b>No Estimates</b>',
          'OK, I\'ll admit this one is a bit geeky, and some might even say "nice-to-have", but we now generate QR codes on the fly rather than hard wiring. Could be useful if we ever move servers, or build a company-specific site.',
          'We are also plannng our first agile coaches training session to train coaches in the use and facilitation of the game. Please get in touch if this is something you\'d be interested in.',
          '<b>Public Sessions</b>',
          'We will be running a No Estimates session at this year\'s <a href="https://triagile.com/">Tri Agile conference</a> on 23rd March. See you there.'
        ],
        tags: ['onlinefacilitation', 'triagile2021', 'noestimates']
      },
      {
        date: '2021-03-15',
        text: [
          '<b>No Estimates</b>',
          'No Estimates mobile is now available, so we can run the game face-to-face if groups want to play in the office. Obviously, this opens up the possibility of teams playing face-to-face in seperate offices; great for breaking down barriers between teams in a cost-effective manner.',
          'In technical news, we have implemented a new message bus which will improve stability under stress.',
          '<b>Public Sessions</b>',
          'We will be running a No Estimates session at this year\'s <a href="https://triagile.com/">Tri Agile conference</a> on 23rd March. See you there.'
        ],
        tags: ['onlinefacilitation', 'triagile2021', 'noestimates']
      },
      {
        date: '2021-03-08',
        text: [
          '<b>No Estimates</b>',
          'We have a new visualisation that shows the flow efficiency of selected cards to highlight how much waiting time can happen during a card\'s time in play.',
          'We are also thinking about how we might run the game once (some) people go back to the office and want to do it face-to-face. We are developing an app to  allow this, so watch this space.',
          '<b>Public Sessions</b>',
          'We will be running a No Estimates session at this year\'s <a href="https://triagile.com/">Tri Agile conference</a> on 23rd March. See you there.'
        ],
        tags: ['onlinefacilitation', 'triagile2021', 'noestimates']
      },
      {
        date: '2021-03-01',
        text: [
          '<b>No Estimates</b>',
          'New Flow Efficiency graph - the ratio between the time a work item is being worked on, and the total time it is "in play". Waiting could be due to an item is blocked, too much WIP, or something more important has arrived. It is surprisingly low in software development, usually 0.1 to 0.2. This, of course makes estimating even more difficult; if 80% of the elapsed time is - unanticipated - waiting time, how can we accurately estimatine?',
          'We have added the ability to show multiple teams on the same graph so we can compare them. Currently, multiple graphs are available for Correlation and Flow Efficiency, with WIP and some others to follow (not all graphs lend themselves to this).',
          '<b>Public Sessions</b>',
          'We will be a partner at the upcoming <a href="https://conference.ctocraft.com/">CTO Craft Com conference</a> where we will be running a number of public workshops. Numbers will be limited so watch this space and book early.'
        ],
        tags: ['kanbanzone', 'onlineagile', 'noestimates']
      },
      {
        date: '2021-02-22',
        text: [
          '<b>HTTPS</b>',
          'We\'ve upgraded to https on all Agile Simulations apps. This has helped stability, particularly in corporate environments, and we\'ve confirmed it fixes known issue with previous game players.',
          '<b>Kanban Zone</b>',
          'We\'re delighted to have a <a href="https://kanbanzone.com/2021/what-we-learned-from-taking-agile-workshops-online/">blog post</a> on our experiences of bringing workshops online on the Kanban Zone - It\'s based on our Agile 20 Reflect experiences, and it includes some fascinating insights form the game we played there.',
          '<b>No Estimates</b>',
          'A 50 player game overnight UK time for the Project Management Institute in Washington, USA went down extremely well, and a great time had by all.',
          '<b>New Stuff</b>',
          'We\'re still developing the Interdependent Teams simulation into an interactive game. Watch this space! Also we\'ve done work on the Kanban Playground, and we\'d still welcome ideas as to which direction we should take this.'
        ],
        tags: ['kanbanzone', 'onlineagile', 'noestimates']
      },
      {
        date: '2021-02-15',
        text: [
          '<b>No Estimates</b>',
          'The No Estimates game was played last week at Agile 20 Reflect with a truly international set of players. Lots of positive feedback and excellent discussion. New graphs have been added; monte carlo simulation, WIP and cumulative flow. As with al graphsm these are based on actual game data; no potted perfect graphs to make the point here!',
          '<b>Coin Game</b>',
          'The Coin Game has had a bit of a revamp, and some bugs with game set up fixed. As with all games, feedback is welcomed and encouraged',
          '<b>Planning Poker</b>',
          'This also has a new look, and a more robust game set up',
          '<b>General</b>',
          'All apps now use socket.io 3.0+which is more secure and reliable across all browsers.',
          '<b>New Stuff</b>',
          'We\'re currently developing the Interdependent Teams simulation into an interactive game. Watch this space!'
        ],
        tags: ['noestimates', 'coingame', 'planningpoker', 'remoteagile', 'agilesimulations', 'agiletraining', 'agileonline', 'interdependentteams']
      }
    ]
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
    getDates: (state) => {
      return state.dates
    },
    getUpdates: (state) => {
      return state.updates
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
    }
  }
})
