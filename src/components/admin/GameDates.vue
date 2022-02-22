<template>
  <div class="admin-game-dates">
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
            Location
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
            <div v-if="editingDate != date.id">
              {{ date.year }}-{{ date.month }}-{{ date.day }}
              <i class="far fa-edit" @click="editDate(date.id)" />
            </div>
            <div v-if="editingDate == date.id">
              <Day :id="date.id" :day="date.day" /> /
              <Month :id="date.id" :month="date.month" /> /
              <Year :id="date.id" :year="date.year" />
              <i class="far fa-save" @click="saveDate(date.id)" />
            </div>
          </td>
          <td>
            <div v-if="editingLocation != date.id">
              {{ date.location ? date.location.name : 'Worldwide' }}
              <i class="far fa-edit" @click="editLocation(date.id)" />
            </div>
            <div v-if="editingLocation == date.id">
              <select :id="'select-location-' + date.id" :value="date.location ? date.location.code : ''" @change="saveLocation(date.id)">
                <option value="">
                  -- Select --
                </option>
                <option v-for="(country, cindex) in countries" :key="cindex" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
            </div>
          </td>
          <td>
            <div v-if="editingGame != date.id">
              {{ date.game }}
              <i class="far fa-edit" @click="editGame(date.id)" />
            </div>
            <div v-if="editingGame == date.id">
              <Games :id="date.id" :game="date.game" />
              <i class="far fa-save" @click="saveGame(date.id)" />
            </div>
          </td>
          <td>
            <div v-if="editingLink != date.id">
              {{ date.link }}
              <i class="far fa-edit" @click="editLink(date.id)" />
            </div>
            <div v-if="editingLink == date.id">
              <input :id="'editing-link-' + date.id" :value="date.link">
              <i class="far fa-save" @click="saveLink(date.id)" />
            </div>
          </td>
          <td>
            <div v-if="editingDescription != date.id">
              {{ date.description }}
              <i class="far fa-edit" @click="editDescription(date.id)" />
            </div>
            <div v-if="editingDescription == date.id">
              <input :id="'editing-description-' + date.id" :value="date.description">
              <i class="far fa-save" @click="saveDescription(date.id)" />
            </div>
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
      dates: [],
      editingDate: '',
      editingLocation: '',
      editingGame: '',
      editingLink: '',
      editingDescription: '',
      countries: [
        {name: 'UK', code: 'uk'},
        {name: 'India', code: 'india'},
        {name: 'USA', code: 'us'},
        {name: 'Belarus', code: 'belarus'}
      ]
    }
  },
  created() {
    bus.emit('sendLoadGameDates')

    bus.on('loadGameDates', (data) => {
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
      bus.emit('sendAddGameDate', data)
      document.getElementById('select-day').value = ''
      document.getElementById('select-month').value = ''
      document.getElementById('select-year').value = ''
      document.getElementById('select-game').value = ''
      document.getElementById('new-link').value = ''
      document.getElementById('new-description').value = ''
    },
    deleteGameDate(id) {
      bus.emit('sendDeleteGameDate', {id: id})
    },
    editLocation(id) {
      this.editingLocation = id
    },
    saveLocation(id) {
      const date = this.dates.find((d) => {
        return d.id == id
      })
      const location = document.getElementById('select-location-' + id).value
      date.location = this.countries.find((c) => {
        return location == c.code
      })
      bus.emit('sendUpdateGameDate', date)
      this.editingLocation = ''
    },
    editDate(id) {
      this.editingDate = id
    },
    saveDate(id) {
      const date = this.dates.find((d) => {
        return d.id == id
      })
      date.day = document.getElementById('select-day-' + id).value
      date.month = document.getElementById('select-month-' + id).value
      date.year = document.getElementById('select-year-' + id).value
      bus.emit('sendUpdateGameDate', date)
      this.editingDate = ''
    },
    editGame(id) {
      this.editingGame = id
    },
    saveGame(id) {
      const date = this.dates.find((d) => {
        return d.id == id
      })
      date.game = document.getElementById('select-game-' + id).value
      bus.emit('sendUpdateGameDate', date)
      this.editingGame = ''
    },
    editLink(id) {
      this.editingLink = id
    },
    saveLink(id) {
      const date = this.dates.find((d) => {
        return d.id == id
      })
      date.link = document.getElementById('editing-link-' + id).value
      bus.emit('sendUpdateGameDate', date)
      this.editingLink = ''
    },
    editDescription(id) {
      this.editingDescription = id
    },
    saveDescription(id) {
      const date = this.dates.find((d) => {
        return d.id == id
      })
      date.description = document.getElementById('editing-description-' + id).value
      bus.emit('sendUpdateGameDate', date)
      this.editingDescription = ''
    }
  }
}
</script>

<style lang="scss">
.admin-game-dates {
  table {
    margin: 12px auto;
    max-width: 90%;

    tr {
      th, td {
        border: 1px solid;
        padding: 6px;
      }

      th {
        text-align: center;
      }
    }
  }
}
</style>
