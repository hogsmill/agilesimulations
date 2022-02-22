<template>
  <div id="epiphanising-tab" class="container-fluid text-center more-tab">
    <div class="row slideanim">
      <div>
        <i class="fab section-icon fa-grav" />
      </div>
      <h2>Epiphanising...</h2>
      <div class="col-sm-12">
        <p>
          However engaging or fun a game is, the real value of these games is the "light-bulb"
          moment when players realise they have learned a great truth which challenges or engenders
          changes in their mindset.
        </p>
        <p>
          This is a much more powerful way to help players uncover their agile mindset than lecturing;
          discovery outstrips lecturing and logical argument every time.
        </p>
        <p>
          These games are designed to ensure this happens. The kinds of realisations that happen
          through playing the games are:
        </p>
        <div>
          <ul>
            <li>
              Why delivering highest (customer) value items first reduces risk, even in
              regulatory environments
            </li>
            <li>
              Why estimation is bound to fail, and what to do about it
            </li>
            <li>
              Why rapid delivery and feedback can be a better strategy than striving
              for "perfection" in delivering what customers want
            </li>
            <li>
              Why always doing other teams' work before your own is the best way to
              maximize flow in a highly interdependent system
            </li>
            <li>
              The true cost of context switching
            </li>
          </ul>
        </div>
        <p>
          And all this in a fun, engaging team-building game - it is a very powerful
          way to teach agile concepts on their own, or as part of wider training
          courses.
        </p>
        <p>
          <a @click="setTab('main')"><i class="far fa-hand-point-left back" /> Go Back</a>
        </p>
        <p>
          For those who are interested, here's the tech we used to build the games...
        </p>
      </div>
    </div>
    <div class="row slideanim">
      <div class="tech" />
    </div>
    <div class="contact">
      <p>
        <a @click="contact()">Contact Us</a> for more info...
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
#epiphanising-tab {

  ul {
    max-width: 600px;
    margin:0 auto 12px auto;

    li {
      text-align: left;
    }
  }
}
</style>
