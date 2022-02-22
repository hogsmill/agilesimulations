<template>
  <div>
    <Feedback />
    <Login />
    <Labs />
    <Pricing />
  </div>
</template>

<script>
import Feedback from './modals/Feedback.vue'
import Login from './modals/Login.vue'
import Labs from './modals/Labs.vue'
import Pricing from './modals/Pricing.vue'

export default {
  components: {
    Feedback,
    Login,
    Labs,
    Pricing
  }
}
</script>

<style scoped lang="scss">

  ::v-deep .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .modal-content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    width: 90%;
    max-width: 850px;
  }
  .modal__title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
  }

  .feedback {
    letter-spacing: 0;
    color: #212529;
  }

  p.feedback-form {
    margin-bottom: 12px;
  }

  .feedback-form {
    width: 80%;
    margin: 0 auto;
  }
</style>
