<template>
  <div class="updates">
    <table>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Text
          </th>
          <th>
            Image
          </th>
          <th>
            Tags
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
          <td />
          <td />
          <td />
          <td>
            <button class="btn btn-primary smaller-font" @click="addUpdate()">
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
            Text
          </th>
          <th>
            Image
          </th>
          <th>
            Tags
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(update, index) in updates" :key="index">
          <td>
            {{ update.year }}-{{ update.month }}-{{ update.day }}
          </td>
          <td />
          <td />
          <td />
          <td>
            <button class="btn btn-primary smaller-font" @click="deleteUpdate(update.id)">
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

export default {
  components: {
    Day,
    Month,
    Year
  },
  data() {
    return {
      updates: []
    }
  },
  created() {
    bus.$emit('sendLoadUpdates')

    bus.$on('loadUpdates', (data) => {
      this.updates = data
    })
  },
  methods: {
    addUpdate() {
      const day = document.getElementById('select-day').value
      const month = document.getElementById('select-month').value
      const year = document.getElementById('select-year').value
      const data = {
        day: day,
        month: month,
        year: year
      }
      bus.$emit('sendAddUpdate', data)
    },
    deleteUpdate(id) {
      bus.$emit('sendDeleteUpdate', {id: id})
    }
  }
}
</script>

<style lang="scss">
.updates {
  table {
    margin: 12px auto;

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
