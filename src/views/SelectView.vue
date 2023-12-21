<template>

<header>
  <h1></h1>
</header>

<body>
  <Particlesvue :options="{}"></Particlesvue>

    <h2>{{ uiLabels.selectgame }}</h2>
    <div class="button-container">
    <div class="button-row">
      <button class="game1" :class="{ active: selectedGame === 'Game1' }" @click="selectGame('Game1', 'game')">{{ uiLabels.whointheroom }}</button>
      <button class="game2" :class="{ active: selectedGame === 'Game2' }" @click="selectGame('Game2', 'game')">{{ uiLabels.gametwo }}</button>
      <button class="game3" :class="{ active: selectedGame === 'Game3' }" @click="selectGame('Game3', 'game')">{{ uiLabels.gamethree }}</button>
    </div>
    </div>

    <div class="name-container">
    <div class="name-code-row">
      <!--<label for="creator-name"><h3>{{ uiLabels.name }}</h3></label>-->
      <input class="name-input" v-model="creatorName" type="text" id="creator-name" :placeholder="uiLabels.entername" />
      <div class="roomcode-box"> 
        <span class="room-code" v-if="roomCode"><!--{{ uiLabels.roomcode }}: -->{{ roomCode }}</span>
      </div>
      
      <!--<h3>{{ uiLabels.generateroomcode }}</h3>-->
      <div class="roomcode-output">
      
      <button class="generate-roomcode" @click="generateRoomCode">{{ uiLabels.generateroomcode }}</button>
    </div>
    </div>
    </div>

    <section class="language"> {{ uiLabels.changeLanguage }}
      <div class="lang-container">
        <div class="dir-button-row">
          <button class="back" v-on:click="$router.go(-1)">
          {{ uiLabels.back }}
          </button>
        </div>
        <div class="Flag-Button">
          <button class="Flag-Button" v-on:click="switchLanguage" :style="{ backgroundImage: 'url(' + uiLabels.flag + ')' }">
          </button>
        </div>
        <div class="dir-button-row">
          <button class="next" :disabled="!selectionsMade" v-on::click="emitSelections">
          {{ uiLabels.next }}
          </button>
        </div>
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
        roomCode: "",
        selectedGame: null,
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
        this.id = this.$route.params.id;
        socket.on('uniqueChecked', (code) => {if (code !== 0) {this.roomCode = code} else {generateRoomCode()}});
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
        this.uiLabels = labels})
        socket.on('selectionsMade', (d) => {
            if (d) {
            sessionStorage.username = this.creatorName;
            this.$router.push('/settings/' + this.roomCode)} 
            else {alert('Fel')}})
    },

    computed: {
        selectionsMade() {
            return (
        this.selectedGame !== null &&
        this.creatorName !== '' &&
        this.roomCode !== null
      );
        }
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
        selectGame(game) {
          if (this.selectedGame === game) {
            this.selectedGame = null;
    }     else {
            this.selectedGame = game;
        }
      },
      generateRoomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 6;
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
            }
        socket.emit('checkUnique', {tryCode: code});
        },
        emitSelections() {
            console.log(this.roomCode, this.selectedGame, this.creatorName);
            socket.emit('creatorSelections', {roomCode: this.roomCode, game: this.selectedGame, creator: this.creatorName});
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
      }
    }
}
  </script>

  <style>
  :root {
  --clr-neon: #00c8c1;
  --clr-neon1:rgb(12, 185, 237);
  --clr-neon2:rgb(12, 185, 237);
  --clr-neon4:#ffffff;
  --clr-neon5:#1F51FF;
  --clr-bg : #10011e;
  --clr-text1: rgb(255, 255, 120);

}</style>
  
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

  
h2 {
  font-family: 'Indie Flower', cursive;
  text-shadow: 0 0 0.2em white, 0 0 6em yellow;;
  color:rgb(255, 255, 156);
  font-size: 4em;
  position: relative;
  margin-top: 10px;
}

h3, h4, .room-code {
  font-family: 'Indie Flower', cursive;
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-neon);
  color:#00c8c1;
  font-size: 2em;
  position: relative;
}

h4 {
  margin-top: -35px;
  margin-bottom: 0px;
}

.roomcode-output {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.game1, .game2, .game3 {
  color: var(--clr-neon2);
  border: 0.125em solid var(--clr-neon2);
  text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
  background-color: transparent;
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 7vw;
  width: 10vw;
}
.game1:hover, .game2:hover, .game3:hover {
  background-color: var(--clr-neon2);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}
.game1.active, .game2.active, .game3.active {
  background-color: var(--clr-neon2);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}

.name-input {
  color: var(--clr-neon1);
  border: 0.125em solid var(--clr-neon1);
  text-shadow: 0 0 0.09em var(--clr-neon1), 0 0 0.65em var(--clr-neon1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
  background-color: white;
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 3vw;
  width: 20vw;
}
.name-code-row {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 10vh;
  margin-top: 5vh;
}

.name-input:hover {
  background-color: var(--clr-neon1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon1);
}

.generate-roomcode {
  color: var(--clr-neon1);
  border: 0.125em solid var(--clr-neon1);
  text-shadow: 0 0 0.09em var(--clr-neon1), 0 0 0.65em var(--clr-neon1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
  background-color: transparent;
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 3.5vw;
  width: 20vw;
  margin-right: 15px;
}

.generate-roomcode:hover {
  background-color: var(--clr-neon1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon1);
}

.roomcode-box {
  border: 0.125em solid var(--clr-neon1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
  background-color: transparent;
  height: 3vw;
  width: 12vw;
}

.back, .next {
  background-color: transparent;
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 7vw;
  width: 10vw;
}
.next {
  color: var(--clr-neon2);
  border: 0.125em solid var(--clr-neon2);
  text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
}

.back {
  color: rgb(232, 19, 185);
  border: 0.125em solid rgb(232, 19, 185);
  text-shadow: 0 0 0.09em rgb(232, 19, 185), 0 0 0.65em rgb(232, 19, 185);
  box-shadow: inset 0 0 0.25em 0 rgb(232, 19, 185), 0 0 0.25em 0 rgb(232, 19, 185);
}

.next:hover, .back:hover {
  color: var(--clr-bg);
  text-shadow: none;
}

.next:hover {
  background-color: var(--clr-neon2);
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}

.back:hover {
  background-color: var(--clr-neon1);
  box-shadow: 0 0 2em 0 var(--clr-neon1);
}

.dir-button-row {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh
}

.lang-container {
  display: flex;
  justify-content: center;
  padding: 0 30%;
  align-items: center;
  justify-content: center;
  height: 20vh;
}

.language {
    font-family: 'Indie Flower', cursive;
    font-weight: bolder;
    margin: 5vh 1vh;
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
  
  