<template>
  <div>
    <h2>
      Company Updates
      <a href="/updates.xml">
        <i class="fas fa-rss-square" />
      </a>
    </h2>
    <div v-for="(update, index) in updates" :key="index" class="update">
      <div v-if="!rss.id || rss.id == update.id">
        <h3>
          Status Update {{ updateDate(update) }}
        </h3>
        <div v-if="update.image" class="update-image" :class="updateImageClass(update.image)" />
        <p v-if="!mobile">
          <b>Welcome to the weekly status update to everyone interested in the progress at Agile Simulations. We've been busy...</b>
        </p>
        <p v-for="(para, pindex) in update.text" :key="pindex" v-html="para" />
        <p>
          As ever, feedback on all apps is welcomed, and get in touch for more info, or to discuss faciltation or using the games as part of your training/work.
        </p>
        <p class="tags">
          <span v-for="(tag, tindex) in update.tags" :key="tindex">
            #{{ tag }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    rss() {
      return this.$store.getters.getRss
    },
    updates() {
      return this.$store.getters.getUpdates
    }
  },
  methods: {
    updateImageClass(image) {
      return image.split('.')[0]
    },
    updateDate(update) {
      const month = update.month < 10 ? '0' + update.month : update.month
      const day = update.day < 10 ? '0' + update.day : update.day
      return update.year + '-' + month + '-' + day
    }
  }
}
</script>
