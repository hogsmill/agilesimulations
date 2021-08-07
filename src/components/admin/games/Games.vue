<template>
  <select :id="id ? 'select-game-' + id : 'select-game'" :value="game">
    <option>
      -- Select --
    </option>
    <option v-for="(g, index) in games" :key="index">
      {{ g }}
    </option>
  </select>
</template>

<script>
export default {
  props: [
    'id',
    'game'
  ],
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
