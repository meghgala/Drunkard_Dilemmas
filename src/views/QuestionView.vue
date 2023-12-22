<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <div>
      {{ questionText }}
      {{ players }}
    </div>
</template>
  
<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

  export default {
    name: 'QuestionView',
    data() {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        questionText: '',
        questions: [],
        questionIndex: 0,
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