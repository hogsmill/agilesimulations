<template>
  <div class="game-dates">
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
            Link
          </th>
          <th>
            Description
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Day /> /
            <Month /> /
            <Year />
          </td>
          <td>
            <Games />
          </td>
          <td>
            <input id="new-link" type="text">
          </td>
          <td>
            <input id="new-description" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addGameDate()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
            Link
          </th>
          <th>
            Description
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(date, index) in dates" :key="index">
          <td>
            {{ date.year }}-{{ date.month }}-{{ date.day }}
          </td>
          <td>
            {{ date.game }}
          </td>
          <td>
            {{ date.link }}
          </td>
          <td>
            {{ date.description }}
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="deleteGameDate(date.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

import Day from './dates/Day.vue'
import Month from './dates/Month.vue'
import Year from './dates/Year.vue'
import Games from './games/Games.vue'

export default {
  components: {
    Day,
    Month,
    Year,
    Games
  },
  data() {
    return {
      dates: []
    }
  },
  created() {
    bus.$emit('sendLoadGameDates')

    bus.$on('loadGameDates', (data) => {
      this.dates = data
    })
  },
  methods: {
    addGameDate() {
      const day = document.getElementById('select-day').value
      const month = document.getElementById('select-month').value
      const year = document.getElementById('select-year').value
      const game = document.getElementById('select-game').value
      const link = document.getElementById('new-link').value
      const description = document.getElementById('new-description').value
      const data = {
        day: day,
        month: month,
        year: year,
        game: game,
        link: link,
        description: description
      }
      bus.$emit('sendAddGameDate', data)
      document.getElementById('select-day').value = ''
      document.getElementById('select-month').value = ''
      document.getElementById('select-year').value = ''
      document.getElementById('select-game').value = ''
      document.getElementById('new-link').value = ''
      document.getElementById('new-description').value = ''
    },
    deleteGameDate(id) {
      bus.$emit('sendDeleteGameDate', {id: id})
    }
  }
}
</script>

<style lang="scss">
.game-dates {
  table {
    margin: 12px auto;
    max-width: 90%;

    tr {
      th, td {
        border: 1px solid;
        padding: 6px;
      }
    }
  }
}
</style>
