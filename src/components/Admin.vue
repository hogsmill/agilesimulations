<template>
  <div>
    Facilitator
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.getters.getUserName
    }
  }
}
</script>
