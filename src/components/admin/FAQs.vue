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
        <tr v-for="(faq, index) in faqs" :key="index">
          <td>
            {{ faq.question }}
          </td>
          <td>
            {{ faq.answer }}
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="deleteFaq(faq.id)">
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

export default {
  data() {
    return {
      faqs: [],
      editingQuestion: '',
      editingAnswer: ''
    }
  },
  created() {
    bus.emit('sendLoadFaqs')

    bus.on('loadFaqs', (data) => {
      this.faqs = data
    })
  },
  methods: {
    addFaq() {
       const question = document.getElementById('new-question').value
       const answer = document.getElementById('new-answer').value
       const data = {
         question: question,
         answer: answer
       }
       bus.emit('sendAddFaq', data)
       document.getElementById('new-question').value = ''
       document.getElementById('new-answer').value = ''
    },
    deleteFaq(id) {
      bus.emit('sendDeleteFaq', {id: id})
    },
  }
}
</script>

<style lang="scss">
.admin-faqs {
  table {
    margin: 12px auto;
    max-width: 90%;

    th {
      text-align: center;
    }

    td {
      text-align: top;
    }

    th, td {
      border: 1px solid;
      padding: 6px;
    }
  }
}
</style>
