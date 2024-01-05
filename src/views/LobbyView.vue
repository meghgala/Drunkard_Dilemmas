<template>
  <header>
    <h1>DRUNKARD <br> DILEMMAS</h1>
    <div class="roomcode-box">
      <div class="code"> {{ roomCode }}</div>
    </div>    
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <h2>{{ uiLabels.lobby }}</h2>
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

    <div class="back-button-container">
      <div class="back-button">
          <button class="back" v-on:click="handleButtonClick">
          {{ uiLabels.back }}
          </button>
      </div>
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
      handleButtonClick() {
      this.$router.push('/input/' + this.roomCode);
    },
    }
  }

</script>
  

<style scoped>

  * {
    justify-content: center;
  }

  header {
    top: 1vh;
    left: 1vh;
    position: fixed;
    display: inline-grid;
    grid-template-columns: auto auto;
    justify-content: left;
    column-gap: 5vw;
  }

  .roomcode-box {
    border: 0.125em solid var(--clr-back);
    box-shadow: inset 0 0 0.5em 0 var(--clr-back), 0 0 0.5em 0 var(--clr-back);
    background-color: transparent;
    border-radius: 15px;
    display: flex;
  }

  .code {
    font-size: clamp(0.1vw, 2.5vw, 5vw);
    padding: 0em 0.5em 0em 0.5em; 
    margin: auto 0em auto 0em;
    
  }

  h1 {
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
  line-height: 0.8;
  font-size: clamp(1vw, 3vw, 4vw);
  margin: 0em;  
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

  .back {
  height: 8vh;
  width: 15vw;
  font-size: clamp(0.1vw, 2.5vw, 3vw);
  }
  }
</style>