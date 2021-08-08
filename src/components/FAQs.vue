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
  data() {
    return {
      answer: '',
      faqs: [
        {
          question: 'I\'ve been using the <b>Coin Game</b> for a while now, but I can no longer see the Facilitator tab where I can set up my teams and team members. Why is this?',
          answer: 'Unfortunately, for a variety of cost and technical reasons, we can no longer provide these features for free, and will have to charge a nominal - hopefully easily manageable - monthly fee. Please check the <a href="https://agilesimulations.co.uk?pricing">Pricing</a> tab for details'
        },
        {
          question: 'I\'d like to run <b>No Estimates</b> with some people face-to-face in the office in a conference room, but others remote? Is this possible?',
          answer: 'Absolutely. Those in the room can show the board on a central display, and use the No Estimates Mobile app to make their moves. Those remotely play as normal. This gives all the benefits of playing online (real-time data, etc.), but also a face-to-face experience'
        },
        {
          question: 'I like the <b>Spotify Health Check</b>, but I\'d like to use slightly different wording in the questions, and add a couple of my own. Is this possible?',
          answer: 'Like all the "assessment" apps, you can easily add, delete and customise the questions to your needs. All trending and aggregation functions will simply just work, whatever your questions.'
        }
      ]
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  methods: {
    contact() {
      bus.$emit('contact', {})
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
