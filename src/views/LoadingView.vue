<template>
    <h1>
        Future headline
    </h1>
    <div id="box-container">
        <div id="player_creating" style="background-color: burlywood;">
            <p>
                {{ uiLabels.waiting }}:
            </p>
            <div>
                <div>
                    Player 1
                </div>
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
  name: 'WinnerView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      uiLabels: {}
    }
  },
  created: function () {
    this.id = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  }
}

</script>
  

<style>
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