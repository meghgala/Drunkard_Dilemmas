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
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  margin:0em;
}
.chart {
  background-color: #cafcfa;
  width: 20%;
  border: 0.125rem solid rgb(12, 185, 237);
  color: black;
  text-shadow: 0 0 0.09em rgb(7, 92, 118), 0 0 0.65em rgb(7, 92, 118);
  box-shadow: 0 0 0.5em 0 rgb(12, 185, 237);
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  border-radius: 15px;
  padding:1em;
}
.bar {
  background-color: rgb(10, 78, 196);
  color: black;
  text-shadow: 0 0 0.09em black, 0 0 0.65em black;
  box-shadow: 0 0 0.5em 0 rgb(10, 78, 196);
  border-radius: 5px;
}
.wrapper {
  display: grid;
  grid-template-columns: 30% 65%;
  margin: 1%;
}
.title {
    margin: 0em 0em 1em 0em
}
</style>    