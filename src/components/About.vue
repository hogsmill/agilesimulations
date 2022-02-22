<template>
  <div class="about">
    <h2 v-if="!rss.id" class="menu">
      <div :class="{ 'selected': scope == 'info' }">
        <i class="fas fa-info" :title="scopeDescriptions['info']" @click="setScope('info')" />
      </div>
      <div :class="{ 'selected': scope == 'gameDates' }">
        <i class="fas fa-dice" :title="scopeDescriptions['dates']" @click="setScope('gameDates')" />
      </div>
      <div :class="{ 'selected': scope == 'updates' }">
        <i class="fas fa-book" :title="scopeDescriptions['updates']" @click="setScope('updates')" />
      </div>
    </h2>
    <AgileInfo v-if="scope == 'info'" />
    <GameDates v-if="scope == 'gameDates'" />
    <Updates v-if="scope == 'updates'" />
  </div>
</template>

<script>
import bus from '../socket.js'

import AgileInfo from './about/AgileInfo.vue'
import GameDates from './about/GameDates.vue'
import Updates from './about/Updates.vue'

export default {
  components: {
    AgileInfo,
    GameDates,
    Updates
  },
  data() {
    return {
      scope: 'gameDates',
      scopeDescription: 'Where we\'ve played games',
      scopeDescriptions: {
        info: 'Info about Agile Simulations',
        dates: 'Where we\'ve played games',
        updates: 'Weekly updates'
      }
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    rss() {
      return this.$store.getters.getRss
    },
    updates() {
      return this.$store.getters.getUpdates
    }
  },
  created() {
    bus.emit('sendLoadGameDates')
    bus.emit('sendLoadUpdates')

    bus.on('loadGameDates', (data) => {
      this.$store.dispatch('updateGameDates', data)
    })

    bus.on('loadUpdates', (data) => {
      this.$store.dispatch('updateUpdates', data)
    })

    if (this.rss.id) {
      switch(this.rss.scope) {
        case 'gameDate':
          this.scope = 'gameDates'
          break
        case 'update':
          this.scope = 'updates'
          break
      }
    }
  },
  methods: {
    setScope(scope) {
      this.scope = scope
    },
    format(p) {
      let str = ''
      if (p.match(/^H:/)) {
        str = 'header'
      }
      return str
    }
  }
}
</script>

<style lang="scss">
.about {

  padding: 6px;

  h2 {
    text-align: center;

    &.menu {
      div {
        width: 70px;
        height: 55px;
        padding: 6px;
        display: inline-block;

        &.selected {
          background-color: #f4511e;
          border-radius: 12px;

          i {
            color: #fff;
          }
        }
      }
    }

    i {
      color: #f4511e;
      margin: 2px 6px;

      &:hover {
        cursor: pointer;
        color: #444;
      }
    }
  }

  table {
    margin: 0 auto;

    tr.selected {
      border: 3px solid #f4511e;
      td {
        font-weight: bold;
      }
    }

    th, td {
      padding: 6px 12px;
      text-align: center;
    }

    .fas {
      color: #f4511e;
      margin-left: 6px;
    }
  }

  .update {

    max-width: 850px;
    margin: 0 auto;

    .update-image {
      float: right;
      border: 1px solid;
      width: 300px;
      height: 200px;
      background-size: cover;
      margin: 0 0 4px 8px;
      padding: 12px 24px;

      &.healthCheck {
        height: 320px;
        background-image: url("../assets/img/updates/healthCheck.jpg");
      }
      &.ludogogy {
        background-image: url("../assets/img/updates/ludogogy.jpg");
      }
      &.funconf2 {
        background-image: url("../assets/img/updates/funconf2.jpg");
      }
      &.funconf3 {
        background-image: url("../assets/img/updates/funconf3.jpg");
      }
      &.agile-arcade {
        background-image: url("../assets/img/updates/agile-arcade.jpg");
      }
      &.battleships-watch {
        background-image: url("../assets/img/updates/battleships-watch.jpg");
      }
      &.web-site {
        background-image: url("../assets/img/updates/web-site.png");
      }
      &.kanban-pub {
        background-image: url("../assets/img/updates/kanban-pub.jpg");
      }
      &.companies-house {
        background-image: url("../assets/img/updates/companies-house.jpg");
      }
      &.pipeline-game {
        background-image: url("../assets/img/updates/pipeline-game.jpg");
      }
      &.loggedin-games {
        background-image: url("../assets/img/updates/loggedin-games.png");
      }
      &.health-check {
        background-image: url("../assets/img/updates/health-check.png");
      }
      &.french {
        background-image: url("../assets/img/updates/french.jpg");
      }
      &.google-meet {
        background-image: url("../assets/img/updates/google-meet.jpg");
      }
      &.organisation-model {
        background-image: url("../assets/img/updates/organisation-model.jpg");
      }
      &.monte-carlo-update {
        background-image: url("../assets/img/updates/monte-carlo-update.jpg");
      }
    }

    .tags {
      text-align: right;

      span {
        font-weight: bold;
        margin: 0 12px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  th, td {
    border-bottom: 1px solid;
  }
}
</style>
