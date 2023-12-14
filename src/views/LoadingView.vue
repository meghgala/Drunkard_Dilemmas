<template>
    <h1>Drunkard Dilemmas</h1>
    <div id="box-container">
        <div id="player_creating" style="background-color: burlywood;">
            <p>
                {{ uiLabels.waiting }}:
                {{ playersloading }}
            </p>
            <div>
                <li v-for="(player, index) in playersloading" :key="index">
                {{ player }}
                </li>
            </div>
        </div>
        <div id="player_done" style="background-color: aquamarine;">
            <p>
                {{ uiLabels.done }}!
            </p>
            <div>
                Player 2
            </div>
        </div>
    </div>
    <div>
        <button>
            Start
        </button>
    </div>
</template>
  
  
<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'LoadingView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      uiLabels: {},
      roomCode: '',
      playersloading: [],
    }
  },
  created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });
    // socket.on('roomChecked', (d) => {if (d.bool && this.roomCode === d.roomcode) this.playersloading.push(d.playername)})
    socket.on('roomChecked', (d) => {console.log(d)})
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