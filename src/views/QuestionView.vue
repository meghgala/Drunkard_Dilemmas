<template>
  <header>
    <h1>DRUNKARD <br> DILEMMAS</h1>
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <h3>{{ uiLabels.question }} {{ index }} of {{ numQuestions }}</h3>
    <h2 class="question">
      {{ questionText }}
    </h2>
    <p>
      <Player 
        v-for="player in players"
          v-bind:player="player" 
          v-bind:key="player.name"
          v-on:selectedPlayer="recieveSelectedPlayer($event)">
      </Player>
    </p>
    <Bar v-bind:players="players"></Bar>
    <div class="next-button">
      <button class="done" :disabled="!selectionsMade" v-on::click="emitSelectedPlayer">
        {{ uiLabels.done }}
      </button>
    </div>
  </body>
</template>
  
<script>
  import Player from '../components/playerButton.vue'
  import Bar from '../components/sipBar.vue'
  import io from 'socket.io-client';
  import Particlesvue from '@/components/Particlesvue.vue'

  const socket = io(sessionStorage.getItem("dataServer"));

  export default {
    name: 'QuestionView',
    components: {
      Player,
      Bar,
      Particlesvue
    },
    
    data() {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        questionText: '',
        roomCode: '',
        players: [],
        username: sessionStorage.username,
        selectedPlayer: '',
        index: 0,
        numQuestions: 0,
        };
    },
    
    created: function () {
      this.roomCode = this.$route.params.roomCode;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {this.uiLabels = labels});
      socket.on("playerSelected", (d) => {if (d) {this.$router.push('/winner/' + this.roomCode)}
        socket.off('playersAnswered');
        socket.off('winnerGotten');
      });
      socket.on("questionsLoaded", (info) => {
        this.questionText = info.questions;
        this.players = info.players;
        this.index = info.index + 1
        this.numQuestions = info.amount
      });
      socket.emit("loadQuestions", this.roomCode);
    },

    computed: {
      selectionsMade() {
              return (this.selectedPlayer !== '' )
          }
    },

    methods: {
      recieveSelectedPlayer(player) {
        this.selectedPlayer = player
        console.log(this.selectedPlayer, "have been selected")
      },

      emitSelectedPlayer() {
        socket.emit('selectPlayer', {roomCode: this.roomCode, player: this.selectedPlayer, voter: this.username});
      }
    },
  };
</script>

<style scoped>
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
    font-size: 3em;
    margin-top: 150px;
    position: flex;
    justify-content: center;
  }

h3 {
  word-spacing: 1vw;
}

.done{
  color: var(--clr-green);
  border: 0.125em solid var(--clr-green);
  text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
  box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;
  height: 10vh;
  width: 24vw;
}

.done:hover{
  background-color: var(--clr-green);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-green);
}

@media (max-width: 600px) {

  h2 {
    margin-top: 150px;
    font-size: clamp(0.1vh, 7vh, 8vh);
    word-wrap: break-word;
    margin-top: 220px;
    width: 98%;
  }

  .done {
    font-size: clamp(1vw, 4vw, 4vw); 
    width: 150px;
  }
}

</style>

