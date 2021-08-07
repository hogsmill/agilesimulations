<template>
  <div class="about">
    <h2 v-if="!rss.id" class="menu">
      <div :class="{ 'selected': scope == 'info' }">
        <i class="fas fa-info" :title="scopeDescriptions['info']" @click="setScope('info')" />
      </div>
      <div :class="{ 'selected': scope == 'dates' }">
        <i class="fas fa-dice" :title="scopeDescriptions['dates']" @click="setScope('dates')" />
      </div>
      <div :class="{ 'selected': scope == 'updates' }">
        <i class="fas fa-book" :title="scopeDescriptions['updates']" @click="setScope('updates')" />
      </div>
    </h2>
    <div v-if="scope == 'info'">
      <h2>More info about Agile Simulations</h2>
      <AgileInfo />
    </div>
    <div v-if="scope == 'dates'">
      <h2>Where we've played the games in public...</h2>
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Game
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(date, index) in dates" :class="{ 'selected': rss.id == date.id }" :key="index">
            <td>
              {{ gameDate(date) }}
            </td>
            <td>
              {{ date.game }}
              <a v-if="date.link" :href="date.link" target="blank" title="Link to video">
                <i class="fas fa-external-link-alt" />
              </a>
            </td>
            <td>
              {{ date.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="scope == 'updates'">
      <h2>
        Company Updates
        <a href="/rss.php">
          <i class="fas fa-rss-square" />
        </a>
      </h2>
      <div v-for="(update, index) in updates" :key="index" class="update">
        <h3>
          Status Update {{ update.date }}
        </h3>
        <div v-if="update.image" class="update-image" :class="updateImageClass(update.image)" />
        <p v-if="!mobile">
          <b>Welcome to the weekly status update to everyone interested in the progress at Agile Simuations. We've been busy...</b>
        </p>
        <p v-for="(para, pindex) in update.text" :key="pindex" v-html="para" />
        <p>
          As ever, feedback on all apps is welcomed, and get in touch for more info, or to discuss faciltation or using the games as part of your training/work.
        </p>
        <p class="tags">
          <span v-for="(tag, tindex) in update.tags" :key="tindex">
            #{{ tag }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import AgileInfo from './about/AgileInfo.vue'

export default {
  components: {
    AgileInfo
  },
  data() {
    return {
      dates: [],
      scope: 'dates',
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
    bus.$emit('sendLoadGameDates')

    bus.$on('loadGameDates', (data) => {
      this.dates = data
    })

    if (this.rss.id) {
      switch(this.rss.scope) {
        case 'gameDate':
          this.scope = 'dates'
          break
        case 'update':
          this.scope = 'updates'
          break
      }
    }
  },
  methods: {
    updateImageClass(image) {
      return image.split('.')[0]
    },
    setScope(scope) {
      this.scope = scope
    },
    format(p) {
      let str = ''
      if (p.match(/^H:/)) {
        str = 'header'
      }
      return str
    },
    gameDate(date) {
      const month = date.month < 10 ? '0' + date.month : date.month
      const day = date.day < 10 ? '0' + date.day : date.day
      return date.year + '-' + month + '-' + day
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
    }
    padding: 12px 24px;
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
