<template>
  <div class="pipeline">
    <h2>
      The Pipeline Game
    </h2>
    <div class="under-construction">
      <i class="fas fa-tools" />
    </div>
    <div>
      <div v-if="!mobile" class="pic" />
      <p>
        The pipeline game is under construction. If you'd like more details
        do <a @click="contact()">get in touch</a> and we can tell you where we're at.
      </p>
      <p>
        The basic idea behind the game is to explore the relationship between
        quality and learning; is it better to (<i>slowly</i>) deliver bug-free software,
        or (<i>quickly</i>) deliver with known bugs to increase the speed of learning
        what the customer wants?
      </p>
      <p>
        You might deliver with bugs for a variety of reasons, such as...
      </p>
      <ul>
        <li>
          It takes time to triage and fix bugs, which slows delivery
        </li>
        <li>
          The customer may never come across the bug anyway
        </li>
        <li>
          If you deliver rapidly enough. bugs won't be live for very long anyway
        </li>
      </ul>
      <p>
        Of course, delivering bugs could reduce customer satisfaction, so could be risky.
        On the other hand, delivering slowly so that it takes longer to discover the
        customer's needs could also reduce satisfaction and risk losing customers.
      </p>
      <p>
        This is what this game is designed to explore...
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  created() {
    window.scrollTo(0, 0)
  },
  methods: {
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .pipeline {
    padding: 0 36px;
    max-width: 956px;
    margin: 0 auto;

    h2 {
      text-align: center;
    }

    .under-construction {
      height: 70px;
      width: 70px;
      margin: 0 auto;
      background-color: gold;
      border: 3px solid #000;
      border-radius: 35px;
      padding: 12px;
      margin-bottom: 24px;

      .fa-tools {
        color: #000;
        font-size: 40px;
      }
    }

    .pic {
      float: right;
      background-image: url("../../assets/img/screenshots/pipeline-game.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      height: 212px;
      width: 460px;
      margin: 0 0 24px 24px;
    }
  }
</style>
