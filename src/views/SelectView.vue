<template>
    <div>
      <body>
        <Particlesvue :options="{}"></Particlesvue>
        <div class="content-container">
        <h1>Drunkard Dilemmas</h1>
        <div class="Gamebuttons">
            <h3>{{ uiLabels.selectgame }}</h3>
                <button :class="{ active: selectedGame === 'Game1' }" @click="selectGame('Game1', 'game')">{{ uiLabels.whointheroom }}</button>
                <button :class="{ active: selectedGame === 'Game2' }" @click="selectGame('Game2', 'game')">{{ uiLabels.gametwo }}</button>
                <button :class="{ active: selectedGame === 'Game3' }" @click="selectGame('Game3', 'game')">{{ uiLabels.gamethree }}</button>
        </div>
        <div class="Name">
            <label for="creator-name">Name</label>
            <input v-model="creatorName" type="text" id="creator-name" placeholder="Enter your name" />
        </div>
        <div class="Roomcode">
            <h3>{{ uiLabels.generateroomcode }}</h3>
            <button @click="generateRoomCode">{{ uiLabels.generateroomcode }}</button>
            <p v-if="roomCode">{{ uiLabels.roomcode }}: {{ roomCode }}</p>
        </div>
        <div class="Directionbuttons">
            <button class="back" v-on:click="$router.go(-1)">
              {{ uiLabels.back }}
            </button>
            <button class="next" :disabled="!selectionsMade" v-on::click="emitSelections" role="link">
                    {{ uiLabels.next }}
            </button>
        </div>
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
        roomCode: "",
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
      )
        }
    },
    methods: {
        selectGame(game) {
        this.selectedGame = game;
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
        
        
        socket.emit('checkUnique', { tryCode: code }),
        socket.on('uniqueChecked', (d) => {
          if (d) {
            this.roomCode = code
          } else {
            this.generateRoomCode()
          }
        })
      },
      emitSelections() {
        console.log(this.roomCode, this.selectedGame, this.creatorName);
        socket.emit('creatorSelections', { roomCode: this.roomCode, game: this.selectedGame, creator: this.creatorName });
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
    --clr-bg : #10011e;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  overflow:visible;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 10px;
}
  
.Particlesvue {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
  
.content-container {
    position: relative;
    z-index: 1;
}
  
h1{
      font-family: 'Indie Flower', cursive;
      text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-neon);
      color:#00c8c1;
      font-size: 4em;
      padding: 0.3em;
      position: relative;
}
  
.Gamebuttons {  
    display: flex;
    justify-content: center;
    align-items: center;
}

.Roomcode {
    display: flex;
    justify-content: center;
    align-items: center;
}

.Directionbuttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.Gamebuttons,
.Roomcode,
.Directionbuttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.Gamebuttons button,
.Roomcode button,
.Directionbuttons button, 
.Name input {
    flex: 1;
    max-width: 200px;
    margin-bottom: 10px;
}

.Gamebuttons button {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    color: var(--clr-neon2);
    border: var(--clr-neon2) 0.125em solid;
    text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
    box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
      
}
  
.Roomcode button {
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
    color: var(--clr-neon1);
    border: var(--clr-neon1) 0.125em solid;
    text-shadow: 0 0 0.09em var(--clr-neon1), 0 0 0.65em var(--clr-neon1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
}

.Directionbuttons button {
    grid-column: 2;
    grid-row: 3;
    justify-self: start;
    color: var(--clr-neon1);
    border: var(--clr-neon1) 0.125em solid;
    text-shadow: 0 0 0.09em var(--clr-neon1), 0 0 0.65em var(--clr-neon1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-neon1), 0 0 0.5em 0 var(--clr-neon1);
}

.Gamebuttons button:hover {
    background-color: var(--clr-neon2);
    color: var(--clr-bg);
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-neon2);
}

.Roomcode button:hover {
    background-color: var(--clr-neon1);
    color: var(--clr-bg);
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-neon1);
}
  

.Directionbuttons button:hover {
    background-color: var(--clr-neon1);
    color: var(--clr-bg);
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-neon1);
}
  
  </style>
  
  