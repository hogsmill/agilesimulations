<template>
  <div>
    Engaging
    <button class="btn btn-info" @click="setTab('main')">
      Back
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    }
  }
}
</script>
