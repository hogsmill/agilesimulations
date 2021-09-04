<template>
  <div class="row loggedin-games">
    <h2>
      Game Links for {{ userName }}
    </h2>
    <div v-if="level == 'Single Game'" class="col-sm-12">
      <h3>
        Single Game
      </h3>
      <ul>
        <li v-for="(link, index) in loggedInGames" :key="index">
          <a :href="getUrl(link)">
            {{ link.name }}
          </a>
          <a :href="getUrl(link, true)">
            <i class="fas fa-info-circle" title="Link to a walk through of the game" />
          </a>
          <a v-if="link.mobile" :href="getMobileUrl(link)">
            <i class="fas fa-mobile-alt" title="Mobile app" />
          </a>
        </li>
      </ul>
    </div>
    <div v-if="level != 'Single Game'" class="col-sm-6">
      <h3>
        Single Use
      </h3>
      <ul>
        <li v-for="(link, index) in use" :key="index">
          <a :href="getUrl(link)">
            {{ link.name }}
          </a>
          <a :href="getUrl(link, true)">
            <i class="fas fa-info-circle" title="Link to a walk through of the game" />
          </a>
          <a v-if="link.mobile" :href="getMobileUrl(link)">
            <i class="fas fa-mobile-alt" title="Mobile app" />
          </a>
        </li>
      </ul>
    </div>
    <div v-if="level != 'Single Game'" class="col-sm-6">
      <h3>
        Regular Use
      </h3>
      <p v-if="!hasLevel('Regular Use')">
        Do <a @click="contact()">contact us</a> to upgrade to get all features of these games/workshops.
      </p>
      <ul>
        <li v-for="(link, index) in regularUse" :key="index">
          <a :href="getUrl(link)">{{ link.name }}</a>
          <a :href="getUrl(link, true)">
            <i class="fas fa-info-circle" title="Link to a walk through of the game" />
          </a>
          <br>
          <span v-if="!hasLevel(link.level)" class="limited">
            ({{ link.limited }} use only)
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

import levels from '../../lib/levels.js'

export default {
  data() {
    return {
      root: 'https://agilesimulations.co.uk',
      use: [],
      regularUse: [],
      loggedInGames: []
    }
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName
    },
    route() {
      return this.$store.getters.getRoute
    },
    level() {
      return this.$store.getters.getLevel
    },
    games() {
      return this.$store.getters.getLoggedInGames
    }
  },
  created() {
    bus.$emit('sendLoadGames')

    bus.$on('loadGames', (data) => {
      this.setupGames(data)
      if (this.level == 'Single Game') {
        this.setupSingleGames(data)
      }
    })
  },
  methods: {
    setupGames(games) {
      const use = []
      const regularUse = []
      for (let i = 0; i < games.length; i++) {
        if (games[i].enabled) {
          switch(games[i].level) {
            case 'Use':
              use.push(games[i])
              break
            case 'Regular Use':
              regularUse.push(games[i])
              break
          }
        }
      }
      this.use = use
      this.regularUse = regularUse
    },
    setupSingleGames(games) {
      const loggedInGames = []
      for (let i = 0; i < games.length; i++) {
        if (this.games[i][this.games[i].name]) {
          loggedInGames.push(games[i])
        }
      }
      this.loggedInGames = loggedInGames
    },
    getUrl(link, walkThrough) {
      let url = this.root + '/' + link.url
      if (this.route) {
        url = url + '-' + this.route
      }
      if (walkThrough) {
        url = url + '?walkThrough'
      }
      return url
    },
    getMobileUrl(link) {
      let url = this.root + '/' + link.mobile
      if (this.route) {
        url = url + '-' + this.route
      }
      return url
    },
    hasLevel(required) {
      return levels.hasLevel(this.level, required)
    },
    contact() {
      bus.$emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .loggedin-games {
    padding: 12px;
    max-width: 600px;
    margin: 24px auto 12px auto;
    border: 4px solid #f4511e;
    border-radius: 8px;

    li {
      text-align: left;

      .fas {
        margin-left: 12px;
        font-size: large;
        color: #f4511e;
        position: relative;
        top: 2px;
      }

      .limited {
        font-style: italic;
      }
    }
  }
</style>
