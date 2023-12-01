<template>
    <header>
        <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <section class="Buttons">
            <router-link  to="/join/" custom v-slot="{ navigate }">
              <button class="Button-Join" @click="navigate" role="link">
                  {{ uiLabels.participatePoll }}
              </button>
            </router-link>
        </section>
    </body>
</template>


<script>

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'StartView',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: localStorage.getItem("lang") || "en",
    }
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en") {
        this.lang = "sv"
      }
      else {
        this.lang = "en"
      }
      localStorage.setItem("lang", this.lang);
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>


<style>

body{
    background-color:#007672
}

header{
    background-color:#007672;
    font-family: 'Impact', sans-serif;
    color:#00c8c1;
    font-size: 4vmin;
    padding: 2em;
}

.Button-Join{
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
    background-color: #FF5929;
}

button {
    margin: 1vh 1vh;
    height: 15vh;
    width: 15vw;
    border: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    border-radius: 20pt;
    font-size: 5vmin;
    font-weight: bolder;
}

</style>

