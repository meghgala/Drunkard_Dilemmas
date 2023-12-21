<template>

<header>
  <h1>Drunkard Dilemmas</h1>
</header>

<body>
  <Particlesvue :options="{}"></Particlesvue>

  <div class="button-container">
  <div class="button-row">
    <router-link to="/select/" custom v-slot="{ navigate }">
      <button class="Create-Button" @click="handleButtonClick(navigate)" role="link">
        {{ uiLabels.createPoll }}
      </button>
    </router-link>
  

    <router-link to="/joinroom/" custom v-slot="{ navigate }">
      <button class="Join-Button" @click="handleButtonClick(navigate)" role="link">
        {{ uiLabels.participatePoll }}
      </button>
    </router-link>
  </div>
  </div>
  
  

  <section class="language"> {{ uiLabels.changeLanguage }}
        <div class="Flag-Button">
          <button class="Flag-Button" v-on:click="switchLanguage" :style="{ backgroundImage: 'url(' + uiLabels.flag + ')' }">
          </button>
        </div>
  </section>



</body>
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

<style scoped>

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
</style>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');


h1 {
    font-family: 'Indie Flower', cursive;
    text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-neon);
    color: var(--clr-neon);
    font-size: 4em;
    padding: 0.3em;
    position: relative;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
}

.button-row {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh
}

.Create-Button {
  color: var(--clr-neon2);
  background-color: transparent;
  border: 0.125em solid var(--clr-neon2);
  text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 7vw;
  width: 10vw;
}


.Join-Button {
  color: var(--clr-neon1);
  background-color: transparent;
  border: 0.125em solid var(--clr-neon1);
  text-shadow: 0 0 0.09em var(--clr-neon1), 0 0 0.65em var(--clr-neon1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 7vw;
  width: 10vw;
}

.Create-Button:hover {
  background-color: var(--clr-neon2);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}

.Join-Button:hover {
  background-color: var(--clr-neon1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon1);
}

.language {
    font-family: 'Indie Flower', cursive;
    font-weight: bolder;
    margin: 10vh 1vh;
    color:var(--clr-neon);
    font-size: 1.5em;
    text-shadow: 0 0 0.02em white, 0 0 3em var(--clr-neon);
}

.Flag-Button {
    justify-content: center;
    opacity: 0.75;
    transition: opacity 0.3s;
    background-size: 100% 100%;
    height: 7vw;
    width: 10vw;
    display: flex;
    margin: auto;
    cursor: pointer;
}

.Flag-Button:hover {
  opacity: 1;
}

</style>

