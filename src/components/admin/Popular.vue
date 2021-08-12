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
      <tr v-for="(g, index) in games" :key="index">
        <td>
          <input :id="'popular-' + g.id" type="checkbox" :checked="g.popular" @click="updatePopular(g.id)">
        </td>
        <td>
          {{ g.game }}
        </td>
        <td>
          href: <input :id="'href-' + g.id" type="text" class="href" :value="g.href">
          <i class="far fa-save" @click="updateHref(g.id)" />
        </td>
      </tr>
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
    updatePopular(id) {
      const game = this.game(id)
      game.popular = document.getElementById('popular-' + id).checked
      bus.$emit('sendUpdateGame', game)
    },
    updateHref(id) {
      const game = this.game(id)
      game.href = document.getElementById('href-' + id).value
      bus.$emit('sendUpdateGame', game)
    }
  }
}
</script>

<style lang="scss">
  .admin-popular {
    table {
      margin: 12px auto;

      td {
        border: 1px solid;
        padding: 6px;

        .href {
          width: 500px;
        }
      }
    }
  }
</style>
