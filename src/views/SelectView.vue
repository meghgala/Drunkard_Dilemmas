<template>

<header>
  <h1>Drunkard <br> Dilemmas</h1>
</header>

<body>
  <Particlesvue :options="{}"></Particlesvue>

    <h2>{{ uiLabels.selectgame }}</h2>
    <div class="button-container">
    <div class="button-row">
      <button class="button game1" :class="{ active: selectedGame === 'Game1' }" @click="selectGame('Game1', 'game')">{{ uiLabels.whointheroom }}</button>
      <button class="button game2" :class="{ active: selectedGame === 'Game2' }" @click="selectGame('Game2', 'game')">{{ uiLabels.gametwo }}</button>
      <button class="button game3" :class="{ active: selectedGame === 'Game3' }" @click="selectGame('Game3', 'game')">{{ uiLabels.gamethree }}</button>
    </div>
    </div>

    <div class="name-container">
    <div class="name-code-row">
      <input class="button name-input" v-model="creatorName" type="text" id="creator-name" :placeholder="uiLabels.entername" />
    <div class="roomcode-output">
      <button class="button generate-roomcode" @click="generateRoomCode">{{ uiLabels.generateroomcode }}</button>
    </div>
    </div>
    </div>

    <div class="roomcode-container">
    <div class="roomcode-box" v-if="roomCode"> 
        <span class="room-code" v-if="roomCode" ref="roomCodeElement" @click="copyRoomCode">{{ roomCode }}</span>
        <div v-if="copyConfirmation" class="copy-confirmation">{{ uiLabels.copyConfirmation }}</div>

      </div>
    </div>

    <div class="next-button-container">
    <div class="next-button">
        <button class="button next" :disabled="!selectionsMade" v-on::click="emitSelections">
        {{ uiLabels.next }}
        </button>
    </div>
    </div>

    <div class="back-button-container">
    <div class="back-button">
        <button class="back" v-on:click="handleButtonClick(() => this.$router.push('/'))">
        {{ uiLabels.back }}
        </button>
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
        copyConfirmation: '',
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

    copyRoomCode() {    
    const textArea = document.createElement('textarea');
    textArea.value = this.roomCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.copyConfirmation = 'Room code copied!';
    setTimeout(() => this.copyConfirmation = '', 3000);
  },
      
    switchLanguage: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      localStorage.setItem("lang", this.lang);
      socket.emit("switchLanguage", this.lang);
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
      handleButtonClick: function (navigate) {
        navigate();
      }
    }
}
  </script>

<style>
:root {
  --clr-title: #00c8c1;
  --clr-blue1:rgb(12, 185, 237);
  --clr-blue2:rgb(10, 78, 196);
  --clr-blue3:rgb(23, 100, 232);
  --clr-blue4:rgb(3, 66, 173);
  --clr-back:rgb(232, 19, 185);
  --clr-white:#ffffff;
  --clr-bg : #10011e;
  --clr-text1: rgb(255, 255, 120);
}
</style>
  
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');


* {
    font-family: 'Indie Flower', cursive;
    text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-text1);
    color:var(--clr-text1);
    justify-content: center;
  }
h1 {
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
  color:var(--clr-title);
  position: fixed;
  top: 1vh;
  left: 1vh;
  margin-top: -0.1vh;
  line-height: 0.8;
}

h2 {
  font-size: 3em;
}

h3, h1 {
  font-size: 2em;
}

.room-code {
  font-size: clamp(0.1rem, 2.5vw, 5rem);
}

.button {
  color: var(--clr-blue1);
  border: 0.125em solid var(--clr-blue1);
  text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;

}

.button:hover, .game1.active, .game2.active, .game3.active {
  background-color: var(--clr-blue1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue1);
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
}

.roomcode-container {
    display: flex;
    margin-top: 8vh;
    height: 3vw;
  }

  .next-button-container {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  margin-top: 10vh;
}

.roomcode-output {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.copy-confirmation {
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
}

.button-row {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh
}
.game1, .game2, .game3 {
  height: 8vw;
  width: 12vw;
}

.name-code-row {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh;
  margin-top: 5vh;
}
.name-input {
  height: 3vw;
  width: 22vw;
  text-align: center;
}

.name-input::placeholder {
  color: var(--clr-blue1);
}

.name-input:hover::placeholder {
  color: var(--clr-bg);
}


.generate-roomcode {
  height: 3.5vw;
  width: 22vw;
}

.roomcode-box {
  border: 0.125em solid var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
  background-color: transparent;
  height: 100%;
  width: 12vw;
  border-radius: 15px;
}

.next {
  height: 7vw;
  width: 10vw;
}

.back {
  position: fixed;
  bottom: 1vh;
  left: 1vh;
  border-radius: 50%;
  height: 3vw;
  width: 3vw;
  color: var(--clr-back);
  border: 0.125em solid var(--clr-back);
  text-shadow: 0 0 0.09em var(--clr-back), 0 0 0.65em var(--clr-back);
  box-shadow: inset 0 0 0.5em 0 var(--clr-back), 0 0 0.5em 0 var(--clr-back);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1vw, 0.8vw, 1.5rem);
  cursor: pointer;
}

.back:hover {
  background-color: var(--clr-back);
  box-shadow: 0 0 2em 0 var(--clr-back);
  color: var(--clr-bg);
  text-shadow: none;
}

.language {
    font-weight: bolder;
    margin: 1vh 1vh;
    color:var(--clr-text1);
    font-size: clamp(0.1rem, 1.2vw, 1.5rem);;
    position: fixed;
    top: 1vh;
    right: 1vh;
}

.Flag-Button {
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
  
  </style>
  
  