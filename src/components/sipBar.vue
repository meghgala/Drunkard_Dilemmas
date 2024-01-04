<template>
    <div class="chart">
      <h3 class="title">Scoreboard</h3>
      <div v-for="player in players">
        <div class="wrapper">
        <p>
          {{ player.name }}:
        </p>
          <div class="bar" v-bind:style="{width: player.sips + 'em'}"> {{ player.sips }} </div>    
        </div>
      </div>
    </div>
    </template>
    
    <script>
    export default {
      name: 'SipBar',
      props: {
        players: Array
      }
    }
    </script>
    

<style scoped>
p{
  margin:0em;
}
.chart {
  background-color: transparent;
  width: 15%;
  border: 0.125rem solid rgb(12, 185, 237);
  color: black;
  box-shadow: 0 0 0.5em 0 rgb(12, 185, 237);
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  border-radius: 15px;
  padding:1em;
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
}

.wrapper {
  display: grid;
  grid-template-columns: 60% 60%;
  margin: 1%;
}
.title {
    margin: 0em 0em 1em 0em
}

@media (max-width: 767px) {
  /* Adjust styles for smaller screens */
  .sip-bar {
    width: 100%;
    margin: 0;
  }
}
</style>    