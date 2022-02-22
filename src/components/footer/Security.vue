<template>
  <div class="t-and-cs">
    <h2>
      Security
      <i class="fas fa-lock" />
    </h2>
    <p>
      This page outlines the security policy for the Agile Simulations's Website,
      located at
      <a href="https://agilesimulations.co.uk">https://agilesimulations.co.uk</a>.
    </p>
    <p>
      All games, workshops and simulations (<i>hereforth referred to as "applications"</i>)
      run on your own personal browser. Agile Simulations take no responsibility for
      the security of your browser or any issues arising from using a browser to
      play our applications.
    </p>
    <p>
      However, we do take all reasonable steps to ensure the applications are fully
      secure, including, but not limited to:
    </p>
    <ul>
      <li>
        Keeping all client facing npm modules up-to-date and patching any known
        security issues (<i>github informs us of these automatically</i>)
      </li>
      <li>
        Keeping all (Linux) server OSs up-to-date, including applying all
        security patches.
      </li>
      <li>
        Having extensive monitoring and logging in place to identify any security
        issues.
      </li>
      <li>
        Limiting access to the server through firewall rules such as limiting
        incoming port access and limiting access protocols
      </li>
      <li>Encrypting all inbound and outbound traffic using https to avoid attacks.</li>
      <li>
        Ensuring all code conforms to best-practice security policies such as input
        validation to stop XSS attacks.
      </li>
    </ul>
    <p>
      Please <a @click="contact()">Contact Us</a> for more information.
    </p>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  methods: {
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .t-and-cs {
    padding: 12px;
    color: #888;

    h2 {
      text-align: center;

      i {
        color: #f4511e;
      }
    }
  }
</style>
