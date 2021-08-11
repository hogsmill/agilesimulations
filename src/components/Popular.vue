<template>
  <div v-if="games.length" class="popular">
    Most popular this week:
    <span v-for="(game, index) in games" :key="index">
      <a :href="game.href">
        {{ game.game }}
      </a>
      <span v-if="index < games.length - 1">
        -
      </span>
    </span>
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
  created() {
    bus.$emit('sendLoadPopularGames')

    bus.$on('loadPopularGames', (data) => {
      this.games = data
    })
  },
}
</script>


<style lang="scss">
  .popular {
    text-align: center;
    background-color: #ddd;

    span {
      margin-left: 6px;
    }
  }
</style>
