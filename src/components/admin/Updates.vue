<template>
  <div class="admin-updates">
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
        <tr v-for="(u, index) in updates" :key="index">
          <td>
            <div v-if="editingDate != u.id">
              {{ u.year }}-{{ u.month }}-{{ u.day }}
              <i class="far fa-edit" @click="editDate(u.id)" />
            </div>
            <div v-if="editingDate == u.id">
              <Day :id="u.id" :day="u.day" /> /
              <Month :id="u.id" :month="u.month" /> /
              <Year :id="u.id" :year="u.year" />
              <i class="far fa-save" @click="saveDate(u.id)" />
            </div>
          </td>
          <td>
            <div v-for="(p, pindex) in u.text" :key="pindex">
              <i class="far fa-trash-alt" @click="deletePara(u.id, p)" />
              {{ p }}
            </div>
            <div>
              <i class="far fa-plus-square" @click="addPara(u.id)" />
              <input :id="'new-para-' + u.id" class="new-para" type="text">
            </div>
          </td>
          <td>
            <div v-if="editingImage != u.id">
              {{ u.image }}
              <i class="far fa-edit" @click="editImage(u.id)" />
            </div>
            <div v-if="editingImage == u.id">
              <input :id="'editing-image-' + u.id" type="text">
              <i class="far fa-save" @click="saveImage(u.id)" />
            </div>
          </td>
          <td>
            <div v-for="(tag, tindex) in u.tags" :key="tindex">
              <i class="far fa-trash-alt" @click="deleteTag(u.id, tag)" />
              {{ tag }}
            </div>
            <div>
              <i class="far fa-plus-square" @click="addTag(u.id)" />
              <input :id="'new-tag-' + u.id" class="new-tag" type="text">
            </div>
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="deleteUpdate(u.id)">
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
      editingImage: ''
    }
  },
  created() {
    bus.emit('sendLoadUpdates')

    bus.on('loadUpdates', (data) => {
      this.updates = data
    })
  },
  methods: {
    update(id) {
      return this.updates.find((d) => {
        return d.id == id
      })
    },
    addUpdate() {
      const day = document.getElementById('select-day').value
      const month = document.getElementById('select-month').value
      const year = document.getElementById('select-year').value
      const data = {
        day: day,
        month: month,
        year: year
      }
      bus.emit('sendAddUpdate', data)
    },
    deleteUpdate(id) {
      bus.emit('sendDeleteUpdate', {id: id})
    },
    editDate(id) {
      this.editingDate = id
    },
    saveDate(id) {
      const update = this.update(id)
      update.day = document.getElementById('select-day-' + id).value
      update.month = document.getElementById('select-month-' + id).value
      update.year = document.getElementById('select-year-' + id).value
      bus.emit('sendUpdateUpdate', update)
      this.editingDate = ''
    },
    addPara(id) {
      const update = this.update(id)
      const text = update.text
      const para = document.getElementById('new-para-' + id).value
      text.push(para)
      update.text = text
      bus.emit('sendUpdateUpdate', update)
      document.getElementById('new-para-' + id).value = ''
    },
    deletePara(id, para) {
      const update = this.update(id)
      const text = []
      for (let i = 0; i < update.text.length; i++) {
        if (update.text[i] != para) {
          text.push(update.text[i])
        }
      }
      update.text = text
      bus.emit('sendUpdateUpdate', update)
    },
    editImage(id) {
      this.editingImage = id
    },
    saveImage(id) {
      const update = this.update(id)
      update.image = document.getElementById('editing-image-' + id).value
      bus.emit('sendUpdateUpdate', update)
      this.editingImage = ''
    },
    addTag(id) {
      const update = this.update(id)
      const tags = update.tags
      const tag = document.getElementById('new-tag-' + id).value
      tags.push(tag)
      update.tags = tags
      bus.emit('sendUpdateUpdate', update)
      document.getElementById('new-tag-' + id).value = ''
    },
    deleteTag(id, tag) {
      const update = this.update(id)
      const tags = []
      for (let i = 0; i < update.tags.length; i++) {
        if (update.tags[i] != tag) {
          tags.push(update.tags[i])
        }
      }
      update.tags = tags
      bus.emit('sendUpdateUpdate', update)
    }
  }
}
</script>

<style lang="scss">
.admin-updates {
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

      td {
        vertical-align: top;

        .new-para {
          width: 90%;
        }
        .new-tag {
          width: 80%;
        }
      }
    }
  }
}
</style>
