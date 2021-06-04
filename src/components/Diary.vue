<template>
  <div class="diary">
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
</template>

<script>
export default {
  computed: {
    dates() {
      return this.$store.getters.getDates
    }
  }
}
</script>

<style lang="scss">
.diary {

  h2 {
    text-align: center;
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
}

@media screen and (max-width: 768px) {
  th, td {
    border-bottom: 1px solid;
  }
}
</style>
