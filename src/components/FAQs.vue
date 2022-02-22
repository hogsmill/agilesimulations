<template>
  <div class="container faqs" :class="{ 'mobile': mobile }">
    <h2>
      FAQs
    </h2>
    <p>
      Please use the <a @click="contact()">Contact Us</a> to ask any other questions.
    </p>
    <div>
      <div v-for="(faq, index) in faqs" :key="index" class="questions">
        <div class="question">
          <div class="icon">
            <i class="fas fa-question-circle" />
          </div>
          <div class="text" v-html="faq.question" />
        </div>
        <div class="answer">
          <div class="icon">
            <i class="fas fa-info-circle" />
          </div>
          <div class="text" v-html="faq.answer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    faqs() {
      return this.$store.getters.getFaqs
    }
  },
  created() {
    bus.emit('sendLoadFaqs')

    bus.on('loadFaqs', (data) => {
      this.$store.dispatch('updateFaqs', data)
    })
  },
  methods: {
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .faqs {

    h2 {
      text-align: center;
    }

    .contact {
      font-weight: bold;
    }

    .questions {

      border-top: 1px solid #f4511e;

      .question {
        margin-top: 24px;
      }

      .answer {
        margin-bottom: 24px;

        a {
          font-weight: bold;
        }
      }

      div div {
        display: table-cell;
        vertical-align: middle;

        &.icon {
          width: 60px;
          text-align: center;
          font-size: xx-large;

          i {
            color: #f4511e;
          }
        }
        &.text {
        }
      }
    }
  }
</style>
