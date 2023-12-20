<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <div>
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
        questionCounter: 0,
        roomCode: '',
        username: sessionStorage.username,
      };
    },
    created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    socket.emit('retrieveSettings', {roomCode: this.roomCode});
    socket.on('settingsReceived', (NumQuestions) => {
      this.NumQuestions = parseInt(NumQuestions)});    
  },

  computed: {
  },

  methods: {
    },
  };
</script>