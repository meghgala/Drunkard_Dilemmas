<template>
    <header>
      <h1>DRUNKARD <br> DILEMMAS</h1>
    </header>
    <body>
      <h2>
        {{ uiLabels.thewinner }} : {{ winner}}
      </h2>
      <button v-if="creator" v-on:click="quitgame"> {{ uiLabels.quitgame }}</button>
      <button v-if="creator" v-on:click="newgame"> {{ uiLabels.newgame }}</button>
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
          winner: [],
          creator: sessionStorage.creator,
          };
      },
      
      created: function () {
        this.roomCode = this.$route.params.roomCode;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {this.uiLabels = labels})
        socket.on('finalWinnerRecieved', (winner) => {
          this.winner = winner.join(' and ');;});
        socket.on("newGamePrepared", (d) => {if (d) {this.$router.push('/input/' + this.roomCode)}})
        socket.on("gameDeleted", (d) => {if (d) {this.$router.push('/')}})
        socket.emit('getFinalWinner', this.roomCode);},

      methods: {
        newgame () {
          socket.emit("newGame", this.roomCode)
        },
        quitgame () {
          socket.emit("deleteGame", {roomCode: this.roomCode})
        },
        }
    
    };
  </script>
  
  