<template>
  <div class="suggest container-fluid text-center" :class="{ 'not-mobile': !mobile }">
    <div class="row">
      <div class="col-sm-5 center">
        <p v-if="!mobile" class="icon">
          <i class="far fa-lightbulb" />
        </p>
        <p class="text-left">
          We're constantly on the lookout for new agile games and activities that
          would benefit from the Agile Simulations treatment. The kind of thing we
          are looking for are those activities that you wouold normally do round a
          table; say in a retro or as a warm up activity.
        </p>
        <p class="text-left">
          We want to bring these activities to remote teams so they can intreract
          in a way that is as close to being round the same table as possible.
        </p>
        <p class="text-left">
          If you're wondering if your idea is suitable, ask these questions:
        </p>
        <ul class="text-left">
          <li>
            Does it involve lego, coins, playing cards or some other physical object
            that gets passed between participants?
          </li>
          <li>
            Does it demonstrate something about agile, lean, teams, etc.? Does it
            engender mindset change?
          </li>
          <li>
            Is it really frustrating, or impossible to play it over Zoom or Teams?
          </li>
        </ul>
        <p class="text-left">
          If so, it's probably of interest...
        </p>
      </div>
      <div class="col-sm-6 form-group">
        <input class="form-control" id="suggest-name" name="name" placeholder="Name" type="text" required>
      </div>
      <div class="col-sm-6 form-group">
        <input class="form-control" id="suggest-email" name="email" placeholder="Email" type="email" required>
      </div>
      <div class="col-sm-6 form-group">
        <textarea class="form-control" id="suggest-comments" name="comments" placeholder="What is your game idea?" rows="20" /><br>
      </div>
      <div class="col-sm-6 form-group">
        <button id="suggest" class="btn btn-info pull-right" @click="sendSuggestion()">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import mailFuns from '../../lib/mail.js'

export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  methods: {
    sendSuggestion() {
      mailFuns.post({
        action: 'Game Suggestion from Agile Simulations',
        name: encodeURIComponent(document.getElementById('suggest-name').value),
        email: encodeURIComponent(document.getElementById('suggest-email').value),
        comments: encodeURIComponent(document.getElementById('suggest-comments').value)
        },
        'Thanks for your suggestion - we\'ll get back to you soon!'
      )
    }
  }
}
</script>

<style lang="scss">
.suggest {

  &.not-mobile {
    width: 80%;
    margin: 0 auto;
  }

  .icon {
    text-align: center;
  }

  .far {
    font-size: 72px;
    color: #f4511e;
  }
}
</style>
