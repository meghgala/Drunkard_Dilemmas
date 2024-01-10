<template>

  <header>
    <h1>DRUNKARD DILEMMAS</h1>
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
  import Particlesvue from '@/components/Particlesvue.vue'
  
  sessionStorage.setItem("dataServer", "192.168.1.56:3000")
  sessionStorage.setItem("dataServer", "130.243.153.58:3000")
  const socket = io(sessionStorage.getItem("dataServer"));
  
  export default {
    name: 'StartView',
    data: function () {
      return {
        uiLabels: {},
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
      },
  
      handleButtonClick: function (navigate) {
        navigate();
      },
    },
  };
  </script>
  
<style>

@import url('https://fonts.googleapis.com/css2?family=Gruppo');
@import url('https://fonts.cdnfonts.com/css/hello-denver-display');

* {
  font-family: 'Gruppo';
  color:var(--clr-text1);
}

h1 {
  color:var(--clr-title);
  font-family: 'HELLO DENVER DISPLAY REGULAR', sans-serif;
}
  
:root {
  --clr-title: #00c8c1;
  --clr-blue1:rgb(12, 185, 237);
  --clr-blue2:rgb(10, 78, 196);
  --clr-blue3:rgb(23, 100, 232);
  --clr-blue4:rgb(3, 66, 173);
  --clr-back:rgb(232, 19, 185);
  --clr-green: rgb(120, 248, 7);
  --clr-red: rgb(248, 7, 7);
  --clr-orange: rgb(248, 136, 7);
  --clr-white:#ffffff;
  --clr-bg : #10011e;
  --clr-text1: rgb(255, 255, 120);
}
</style>

<style scoped>
  
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

h1 {
    text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
    font-size: clamp(0.1vh, 10vh, 10vh);
    font-size: 5vmax;
    padding: 0.3em;
    position: relative;
}
  
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
}
  
.button-row {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 16vw;
}

.Create-Button, .Join-Button {
  background-color: transparent;
  border-radius: 15px;
  font-weight: bolder;
  font-size: clamp(1rem, 2.5vw, 3rem);
  cursor: pointer;
  height: 10vw;
  width: 15vw;
}

.Create-Button {
  color: var(--clr-green);
  border: 0.125em solid var(--clr-green);
  text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
  box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
}

.Join-Button {
  color: var(--clr-back);
  border: 0.125em solid var(--clr-back);
  text-shadow: 0 0 0.09em var(--clr-back), 0 0 0.65em var(--clr-back);
  box-shadow: inset 0 0 0.5em 0 var(--clr-back), 0 0 0.5em 0 var(--clr-back);
}
  
.Create-Button:hover, .Join-Button:hover {
  background-color: var(--clr-blue1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue1);
  border-radius: 15px;
}

.Create-Button:hover {
  background-color: var(--clr-green);
  box-shadow: 0 0 2em 0 var(--clr-green);
}

.Join-Button:hover {
  background-color: var(--clr-back);
  box-shadow: 0 0 2em 0 var(--clr-back);
}
.language {
  font-weight: bolder;
  margin: 1vh 1vh;
  font-size: clamp(0.11vw, 1.5vw, 2vw);
  text-shadow: 0 0 0.02em white, 0 0 3em var(--clr-text1);
  position: fixed;
  top: 1vh;
  right: 1vh;
}
  
.Flag-Button {
  justify-content: center;
  opacity: 0.75;
  transition: opacity 0.3s;
  background-size: 100% 100%;
  height: 5vw;
  width: 7vw;
  display: flex;
  margin: auto;
  cursor: pointer;
}
  
.Flag-Button:hover {
  opacity: 1;
}

@media screen and (max-width: 600px) {
  .Create-Button, .Join-Button {
    height: 20vh;
    width: 40vw;
    border-radius: 15px;
    font-size: clamp(0.1vh, 4vh, 5vh);
  }

  .button-row {
    gap: 10vw;
  }

  h1 {
    margin-top: 10vh;
    font-size: clamp(0.1vh, 6vh, 10vh);
  }

  .language {
    font-size: clamp(0.11vw, 3vw, 3vw);
  }

  .Flag-Button {
    height: 4vh;
    width: 10vw;
  }
}
  
</style>