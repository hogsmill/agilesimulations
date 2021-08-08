<template>
  <div class="admin-faqs">
    <table>
      <thead>
        <tr>
          <th>
            Question
          </th>
          <th>
            Answer
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-question" type="text">
          </td>
          <td>
            <input id="new-answer" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addFaq()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      faqs: [],
      editingQuestion: '',
      editingAnswer: ''
    }
  },
  created() {
    bus.$emit('sendFaqs')

    bus.$on('loadFaqs', (data) => {
      this.faqs = data
    })
  },
  methods: {
    addFaq() {

    }
  }
}
</script>

<style lang="scss">
.admin-faqs {
  table {
    margin: 12px auto;

    th {
      text-align: center;
    }

    th, td {
      border: 1px solid;
      padding: 6px;
    }
  }
}
</style>
