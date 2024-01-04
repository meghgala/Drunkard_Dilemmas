<template>
  <header>
    <h1>DRUNKARD <br> DILEMMAS</h1>
    </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <h2>{{ uiLabels.lobby }}</h2>
    <h3> {{ uiLabels.roomCode }} : {{ roomCode }} </h3>
    <div id="box-container">
      <div id="player_creating">
        <p class="player-text">
          {{ uiLabels.waiting }}:
          <Player 
            v-for="player in playersloading"
            v-bind:player="player" 
            v-bind:key="player.name">
          </Player>            
        </p>
      </div>
      <div id="player_done">
        <p class="player-text">
          {{ uiLabels.done }}!
          <div class="player-list">
            <Player 
              v-for="player in playersdone"
              v-bind:player="player" 
              v-bind:key="player.name">
            </Player>
          </div>
        </p>
      </div>
    </div>
    <div v-if="creator === 'true'">
      <button class="start" v-on:click="emitGame">
        {{ uiLabels.startgame }}
      </button>
    </div>
  </body>
</template>
  
  
<script>
  import Player from '../components/playerBox.vue'
  import Particlesvue from '@/components/Particlesvue.vue'

  import io from 'socket.io-client';
 
  const socket = io(sessionStorage.getItem("dataServer"));

  export default {
    name: 'LobbyView',
    components: {
      Player,
      Particlesvue
    },

    data: function () {
      return {
        lang: localStorage.getItem("lang") || "en",
        uiLabels: {},
        roomCode: '',
        playersloading: [],
        playersdone: [],
        username: sessionStorage.username,
        creator: sessionStorage.creator,
      }
    },

    created: function () {
      this.roomCode = this.$route.params.roomCode;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      });
      socket.on('playerUpdate', (players) => {
          this.playersdone = players.done
          this.playersloading = players.waiting});
      socket.emit('enterLobby', {roomCode: this.roomCode, username: this.username});
      socket.on('Gamestarted', (d) => {if (d) {this.$router.push('/questions/' + this.roomCode)}})
    },

    methods: {
      emitGame() {
          socket.emit('Startgame', {roomCode: this.roomCode})
      },
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
    --clr-yellow: rgb(255, 255, 120);
  }
</style>

<style scoped>

  * {
    justify-content: center;
  }

  h1 {
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
  position: fixed;
  top: 1vh;
  left: 1vh;
  margin-top: -0.1vh;
  line-height: 0.8;
  font-size: clamp(1vw, 3vw, 4vw);
  }

  h2 {
  font-size: clamp(0.1vh, 8vh, 10vh);
  margin-top: 1vh;
  }

  h3{
    text-shadow: 0 0 0.2em white, 0 0 6em var(--clr-yellow);
    color: var(--clr-yellow);
    font-size: clamp(0.1vh, 6vh, 7vh);
    margin-top: -3vh;
    margin-bottom: -2vh;
  }
  .player-text {
    font-size: clamp(0.1vh, 4vh, 5vh);
  }

  #box-container {
      display: flex;
      justify-content: center;
  }

  .player-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  #player_creating {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--clr-yellow);
    border: 0.125em solid var(--clr-yellow);
    text-shadow: 0 0 0.09em var(--clr-yellow), 0 0 0.65em var(--clr-yellow);
    box-shadow: inset 0 0 0.5em 0 var(--clr-yellow), 0 0 0.5em 0 var(--clr-yellow);
    margin: 2em;
    height: 60vh;
    width: 40vw;
    border-radius: 2%;
  }

  #player_done {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--clr-yellow);
    border: 0.125em solid var(--clr-yellow);
    text-shadow: 0 0 0.09em var(--clr-yellow), 0 0 0.65em var(--clr-yellow);
    box-shadow: inset 0 0 0.5em 0 var(--clr-yellow), 0 0 0.5em 0 var(--clr-yellow);
    margin: 2em;
    height: 60vh;
    width: 40vw;
    border-radius: 2%;
  }


  .start{
    color: var(--clr-green);
    border: 0.125em solid var(--clr-green);
    text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
    box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: clamp(1vw, 2vw, 2vw);
    text-decoration: none;
    background-color: transparent;
    height: 10vh;
    width: 24vw;
  }

  .start:hover{
    background-color: var(--clr-green);
    box-shadow: 0 0 2em 0 var(--clr-green);
    color: var(--clr-bg);
    text-shadow: none;
  }

  @media (max-width: 600px) {
   h3 {
    font-size: clamp(0.1vh, 4vh, 5vh);
    margin-top: 0vh;
   }

   h2 {
    font-size: clamp(0.1vh, 7vh, 8vh);
    margin-top: 2vh;
  }
  .start {
    font-size: clamp(1vw, 4vw, 4vw);
  }

  #player_creating, #player_done {
    height: 45vh;
    width: 80vw;
    overflow: auto;
  }
  }
</style>