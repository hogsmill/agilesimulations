<template>
  <div>
    <h2>More info about Agile Simulations</h2>
    <div class="about-info">
      <p class="intro">
        Recently, we interviewed the director of Agile Simulations about their ways
        of working and general thinking around agile. Here's what he said.
      </p>
      <p class="intro">
        (<i>Actually we didn't <b> really</b> do an interview, but it seemed a fun way
        to present the information</i>)
      </p>
      <div class="interview">
        <p>
          <b>Agile News Reporter: <i>Nice to meet you. Can I start by asking why you
          started Agile Simulations? </i></b>
        </p>
        <p>
          <b>Steve Wells [Director Agile Simulations]: </b>Absolutely. (<i>this section will
          get filled in soon :-) </i>)
        </p>
        <p>
          <b>ANR: <i>You talk a lot about development practices, XP and shift-left testing,
          reducing waste, rapid delivery and feedback and other such good things. Do you
          "eat your own dog food" and do these things with your development practices?</i></b>
        </p>
        <p>
          <b>SW: </b>I also say "eat your own dog food" a lot <i class="far fa-laugh-squint" />.
          But, yes, I do try and practice what I  preach. I develop most of the stuff on my own
          so, unfortunately, pairing is out of the window, but I'm certainly all about rapid
          delivery and feedback. I go straight to live with any code changes - the largest checkins (and
          pushes) will be a few lines of code at most. Users can test the latest changes almost
          as soon as they are written.
        </p>
        <p>
          I actively seek our collaborators to pair with, and I'm always on the lookout for
          meetups and conferences to play - test! - the games and get feedback. This seems to
          be the most effective way to uncover what game players and workshop attendees realy need
          and expect.
        </p>
        <p>
          <b>ANR: <i>And testing? TDD and such?</i></b>
        </p>
        <p>
          <b>SW: </b>I'll be perfectly honest, I could have more comprehensive tests! There are
          some, but most testing is - to my shame - a bit manual. However, keeping tests up
          to date when the games change so rapidly would be very problematic, and would
          seriously slow down customer feedback, so I'm not <i>too</i> bothered. Plus, TBF,
          these aren't critical systems; nothing bad will happen if they don't quite work, and
          the learnings can usually be gained even with the odd glitch.
        </p>
        <p>
          There is always a trade off between speed of learning and quality, and in this
          situation, I believe erring on the speed of learning is the right approach.
        </p>
        <p>
          <b>ANR: <i>Any other aspects of your development processes our readers might
          find interesting?</i></b>
        </p>
        <p>
          <b>SW: </b>Well we do practice "No Broken Windows" and "Zero Tolerance On
          Bugs".
        </p>
        <p>
          <b>ANR: <i>Can you explain?</i></b>
        </p>
        <p>
          <b>SW: </b>They're actually the same thing, but in different circumstances.
          "No Broken Windows" basically means don't put off any issues. Either sort them
          now, or ignore them forever. No keeping a tech debt backlog or TODO list of
          future stuff. So, as an example, <code>npm</code> modules are always kept
          up-to-date, however trivial the updates. Software packages are upgraded as
          soon as they are available, and so on. It takes time but cheaper than coding
          round features and bugs that get subsequently fixed.
        </p>
        <p>
          "Zero Tolerance On Bugs" means, for any bug that is found or raised by a user, I
          make an instant decision - am I going to fix it? If so, I will fix it now. Absolutely
          right now; forget context switching - if it's going to be fixed, it gets fixed right now.
          If not, it is thrown away; no bug lists, no endlessly considering bugs that will
          never get fixed. Sounds harsh, but it's way cheaper in the long run...
        </p>
        <p>
          <b>ANR: <i>Can you tell us what tech you use for the games, or is that
          to secret?</i></b>
        </p>
        <p>
          <b>SW: </b>No problem, it's all open-source components, so nothing top
          secret (<i>this bit also to be filled in later</i>)
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .about-info {
    max-width: 850px;
    margin: 0 auto;

    padding: 2px 12px;

    .intro {
      font-size: large;
    }

    .interview {
      padding: 0 24px;
    }
  }
</style>
