<template>
  <div class="admin">
    <h2>
      Admin for {{ userName }}
    </h2>
    <div class="details">
      <h3>
        Game Details
      </h3>
      <p>
        Games that are enabled here will be shown on the splash screen list of games on the home
        page when logged in.
      </p>
      <table>
        <thead>
          <th>
            Game
          </th>
          <th>
            Enabled for Users?
          </th>
          <th>
            URL
          </th>
        </thead>
        <tbody>
          <tr v-for="(g, index) in games" :key="index">
            <td>
              {{ g.name }}
            </td>
            <td class="center">
              <input :id="'enabled-' + g.id" type="checkbox" :checked="g.enabled" @click="updateEnabled(g.id)">
            </td>
            <td>
              <a :href="url(g.url)">
                {{ url(g.url) }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      games: []
    }
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName
    },
    route() {
      return this.$store.getters.getRoute
    }
  },
  created() {
    bus.emit('sendLoadGames')

    bus.on('loadGames', (data) => {
      this.games = data
    })
  },
  methods: {
    game(id) {
      return this.games.find((d) => {
        return d.id == id
      })
    },
    url(url) {
      return this.route ? url + '-' + this.route : url
    },
    updateEnabled(id) {
      const game = this.game(id)
      game.enabled = document.getElementById('enabled-' + id).checked
      bus.emit('sendUpdateGame', game)
    }
  }
}
</script>

<style lang="scss">
.admin {
  max-width: 850px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }

  .details {
    margin: 0 24px;

    table {
      margin: 0 auto;
      width: 100%;

      th, td {
        border: 1px solid;
        padding: 6px;
      }

      th {
        text-align: center;
      }

      td {
        &.center {
          text-align: center;
        }
      }
    }
  }
}
</style>
