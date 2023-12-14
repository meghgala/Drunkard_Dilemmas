hej
<template>
  <div>
    <body>
      <Particlesvue :options="{}"></Particlesvue>
      <div class="content-container">
      <h1>Drunkard Dilemmas</h1>
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
    </div>
    </body>
  </div>
</template>

<script>
import io from 'socket.io-client';
import confetti from 'canvas-confetti';
import Particlesvue from '@/components/Particlesvue.vue'

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
  components: {
    Particlesvue,
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

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
:root {
  --clr-neon: #00c8c1;
  --clr-neon1:#a60e87;
  --clr-neon2:#18ae39;
  --clr-neon4:#ffffff;
  --clr-bg : #10011e;
  --clr-text1: rgb(255, 255, 120);
}

.Particlesvue {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Set z-index to place it behind other elements */
}

.content-container {
  position: relative;
  z-index: 1; /* Set z-index to place it above the particles */
}

h1{
    font-family: 'Indie Flower', cursive;
    text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-neon);
    color:#00c8c1;
    font-size: 4em;
    padding: 0.3em;
    position: relative;
}

.Buttons {
  display: flex;
  justify-content: center;
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
    font-family: 'Indie Flower', cursive;
    margin-left: 5%;
    margin-right: 5%;
    height: 3.5em;
    width: 40%;
    padding: 0.25em 1em;
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: 3rem;
    text-decoration: none;
    background-color: transparent;
}

.language {
    font-family: 'Indie Flower', cursive;
    font-weight: bolder;
    margin: 10vh 1vh;
    color:#00c8c1;
    font-size: 1.5em;
    text-shadow: 0 0 0.02em white, 0 0 3em var(--clr-neon);
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
    background-size: 100% 100%;
    height: 7vw;
    width: 10vw;
    display: block;
    margin: auto;
}

.Flag-Button:hover {
  opacity: 1;
}

</style>

