<template>
  <header>
    <h1>Drunkard Dilemmas</h1>
  </header>
  <body>
    <p>
      {{ uiLabels.question }}: {{ questionText }}
    </p>
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
      <button :disabled="!selectionsMade" v-on::click="emitSelectedPlayer">
        {{ uiLabels.done }}
      </button>
    </div>
  </body>
</template>
  
<script>
  import Player from '../components/playerButton.vue'
  import Bar from '../components/sipBar.vue'
  import io from 'socket.io-client';
  const socket = io("localhost:3000");

  export default {
    name: 'QuestionView',
    components: {
      Player,
      Bar
    },
    
    data() {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        questionText: '',
        roomCode: '',
        players: [],
        username: sessionStorage.username,
        selectedPlayer: '',
        };
    },

    beforeDestroy() {
    socket.off('qestionsLoaded');
    socket.off('playerSelected');
    },
    
    created: function () {
      this.roomCode = this.$route.params.roomCode;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {this.uiLabels = labels})
      socket.on("playerSelected", (d) => {if (d) {this.$router.push('/winner/' + this.roomCode)} })
      socket.on("questionsLoaded", (info) => {
        this.questionText = info.questions;
        this.players = info.players;
      })
      socket.emit("loadQuestions", this.roomCode)
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
        socket.emit('selectPlayer', {roomCode: this.roomCode, player: this.selectedPlayer});
      }
    },
  };
</script>

