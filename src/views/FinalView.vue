<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
    </body>
  </template>
    
  <script>
    import Player from '../components/playerButton.vue'
    import Bar from '../components/sipBar.vue'
    import io from 'socket.io-client';
    const socket = io("localhost:3000");
  
    export default {
      name: 'FinalView',
      components: {
        Player,
        Bar
      },
      
      data() {
        return {
          lang: localStorage.getItem("lang") || "en", uiLabels: {},
          roomCode: '',
          };
      },
      
      created: function () {
      },
    };
  </script>
  
  