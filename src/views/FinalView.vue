<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
      <h2>
        {{ uiLabels.thewinner }} : {{ winner}}
      </h2>
    </body>
  </template>
    
  <script>
    import Bar from '../components/sipBar.vue'
    import io from 'socket.io-client';

    const socket = io(sessionStorage.getItem("dataServer"));
  
    export default {
      name: 'FinalView',
      components: {
        Bar
      },
      
      data() {
        return {
          lang: localStorage.getItem("lang") || "en", uiLabels: {},
          uiLabels: {},
          roomCode: '',
          winner: []
          };
      },
      
      created: function () {
        this.roomCode = this.$route.params.roomCode;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {this.uiLabels = labels})
        socket.on('finalWinnerRecieved', (winner) => {
          this.winner = winner.join(' and ');
        });
        socket.emit('getFinalWinner', this.roomCode);},
    };
  </script>
  
  