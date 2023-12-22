<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <div>
      <p>
        {{ uiLabels.question }}: {{ questionText }}
      </p>
      <p>
        <Player 
            v-for="player in players"
                    v-bind:player="player" 
                    v-bind:key="player.name">
      </Player>
      </p>
    </div>
    <div class="next-button">
        <button :disabled="!selectionsMade" v-on::click="">
        {{ uiLabels.done }}
        </button>
    </div>
</template>
  
<script>
import Player from '../components/playerBox.vue'
import io from 'socket.io-client';
const socket = io("localhost:3000");

  export default {
    name: 'QuestionView',
    components: {
    Player
  },
    data() {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        questionText: '',
        roomCode: '',
        players: [],
        username: sessionStorage.username,
      };
    },
    created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    socket.on("questionsLoaded", (info) => {
      this.questionText = info.questions;
      this.players = info.players;
    })
    socket.emit("loadQuestions", this.roomCode)
  },

  computed: {
  },

  methods: {
    },
  };
</script>