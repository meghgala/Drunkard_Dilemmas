<template>
  <header>
    <h1>DRUNKARD <br> DILEMMAS</h1>
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <h2>
      {{ uiLabels.thewinner }} : {{ winner}}
    </h2>
    <button v-if="creator === 'true'" class="quit" v-on:click="quitgame"> 
      {{ uiLabels.quitgame }}
    </button>
    <button v-if="creator === 'true'" class="new" v-on:click="newgame"> 
      {{ uiLabels.newgame }}
    </button>
    <Bar class="bar" v-bind:players="players"></Bar>
  </body>
</template>
    
<script>

  import io from 'socket.io-client';
  import Particlesvue from '@/components/Particlesvue.vue'
  import Bar from '../components/sipBar.vue'

  const socket = io(sessionStorage.getItem("dataServer"));

  export default {
    name: 'FinalView',
    components: {
      Particlesvue,
      Bar
    },
    
    data() {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        uiLabels: {},
        roomCode: '',
        winner: [],
        players: [],
        creator: sessionStorage.creator,
      };
    },
    
    created: function () {
      this.roomCode = this.$route.params.roomCode;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {this.uiLabels = labels})
      socket.on('finalWinnerRecieved', (winner) => {
        this.winner = winner.join(this.uiLabels.and);
      });
      socket.on("playersFetched", (players) => {
        this.players = players.done;
      });
      socket.emit("fetchPlayers", this.roomCode)
      socket.on("newGamePrepared", (d) => {if (d) {this.$router.push('/input/' + this.roomCode)}
      });
      socket.on("gameDeleted", (d) => {if (d) {this.$router.push('/')
      }});
      socket.emit('getFinalWinner', this.roomCode);
    },

    methods: {
      newgame () {
        socket.emit("newGame", this.roomCode)
      },

      quitgame () {
        socket.emit("deleteGame", {roomCode: this.roomCode})
      }
    }
  };

</script>

<style scoped>

  h1 {
    text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
    top: 1vh;
    left: 1vh;
    margin-top: 5vh;
    line-height: 0.8;
    font-size: clamp(1vw, 3vw, 4vw);
  }

  h2 {
      font-size: 3em;
  }

  button {
    background-color: transparent;
    font-weight: bolder;
    font-size: clamp(0.1rem, 1.5vw, 1.5rem);
    cursor: pointer;
    border-radius: 15px;
    height: 10vh;
    width: 24vw;
    margin: 20px;
  }

  .quit {
    color: var(--clr-red);
    border: 0.125em solid var(--clr-red);
    text-shadow: 0 0 0.09em var(--clr-red), 0 0 0.65em var(--clr-red);
    box-shadow: inset 0 0 0.5em 0 var(--clr-red), 0 0 0.5em 0 var(--clr-red);
  }

  .new {
    color: var(--clr-green);
    border: 0.125em solid var(--clr-green);
    text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
    box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
  }

  button:hover {
    background-color: var(--clr-orange);
    color: var(--clr-bg);
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-orange);
  }

  .quit:hover {
    background-color: var(--clr-red);
    box-shadow: 0 0 2em 0 var(--clr-red);
  }
  .new:hover {
    background-color: var(--clr-green);
    box-shadow: 0 0 2em 0 var(--clr-green);
  }


  @media (max-width: 600px) {
   h1 {
    margin-top: 10vh;
    font-size: clamp(0.1vh, 6vh, 10vh);
  }

   h2 {
    font-size: clamp(0.1vh, 7vh, 8vh);
    margin-top: 2vh;
  }

  button{
    font-size: clamp(1vw, 4vw, 4vw);
  }

  .bar {
    margin-top: 500px;
  }
}

</style>
  