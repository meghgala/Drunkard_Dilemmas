<template>
  <div>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
      <div id = "particles-js"></div>
      <section class="Buttons">
        <router-link to="/select/" custom v-slot="{ navigate }">
          <button class="Button-Create" @click="handleButtonClick(navigate)" role="link">
            {{ uiLabels.createPoll }}
          </button>
        </router-link>
        <router-link to="/joinroom/" custom v-slot="{ navigate }">
          <button class="Button-Join" @click="handleButtonClick(navigate)" role="link">
            {{ uiLabels.participatePoll }}
          </button>
        </router-link>
      </section>
      <section class="language">
        {{ uiLabels.changeLanguage }}
        <div class="Flag-Button">
          <button class="Flag-Button" v-on:click="switchLanguage" :style="{ backgroundImage: 'url(' + uiLabels.flag + ')' }">
          </button>
        </div>
      </section>
    </body>
  </div>
</template>

<script>
import io from 'socket.io-client';
import confetti from 'canvas-confetti';

const socket = io("localhost:3000");

export default {
  name: 'StartView',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: localStorage.getItem("lang") || "en",
    };
  },
  mounted: function () {
    console.log('Vue app mounted');
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {

    switchLanguage: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      localStorage.setItem("lang", this.lang);
      socket.emit("switchLanguage", this.lang);
      this.initializeConfetti();
    },
    initializeConfetti: function () {
      const duration = Infinity;
      const confettiOptions = {
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
      };
      confetti(confettiOptions);
    },
    handleButtonClick: function (navigate) {
      this.initializeConfetti();
      navigate();
    },
  },
};
</script>


<style>

:root {
  --clr-neon: #00c8c1;
  --clr-neon1:#a60e87;
  --clr-neon2:#18ae39;
  --clr-bg : #10011e;
}

body{
    background-color: var(--clr-bg)
}

header{
    font-family: 'Impact', sans-serif;
    text-shadow: 0 0 0.02em white, 0 0 3em var(--clr-neon);
    color:#00c8c1;
    font-size: 4vmin;
    padding: 1em;
    padding-bottom: 3em;
    position: relative;
}

.Buttons{
    display: grid;
}

.Button-Create{
    grid-column: 1;
    grid-row: 2;
    justify-self: end;
    color: var(--clr-neon2);
    border: var(--clr-neon2) 0.125em solid;
    text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
    box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
    
}

.Button-Join{
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
    color: var(--clr-neon1);
    border: var(--clr-neon1) 0.125em solid;
    text-shadow: 0 0 0.09em var(--clr-neon1), 0 0 0.65em var(--clr-neon1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
}

button {
    margin-left: 4em;
    margin-right: 4em;
    height: 3.5em;
    width: 7em;
    padding: 0.25em 1em;
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: 3rem;
    text-decoration: none;
    background-color: transparent;
}

.language {
    font-size: 2vmin;
    font-weight: bolder;
    margin: 10vh 1vh;
    color: var(--clr-neon);
    text-shadow: 0 0 0.09em white, 0 0 0.65em var(--clr-neon);
}

.Button-Create:hover {
  background-color: var(--clr-neon2);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}

.Button-Join:hover {
  background-color: var(--clr-neon1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon1);
}

.Flag-Button {
    opacity: 0.75;
    transition: opacity 0.3s;
    background-size: cover;
}

.Flag-Button:hover {
    opacity: 1;
}

</style>

