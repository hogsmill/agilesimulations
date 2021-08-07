<template>
  <div class="updates">
    <table>
      <thead>
        <tr>
          <th>
            Date
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
            <div v-if="editingDate != update.id">
              {{ update.year }}-{{ update.month }}-{{ update.day }}
              <i class="far fa-edit" @click="editDate(update.id)" />
            </div>
            <div v-if="editingDate == update.id">
              <Day :id="update.id" :day="update.day" /> /
              <Month :id="update.id" :month="update.month" /> /
              <Year :id="update.id" :year="update.year" />
              <i class="far fa-save" @click="saveDate(update.id)" />
            </div>
          </td>
          <td />
          <td>
          <div v-if="editingImage != update.id">
            {{ update.image }}
            <i class="far fa-edit" @click="editImage(update.id)" />
          </div>
          <div v-if="editingImage == update.id">
            <input :id="'editing-image-' + update.id" type="text">
            <i class="far fa-save" @click="saveImage(update.id)" />
          </div>
          </td>
          <td>
            <div v-for="(tag, index) in update.tags" :key="index">
              <i class="far fa-trash-alt" @click="deleteTag(update.id, tag)" />
              {{ tag }}
            </div>
            <div>
              <i class="far fa-plus-square" @click="addTag(update.id)" />
              <input :id="'new-tag-' + update.id" type="text">
            </div>
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
      updates: [],
      editingDate: '',
      editingImage: '',
      editingTags: ''
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
    },
    editDate(id) {
      this.editingDate = id
    },
    saveDate(id) {
      const update = this.updates.find((d) => {
        return d.id == id
      })
      update.day = document.getElementById('select-day-' + id).value
      update.month = document.getElementById('select-month-' + id).value
      update.year = document.getElementById('select-year-' + id).value
      bus.$emit('sendUpdateUpdate', update)
      this.editingDate = ''
    },
    editImage(id) {
      this.editingImage = id
    },
    saveImage(id) {
      const update = this.updates.find((d) => {
        return d.id == id
      })
      update.image = document.getElementById('editing-image-' + id).value
      bus.$emit('sendUpdateUpdate', update)
      this.editingImage = ''
    },
    addTag(id) {
      const update = this.updates.find((d) => {
        return d.id == id
      })
      const tags = update.tags
      const tag = document.getElementById('new-tag-' + id).value
      tags.push(tag)
      update.tags = tags
      bus.$emit('sendUpdateUpdate', update)
      document.getElementById('new-tag-' + id).value = ''
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

      td {
        vertical-align: top;
      }
    }
  }
}
</style>
