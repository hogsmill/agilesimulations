<template>
  <div class="container faqs" :class="{ 'mobile': mobile }">
    <h2>
      FAQs
    </h2>
    <p>
      Please use the Contact tab to ask any other questions.
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
          <div class="text">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: 'I\'ve been using the Coin Game for a while now, but I can no longer see the Facilitator tab where I can set up my teams and team members. Why is this?',
          answer: 'Unfortunately, for a variety of cost and technical reasons, we can no longer provide these features for free, and will have to charge a nominal - hopefully easily manageable - monthly fee. Please check the Pricing tab for details'
        }
      ]
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  }
}
</script>

<style lang="scss">
  .faqs {

    h2 {
      text-align: center;
    }

    .questions {

      .answer {
        margin-bottom: 24px;
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
