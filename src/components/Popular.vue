<template>
  <div v-if="popular1" class="popular">
    Most popular this week:
    <span>
      <a :href="popular1.url + '?walkThrough'">
        {{ popular1.name }}
      </a>
      <span>
        -
      </span>
      <a :href="popular2.url + '?walkThrough'">
        {{ popular2.name }}
      </a>
      <span>
        -
      </span>
      <a :href="popular3.url + '?walkThrough'">
        {{ popular3.name }}
      </a>
    </span>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      popular1: null,
      popular2: null,
      popular3: null,
    }
  },
  created() {
    bus.emit('sendLoadGames')

    bus.on('loadGames', (data) => {
      this.popular1 = data.find((g) => {
        return g.popular == 1
      })
      this.popular2 = data.find((g) => {
        return g.popular == 2
      })
      this.popular3 = data.find((g) => {
        return g.popular == 3
      })
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
