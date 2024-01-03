<template>
  <header>
      <h1>Drunkard <br> Dilemmas</h1>
    </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <label class="title">Lobby</label>
    <div id="box-container">
      <div id="player_creating">
        <p>
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
    <button class="back" v-on:click="handleButtonClick(() => this.$router.push('/input/' + this.roomCode))">
      {{ uiLabels.back }}
    </button>
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
    --clr-yellow: rgb(255, 255, 120);
  }
</style>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');


  * {
    font-family: 'Indie Flower', cursive;
    color:var(--clr-yellow);
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

  .title{
    text-shadow: 0 0 0.2em white, 0 0 6em var(--clr-yellow);
    color: var(--clr-yellow);
    font-size: 5em;
    font-family: 'Indie Flower', cursive;
    margin-top: 20em;
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
    height: 40em;
    width: 40em;
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
    height: 40em;
    width: 40em;
    border-radius: 2%;
  }

  .back {
    position: fixed;
    bottom: 1vh;
    left: 1vh;
    border-radius: 50%;
    height: 4vw;
    width: 4vw;
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

  .start{
    color: var(--clr-blue1);
    border: 0.125em solid var(--clr-blue1);
    text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: 2em;
    text-decoration: none;
    background-color: transparent;
    width: 10em;
  }

  .start:hover{
    background-color: var(--clr-blue1);
    box-shadow: 0 0 2em 0 var(--clr-blue1);
    color: var(--clr-bg);
    text-shadow: none;
  }
</style>