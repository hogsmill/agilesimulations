<template>
  <div class="about">
    <h2 class="menu">
      <div :class="{ 'selected': scope == 'info' }">
        <i class="fas fa-info" title="Info about Agile Simulations" @click="setScope('info')" />
      </div>
      <div :class="{ 'selected': scope == 'dates' }">
        <i class="fas fa-dice" title="Where we've played games" @click="setScope('dates')" />
      </div>
      <div :class="{ 'selected': scope == 'updates' }">
        <i class="fas fa-book" title="Updates" @click="setScope('updates')" />
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
          <tr v-for="(date, index) in dates" :key="index">
            <td>
              {{ date.date }}
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
      </h2>
      <div v-for="(update, index) in updates" :key="index" class="update">
        <h3>
          Status Update {{ update.date }}
        </h3>
        <p>
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
import AgileInfo from './about/AgileInfo.vue'

export default {
  components: {
    AgileInfo
  },
  data() {
    return {
      scope: 'dates'
    }
  },
  computed: {
    dates() {
      return this.$store.getters.getDates
    },
    updates() {
      return this.$store.getters.getUpdates
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
