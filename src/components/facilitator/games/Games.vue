<template>
  <select id="select-game">
    <option>
      -- Select --
    </option>
    <option v-for="(game, index) in games" :key="index">
      {{ game }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      games: [
        'No Estimates',
        'Pipeline Game',
        'Coin Game',
        'Context Switching',
        'Planning Poker'
      ]
    }
  }
}
</script>
