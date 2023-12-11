<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <h2 class="viewtitle" style="margin: 10px;">
          {{uiLabels.settingstitle}}
        </h2>
        <div> 
          Hello {{ name }}
          {{ uiLabels.roomCode }}: {{ roomCode }}
        </div>
        <label for="num-questions">{{ uiLabels.numOfQuest }} </label>
        <select v-model="NumQuestions" id="num-questions">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button v-on::click="displayText('additionalInfo1')"> Info-symbol </button>
        <div id="additionalInfo1" style="display: none;">{{ uiLabels.questionInfo }}</div>
        <div id="drunkennesslevel">
            <h3>{{uiLabels.howdrunkdoyouwanttobecome}}</h3>
            <button v-on::click="displayText('additionalInfo2')"> Info-symbol </button>
            <div id="additionalInfo2" style="display: none;">{{ uiLabels.drunknessInfo }}</div>
            <button :class="{ active: selectedDrunkenness === 'Tipsy' }" v-on::click="selectDrunkness('Tipsy', 'drunkenness')">{{uiLabels.tipsy}}</button>
            <button :class="{ active: selectedDrunkenness === 'Drunk' }" v-on::click="selectDrunkness('Drunk', 'drunkenness')">{{uiLabels.drunk}}</button>
            <button :class="{ active: selectedDrunkenness === 'Shitfaced' }" v-on::click="selectDrunkness('Shitfaced', 'drunkenness')">{{uiLabels.shitfaced}}</button>
        </div>
        <div>
            <button class="back" v-on:click="$router.go(-1)">
                {{ uiLabels.back }}
            </button>
            <a  href="/input/">
                <button class="next" :disabled="!selectionsMade" v-on::click="emitSettings" role="link">
                    {{ uiLabels.createGame }}
                </button>
            </a>
            <button class="delete" v-on::click="deleteGame"> Delete game</button>

        </div>
    </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'SettingsView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en", uiLabels: {},
      NumQuestions: null,
      selectedDrunkenness: null,
      name: localStorage.username,
      roomCode: '',
    };
  },

  created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    socket.on("gameDeleted", (d) => {if (d) {this.$router.go(-2)}}); //chansning
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

<style scoped>
.active {
    background-color: rgb(34, 5, 54);
  }
#next:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}
</style>
