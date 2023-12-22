<template>
    <h1>Drunkard Dilemmas</h1>
    <div id="box-container">
        <div id="player_creating" style="background-color: burlywood;">
            <p>
                {{ uiLabels.waiting }}:
                <Player 
                    v-for="player in playersloading"
                    v-bind:player="player" 
                    v-bind:key="player.name">

                </Player>            </p>
        </div>
        <div id="player_done" style="background-color: aquamarine;">
            <p>
                {{ uiLabels.done }}!
                <Player 
                    v-for="player in playersdone"
                    v-bind:player="player" 
                    v-bind:key="player.name">

                </Player>
            </p>
        </div>
    </div>
    <div v-if="creator === 'true'">
        <button class="start" v-on:click="emitGame">
            {{ uiLabels.startgame }}
        </button>
    </div>
</template>
  
  
<script>
import Player from '../components/playerBox.vue'
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'LobbyView',
  components: {
    Player
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
      }
  }
}

</script>
  

<style scoped>
#box-container {
    display: grid;
    grid-template-columns: auto auto;
}

#player_creating {
    grid-row: 1;
    grid-column: 1;
}
#player_done {
    grid-row: 1;
    grid-column: 2;
}
</style>