<template>
  <meta name="viewport" content="width=device-width, initial-scale=1">


<header>
  <h1>DRUNKARD <br> DILEMMAS</h1>
</header>
    
<body>
  <Particlesvue :options="{}"></Particlesvue>
    <h2>{{uiLabels.settingstitle}}</h2>
    <div class="greeting-container">
    <div class="greeting">
      <h3>{{ uiLabels.hello }} {{ username }}</h3>

      <div class="roomcode-and-input">
      <h3 class="roomcode">{{ uiLabels.roomCode }}: {{ roomCode }}</h3>

      <label class="questions-label" for="num-questions"><h3>{{ uiLabels.numOfQuest }} : </h3></label>

      <div class="dropandinfo-container">
      <select class="questions-drop" v-model="NumQuestions" id="num-questions">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
      </select>
      <button v-on::click="displayText('additionalInfo1')" class="info-symbol">
            ?
      </button>
      
        <div id="additionalInfo1" >
          {{ uiLabels.questionInfo }}
        </div>
      </div>
      </div>
    </div> 
    </div>
    <div class="button-container">
      <div class="button-row">
        <button class="button tipsy" :class="{ active: selectedDrunkenness === 3 }" @click="selectDrunkness('Tipsy', 'drunkenness')">
          {{uiLabels.tipsy}}
        </button>
        <button class="button drunk" :class="{ active: selectedDrunkenness === 5 }" @click="selectDrunkness('Drunk', 'drunkenness')">
          {{uiLabels.drunk}}
        </button>
        <button class="button shitfaced" :class="{ active: selectedDrunkenness === 10 }" @click="selectDrunkness('Shitfaced', 'drunkenness')">   
          {{uiLabels.shitfaced}}
        </button>
      </div>
    </div>
    <div class="next-button-container">
      <div class="delete-button">
        <button class="button delete" v-on:click="deleteGame">
                  {{ uiLabels.delete }}
        </button>
      </div>
      <div class="next-button">
          <button class="button next" :disabled="!selectionsMade" @click="goToInput">
          {{ uiLabels.next }}
          </button>
      </div>
    </div>
    <div class="back-button-container">
      <div class="back-button">
          <button class="back" v-on:click="handleButtonClick">
          {{ uiLabels.back }}
          </button>
      </div>
    </div>
  </body>
</template>

<script>
import io from 'socket.io-client';

const socket = io(sessionStorage.getItem("dataServer"));
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
    handleButtonClick() {
      this.$router.push('/select/');
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

    goToInput() {
      this.emitSettings();
      this.$router.push('/input/' + this.roomCode);
    },
    
    emitSettings() {
      socket.emit('addSettings', {roomCode: this.roomCode, NumQuestions: this.NumQuestions, drunkness: this.selectedDrunkenness});
    }
  }
}

</script>


<style scoped>
  
* {
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-text1);
  color:var(--clr-text1);
  justify-content: center;
  }

  h1 {
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
  color:var(--clr-title);
  position: fixed;
  top: 1vh;
  left: 1vh;
  margin-top: -0.1vh;
  line-height: 0.8;
  font-size: clamp(1vw, 3vw, 4vw);
}

h2 {
  font-size: clamp(0.1vh, 8vh, 10vh);
}

h3 {
  font-size: clamp(0.1vh, 4vh, 5vh);
  margin-top: 0%;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
}

.button-row {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh
}

.button {
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.3rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;
}

.next {
  color: var(--clr-blue1);
  border: 0.125em solid var(--clr-blue1);
  text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
}
.tipsy, .drunk, .shitfaced {
  color: var(--clr-orange);
  border: 0.125em solid var(--clr-orange);
  text-shadow: 0 0 0.09em var(--clr-orange), 0 0 0.65em var(--clr-orange);
  box-shadow: inset 0 0 0.5em 0 var(--clr-orange), 0 0 0.5em 0 var(--clr-orange);
}

.delete {
  color: var(--clr-red);
  border: 0.125em solid var(--clr-red);
  text-shadow: 0 0 0.09em var(--clr-red), 0 0 0.65em var(--clr-red);
  box-shadow: inset 0 0 0.5em 0 var(--clr-red), 0 0 0.5em 0 var(--clr-red);
}

.button:hover {
  background-color: var(--clr-blue1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue1);
}

 .tipsy:hover, .drunk:hover, .shitfaced:hover, .tipsy.active, .drunk.active, .shitfaced.active {
  background-color: var(--clr-orange);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-orange);
}
.delete:hover {
  background-color: var(--clr-red);
  box-shadow: 0 0 2em 0 var(--clr-red);
}
.next-button-container {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  margin-top: 10vh;
  gap: 10vh;
  height: 10vh;
}

.greeting-container {
  height: 20vh;
}

.tipsy, .drunk, .shitfaced {
  height: 18vh;
  width: 16vw;
}

.next, .delete {
  height: 14vh;
  width: 10vw;
}

.back {
  position: fixed;
  bottom: 1vh;
  left: 1vh;
  border-radius: 50%;
  height: 4vw;
  width: 4vw;
  color: var(--clr-back);
  border: 0.125em solid var(--clr-back);
  text-shadow: 0 0 0.09em var(--clr-back), 0 0 0.65em var(--clr-back);
  box-shadow: inset 0 0 0.5em 0 var(--clr-back), 0 0 0.5em 0 var(--clr-back);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1vw, 0.8vw, 1.5rem);
  cursor: pointer;
}

.back:hover {
  background-color: var(--clr-back);
  box-shadow: 0 0 2em 0 var(--clr-back);
  color: var(--clr-bg);
  text-shadow: none;
}

.info-symbol {
  position: relative;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  color: var(--clr-text1);
  border: 0.125em solid var(--clr-text1);
  text-shadow: 0 0 0.09em var(--clr-text1), 0 0 0.65em var(--clr-text1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-text1), 0 0 0.5em 0 var(--clr-text1);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1vw, 0.8vw, 1.5rem);
  margin-left: 2vw;
}

.info-symbol:hover + #additionalInfo1{
  display: block;
  position: absolute;
  left: 68%;
  top: 15%;
  width: 30vw;
  background-color: transparent;
  color: var(--clr-text1);
  text-shadow: 0 0 2em 0 var(--clr-text1);
}

#additionalInfo1 {
  display: none;
  font-size: clamp(0.8vw, 2vw, 3vw);
}

.roomcode-and-input {
  display: flex;
  align-items: center;
}

.roomcode {
  margin-right: 4vw;
}

.questions-drop {
  height: 3vw;
  width: 5vw;
  border: 2px solid var(--clr-text1);
  border-radius: 1vw;
  margin-left: 1vw;
  background: transparent;
  padding: 5px 10px;
  font-size: 1em;
  color: var(--clr-text1);
  background-color: var(--clr-bg);
}

.dropandinfo-container {
  margin-bottom: 5vh;
}

@media (max-width: 600px) {
  
  .button, h4 {
    font-size: 5vw;
  }

  h2 {
  font-size: clamp(0.1vh, 7vh, 8vh);
  margin-top: -0.5vh;
  }
  
  h3 {
    font-size: clamp(0.1vh, 3vh, 4vh);
    margin-top: -5vh;
  }

  .button {
    height: 15vh;
    width: 28vw;
  }

  .button-row {
    gap: 5vw;
    margin-top: 5vh;
  }

  .roomcode-and-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    margin-top: 5vh;
  }

  .questions-drop {
    height: 5vh;
    width: 8vh;
  }

  .info-symbol {
    width: 7vh;
    height: 7vh;
    font-size: clamp(1vh, 2.5vh, 4vh);
  }

  .dropandinfo-container {
    margin-top: -5vh;
  }

  .info-symbol:hover + #additionalInfo1{
    font-size: clamp(1vh, 1.5vh, 4vh);
    top: 28%;
  }

  .next, .delete {
    height: 10vh;
  }

  .next-button-container {
    height: 15vh;
    margin-top: 5vh;
  }

  .back {
  height: 8vh;
  width: 15vw;
  font-size: clamp(0.1vw, 3vw, 4vw);
  }

}

  </style>