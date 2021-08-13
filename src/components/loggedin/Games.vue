<template>
  <div class="row loggedin-games">
    <h2>
      Game Links for {{ userName }}
    </h2>
    <div class="col-sm-6">
      <h3>
        Single Use
      </h3>
      <ul>
        <li v-for="(link, index) in use" :key="index">
          <a :href="getUrl(link)">{{ link.name }}</a>
          <a :href="getUrl(link, true)">
            <i class="fas fa-info-circle" title="Link to a walk through of the game" />
          </a>
        </li>
      </ul>
    </div>
    <div class="col-sm-6">
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
          <span v-if="!hasLevel(link.levelNeeded)" class="limited">
            ({{ link.limited }})
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
      use: [
        {name: 'No Estimates', url: 'no-estimates'},
        {name: 'Kanban Playground', url: 'kanban-playground'},
        {name: 'Coin Game', url: 'coin-game'},
        {name: 'Agile Battleships', url: 'battleships'},
        {name: 'Context Switching', url: 'context-switching'},
        {name: 'Survival at Sea', url: 'survival'}
      ],
      regularUse: [
        {name: 'Planning Poker', url: 'planning-poker', levelNeeded: 'Regular Use', limited: 'Demo Mode Only'},
        {name: 'Spotify Health Check', url: 'team-health-check', levelNeeded: 'Regular Use', limited: 'Individual Only'},
        {name: '5 Dysfunctions of a Team', url: 'five-dysfunctions', levelNeeded: 'Regular Use', limited: 'Individual Only'}
      ]
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
    }
  },
  methods: {
    getUrl(link, walkThrough) {
      let url = this.root + '/' + link.url + '-' + this.route
      if (walkThrough) {
        url = url + '?walkThrough'
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
