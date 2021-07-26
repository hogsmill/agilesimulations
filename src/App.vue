<template>
  <div>
    <Header />
    <Jumbotron />
    <div class="content">
      <Main v-if="tab == 'main'" />
      <MonteCarlo v-if="tab == 'monte-carlo'" />
      <Pipeline v-if="tab == 'pipeline'" />
      <NoEstimatesMobile v-if="tab == 'no-estimates-mobile'" />
      <Games v-if="tab == 'games'" />
      <Engaging v-if="tab == 'engaging'" />
      <Epiphanising v-if="tab == 'epiphanising'" />
      <Relevant v-if="tab == 'relevant'" />
      <Pricing v-if="tab == 'pricing'" />
      <FAQs v-if="tab == 'faqs'" />
      <Resources v-if="tab == 'resources'" />
      <Labs v-if="tab == 'labs'" />
      <Diary v-if="tab == 'diary'" />
      <About v-if="tab == 'about'" />
      <Suggest v-if="tab == 'suggest'" />
      <TandCs v-if="tab == 'tandcs'" />
      <Security v-if="tab == 'security'" />
      <Footer v-if="!mobile" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Jumbotron from './components/Jumbotron.vue'
import Main from './components/Main.vue'
import MonteCarlo from './components/games/MonteCarlo.vue'
import Pipeline from './components/games/Pipeline.vue'
import NoEstimatesMobile from './components/games/NoEstimatesMobile.vue'
import Engaging from './components/main/Engaging.vue'
import Epiphanising from './components/main/Epiphanising.vue'
import Relevant from './components/main/Relevant.vue'
import Games from './components/Games.vue'
import Pricing from './components/Pricing.vue'
import FAQs from './components/FAQs.vue'
import Resources from './components/Resources.vue'
import Labs from './components/Labs.vue'
import About from './components/About.vue'
import Suggest from './components/labs/Suggest.vue'
import TandCs from './components/footer/TandCs.vue'
import Security from './components/footer/Security.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Jumbotron,
    Main,
    MonteCarlo,
    Pipeline,
    NoEstimatesMobile,
    Engaging,
    Epiphanising,
    Relevant,
    Games,
    Pricing,
    Resources,
    FAQs,
    Labs,
    About,
    Suggest,
    TandCs,
    Security,
    Footer
  },
  data() {
    return {
      selectedTab: '',
      windowWidth: 0
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    tab() {
      return this.$store.getters.getTab
    }
  },
  created() {
    this.$store.dispatch('updateMobile', window.outerWidth < 768)
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: "Lato";
  src: local("Lato"),
   url(./assets/fonts/lato/Lato-Regular.ttf) format("truetype");
}

* {
  font-family: Lato, Helvetica, Arial, sans-serif;
  color: #444;
}
body, p {
  font-weight: 400;
  font-size: 15px;
  line-height: 1.8;
}
h2 {
  font-size: 36px;
  margin-bottom: 30px !important;
  color: #666;
}
h4 {
  font-size: 24px;
  line-height: 1.375em;
  font-weight: 400;
  margin-bottom: 30px;
  color: #666;
}
b, strong {
  color: #444!important;
}
.section-icon {
  font-size: 50px;
  color: #f4511e;
  margin: 10px auto;
}
</style>
