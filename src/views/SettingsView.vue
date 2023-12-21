<template>
    <body>
      <Particlesvue :options="{}"></Particlesvue>
        <h2 class="viewtitle" style="margin: 10px;">
            {{uiLabels.settingstitle}}
        </h2>
        <div class="gameroom"> 
            Hello {{ username }}<br>
            {{ uiLabels.roomCode }}: {{ roomCode }} 
        </div>
        <div class="setting-text-container">
        
        <label class="questions-label" for="num-questions">{{ uiLabels.numOfQuest }} : </label>
        <select class="questions-drop" v-model="NumQuestions" id="num-questions">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <button v-on::click="displayText('additionalInfo1')" class="info-symbol">
            i
        </button>
        <div id="additionalInfo1" >
            {{ uiLabels.questionInfo }}
        </div>
        </div>
        <div id="drunkennesslevel">
            <h4 class="how-drunk">{{uiLabels.howdrunkdoyouwanttobecome}}</h4>
            <div id="additionalInfo2" style="display: none;">
                {{ uiLabels.drunknessInfo }}
            </div>
            <div class="drunkenness-buttons">
            <button :class="{ active: selectedDrunkenness === 'Tipsy' }" v-on:click="selectDrunkness('Tipsy', 'drunkenness')" class="individual-drunk-button">
                {{uiLabels.tipsy}}
            </button>
            <button :class="{ active: selectedDrunkenness === 'Drunk' }" v-on:click="selectDrunkness('Drunk', 'drunkenness')" class="individual-drunk-button">
                {{uiLabels.drunk}}
            </button>
            <button :class="{ active: selectedDrunkenness === 'Shitfaced' }" v-on:click="selectDrunkness('Shitfaced', 'drunkenness')" class="individual-drunk-button">
                {{uiLabels.shitfaced}}
            </button>
            </div>
        </div>
          <div class="center-buttons">
            <button class="back" v-on:click="$router.go(-1)">
                {{ uiLabels.back }}
            </button>
            <button class="delete" v-on:click="deleteGame">
                Delete game
            </button>
            <button class="next" :disabled="!selectionsMade" v-on::click="emitSettings" role="link">
                    {{ uiLabels.createGame }}
            </button>
          </div>
    </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");
import Particlesvue from '@/components/Particlesvue.vue'

export default {
  name: 'SettingsView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en", uiLabels: {},
      NumQuestions: null,
      selectedDrunkenness: null,
      username: sessionStorage.username,
      roomCode: '',
    };
  },
  components: {
    Particlesvue,
  },
  created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    socket.on("gameDeleted", (d) => {if (d) {this.$router.push('/')}});
    socket.on('settingsadded', (d) => {
            if (d) {
            this.$router.push('/input/' + this.roomCode)} 
            else {alert('Fel')}})
  },

  computed: {
        selectionsMade() {
            return (
                this.NumQuestions !== null &&
                this.selectedDrunkenness !== null)
        }
  },

  methods: {
    displayText(id) {
    let text = document.getElementById(id);
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {text.style.display = "none";}
    },

    selectDrunkness(drunkness) {
      if (drunkness === 'Tipsy') {
        drunkness = 3;}
      else if (drunkness === 'Drunk') {
        drunkness = 5;}
      else {
        drunkness = 10;
      }
      this.selectedDrunkenness = drunkness;
    },

    deleteGame() {
      if (confirm(this.uiLabels.alertdelete)) {
        socket.emit('deleteGame', {roomCode: this.roomCode});} 
    },
    
    emitSettings() {
      socket.emit('addSettings', {roomCode: this.roomCode, NumQuestions: this.NumQuestions, drunkness: this.selectedDrunkenness});
    }
  }
}

</script>



<style>
:root {
--clr-neon-pink: rgb(232, 19, 185);
--clr-neon1:rgb(12, 185, 237);
--clr-neon2:rgb(12, 185, 237);
--clr-neon4:#ffffff;
--clr-neon5:#1F51FF;
--clr-bg : #10011e;
--clr-text1: rgb(255, 255, 120);

}</style>

<style scoped>
.viewtitle{
  text-shadow: 0 0 0.2em white, 0 0 6em yellow;
  color: rgb(255, 255, 156);
  font-size: 5em;
  font-family: 'Indie Flower', cursive;
}
.gameroom{
  color: rgb(255, 255, 156);
  font-size: 2em;
  font-family: 'Indie Flower', cursive;
}

.simple-text{
  color: rgb(255, 255, 156);
  font-size: 2em;
}
.questions-label{
  color: rgb(255, 255, 156);
  font-size: 2em;
  font-family: 'Indie Flower', cursive;
}

.how-drunk{
  color: rgb(255, 255, 156);
  font-size: 2em;
  font-family: 'Indie Flower', cursive;
}

.questions-drop{
  color: rgb(255, 255, 156);
  background-color:transparent;
  font-size: 2em;
  font-family: 'Indie Flower', cursive;
  height: 1em;
}

#additionalInfo1{
  color: rgb(255, 255, 156);
  font-size: 2em;
  font-family: 'Indie Flower', cursive;
  width: 30%;
}

#drunkennesslevel {
  text-align: center;
  margin-top: 20px; /* Adjust the margin as needed */
}

.drunkenness-buttons {
  display: flex;
  justify-content: center;
}

.info-symbol{
  align-self: flex-start;
  font-family: 'Indie Flower', cursive;
  margin: 3%;
  height: 2em;
  width: 1em; 
  border-radius: 50%;
  font-size: 1.5rem; 
  background-color: transparent;
  color: white;
  border: white 0.125em solid;
  text-shadow: 0 0 0.09em white, 0 0 0.65em white;
  box-shadow: inset 0 0 0.5em 0 white, 0 0 0.5em 0 white;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.info-symbol:hover {
  background-color: white;
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 white;
}

button {
    font-family: 'Indie Flower', cursive;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 7%;
    height: 3.5em;
    width: 30%;
    padding: 0.25em 1em;
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: 3rem;
    text-decoration: none;
    background-color: transparent;
}

.individual-drunk-button{
  color: var(--clr-neon2);
  border: 0.125em solid var(--clr-neon2);
  text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
  background-color: transparent;
  font-family: 'Indie Flower', cursive;
  font-weight: bolder;
  font-size: 1.5em;
  cursor: pointer;
  height: 7vw;
  width: 10vw;
}

.individual-drunk-button:hover {
  background-color: var(--clr-neon2);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}

.center-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
}

.back {
  font-family: 'Indie Flower', cursive;
  height: 2em; /* Adjust the height as needed */
  width: 4em; /* Adjust the width as needed */
  cursor: pointer;
  text-align: center;
  border-radius: 50%; /* To make it circular */
  font-size: 1rem; /* Adjust the font size as needed */
  text-decoration: none;
  color: var(--clr-neon-pink);
  border: var(--clr-neon-pink) 0.125em solid;
  text-shadow: 0 0 0.09em var(--clr-neon-pink), 0 0 0.65em var(--clr-neon-pink);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon-pink), 0 0 0.5em 0 var(--clr-neon-pink);
}

.back:hover {
  background-color: var(--clr-neon-pink);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon-pink);
}

.next{
  align-self: flex-start;
  font-family: 'Indie Flower', cursive;
  height: 8vw;
  width: 12vw;
  cursor: pointer;
  text-align: center;
  border-radius: 0.25em;
  font-size: 2em;
  text-decoration: none;
  color: var(--clr-neon2);
  border: var(--clr-neon2) 0.125em solid;
  text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
}

.delete {
  align-self: flex-start;
  font-family: 'Indie Flower', cursive;
  height: 8vw;
  width: 10vw;
  cursor: pointer;
  text-align: center;
  border-radius: 0.25em;
  font-size: 2em;
  text-decoration: none;
  color: var(--clr-neon2);
  border: var(--clr-neon2) 0.125em solid;
  text-shadow: 0 0 0.09em var(--clr-neon2), 0 0 0.65em var(--clr-neon2);
  box-shadow: inset 0 0 0.5em 0 var(--clr-neon2), 0 0 0.5em 0 var(--clr-neon2);
}

.delete:hover {
  background-color: var(--clr-neon2);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-neon2);
}

</style>
