<template>
  <div>
    <h2>
      Where we've played the games in public...
      <a href="/gameDates.xml">
        <i class="fas fa-rss-square" />
      </a>
    </h2>
    <table class="game-dates">
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
        <tr v-for="(date, index) in gameDates" :class="{ 'selected': rss.id == date.id }" :key="index">
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
</template>

<script>
export default {
  computed: {
    rss() {
      return this.$store.getters.getRss
    },
    gameDates() {
      return this.$store.getters.getGameDates
    }
  },
  methods: {
    gameDate(date) {
      const month = date.month < 10 ? '0' + date.month : date.month
      const day = date.day < 10 ? '0' + date.day : date.day
      return date.year + '-' + month + '-' + day
    }
  }
}
</script>

<style lang="scss">
  .game-dates {
    td {
      text-align: left;
    }
  }
</style>
