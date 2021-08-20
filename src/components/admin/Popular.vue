<template>
  <div class="admin-popular">
    <table>
      <tr>
        <td>
          <input type="text" id="new-game">
        </td>
        <td>
          <button class="btn btn-primary smaller-font" @click="addGame()">
            Add New
          </button>
        </td>
      </tr>
    </table>
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Popular?
          </th>
          <th>
            Level
          </th>
          <th>
            Limited
          </th>
          <th>
            URL
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(g, index) in games" :key="index">
          <td>
            {{ g.name }}
          </td>
          <td :class="{'popular': g.popular}">
            <select :id="'popular-' + g.id" :value="g.popular" @click="updatePopular(g.id)">
              <option value="0">
                0
              </option>
              <option v-for="(n, index) in 3" :key="index">
                {{ n }}
              </option>
            </select>
          </td>
          <td :class="{'popular': g.popular}">
            <select :id="'level-' + g.id" :value="g.level" @change="updateLevel(g.id)">
              <option value="">
                -- Select --
              </option>
              <option>
                Use
              </option>
              <option>
                Regular Use
              </option>
            </select>
          </td>
          <td :class="{'popular': g.popular}">
            <select :id="'limited-' + g.id" :value="g.limited" @change="updateLimited(g.id)">
              <option value="">
                -- Select --
              </option>
              <option>
                Demo
              </option>
              <option>
                Individual
              </option>
            </select> use only
          </td>
          <td :class="{'popular': g.popular}">
            <div class="url-label">
              url:
            </div>
            <input :id="'url-' + g.id" type="text" class="url" :value="g.url">
            <i class="far fa-save" @click="updateUrl(g.id)" />
            <br>
            <div class="url-label">
              mobile:
            </div>
            <input :id="'mobile-' + g.id" type="text" class="url" :value="g.mobile">
            <i class="far fa-save" @click="updateMobile(g.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      games: []
    }
  },
  created() {
    bus.$emit('sendLoadGames')

    bus.$on('loadGames', (data) => {
      this.games = data
    })
  },
  methods: {
    game(id) {
      return this.games.find((d) => {
        return d.id == id
      })
    },
    addGame() {
      const game = document.getElementById('new-game').value
      const data = {
        game: game,
        popular: false
      }
      bus.$emit('sendAddGame', data)
    },
    deleteGame(id) {
      bus.$emit('sendDeleteGame', {id: id})
    },
    updateLevel(id) {
      const game = this.game(id)
      game.level = document.getElementById('level-' + id).value
      bus.$emit('sendUpdateGame', game)
    },
    updateLimited(id) {
      const game = this.game(id)
      game.limited = document.getElementById('limited-' + id).value
      bus.$emit('sendUpdateGame', game)
    },
    updatePopular(id) {
      const game = this.game(id)
      game.popular = document.getElementById('popular-' + id).value
      bus.$emit('sendUpdateGame', game)
    },
    updateUrl(id) {
      const game = this.game(id)
      game.url = document.getElementById('url-' + id).value
      bus.$emit('sendUpdateGame', game)
    },
    updateMobile(id) {
      const game = this.game(id)
      game.mobile = document.getElementById('mobile-' + id).value
      bus.$emit('sendUpdateGame', game)
    }
  }
}
</script>

<style lang="scss">
  .admin-popular {
    table {
      margin: 12px auto;

      th, td {
        border: 1px solid;
        padding: 6px;

        .url {
          width: 500px;
        }
      }
      th {
        text-align: center;
      }

      td {

        &.popular {
          color: #fff;
          background-color: #f4511e;
        }
        
        .url-label {
          width: 52px;
          display: inline-block;
        }
      }
    }
  }
</style>
