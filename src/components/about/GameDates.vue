<template>
  <div>
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
    gameDates() {
      return this.$store.getters.getGameDates
    }
  }
}
</script>
