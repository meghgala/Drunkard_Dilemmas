<template>
<<<<<<< HEAD
  <header>
    <h1>Drunkard <br> Dilemmas</h1>
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <h2 class="viewtitle" style="margin: 10px;">
      {{uiLabels.settingstitle}}
    </h2>
    <div class="gameroom"> 
        {{ uiLabels.welcome }} {{ username }}<br>
        {{ uiLabels.roomCode }}: {{ roomCode }} 
    </div>
    <div class="setting-text-container">
      <label class="questions-label" for="num-questions">{{ uiLabels.numOfQuest }} :</label>
      <select class="questions-drop" v-model="NumQuestions" id="num-questions">
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <button v-on::click="displayText('additionalInfo1')" class="info-symbol">
            i
      </button>
=======

<header>
  <h1>Drunkard <br> Dilemmas</h1>
</header>
    
<body>
  <Particlesvue :options="{}"></Particlesvue>

    <h2>{{uiLabels.settingstitle}}</h2>

    <div class="greeting-container">
    <div class="greeting">
      <h3>{{ uiLabels.hello }} {{ username }}</h3>

      <div class="roomcode-and-input">
      <h3 class="roomcode">{{ uiLabels.roomCode }}: {{ roomCode }}</h3>

      <label class="questions-label" for="num-questions">{{ uiLabels.numOfQuest }} : </label>

      <select class="questions-drop" v-model="NumQuestions" id="num-questions">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
      </select>
      <button v-on::click="displayText('additionalInfo1')" class="info-symbol">
            ?
      </button>

>>>>>>> johan
      <div id="additionalInfo1" >
        {{ uiLabels.questionInfo }}
      </div>
    </div>
<<<<<<< HEAD
    <div id="drunkennesslevel">
      <h4 class="how-drunk">{{uiLabels.howdrunkdoyouwanttobecome}}</h4>
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
      <button class="delete" v-on:click="deleteGame">
        {{ uiLabels.deletegame }}
      </button>
      <button class="next" :disabled="!selectionsMade" v-on::click="emitSettings" role="link">
        {{ uiLabels.createGame }}
      </button>
    </div>
    <button class="back" v-on:click="handleButtonClick(() => this.$router.push('/select/'))">
      {{ uiLabels.back }}
    </button>       
    <section class="language"> {{ uiLabels.changeLanguage }}
      <div class="Flag-Button">
        <button class="Flag-Button" v-on:click="switchLanguage" :style="{ backgroundImage: 'url(' + uiLabels.flag + ')' }"></button>
      </div>
    </section>
  </body>
=======
    </div> 
    </div>

    <div class="button-container">
    <div class="button-row">
      <button class="button tipsy" :class="{ active: selectedDrunkenness === 'Tipsy' }" @click="selectDrunkness('Tipsy', 'drunkenness')">{{uiLabels.tipsy}}</button>
      <button class="button drunk" :class="{ active: selectedDrunkenness === 'Drunk' }" @click="selectDrunkness('Drunk', 'drunkenness')">{{uiLabels.drunk}}</button>
      <button class="button shitfaced" :class="{ active: selectedDrunkenness === 'Shitfaced' }" @click="selectDrunkness('Shitfaced', 'drunkenness')">{{uiLabels.shitfaced}}</button>
    </div>
    </div>


    <div class="next-button-container">
    <div class="delete-button">
      <button class="button delete" v-on:click="deleteGame">
                {{ uiLabels.delete }}
      </button>
    </div>
    <div class="next-button">
        <button class="button next" :disabled="!selectionsMade" v-on::click="emitSelections">
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
>>>>>>> johan
</template>

<script>
  import io from 'socket.io-client';
  const socket = io("localhost:3000");
  import Particlesvue from '@/components/Particlesvue.vue'

<<<<<<< HEAD
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
=======
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
>>>>>>> johan
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
        else {alert('Fel')}
      })
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
      },

      handleButtonClick: function (navigate) {
          navigate();
      }
    }
  }
</script>

<style>
<<<<<<< HEAD
  :root {
    --clr-title: #00c8c1;
    --clr-back: rgb(232, 19, 185);
    --clr-neon1:rgb(12, 185, 237);
    --clr-neon2:rgb(12, 185, 237);
    --clr-neon4:#ffffff;
    --clr-neon5:#1F51FF;
=======
  
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  
  :root {
    --clr-title: #00c8c1;
    --clr-blue1:rgb(12, 185, 237);
    --clr-blue2:rgb(10, 78, 196);
    --clr-blue3:rgb(23, 100, 232);
    --clr-blue4:rgb(3, 66, 173);
    --clr-back:rgb(232, 19, 185);
    --clr-white:#ffffff;
>>>>>>> johan
    --clr-bg : #10011e;
    --clr-text1: rgb(255, 255, 120);
  }
</style>
<<<<<<< HEAD

<style scoped>

  * {
      font-family: 'Indie Flower', cursive;
      text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-text1);
      color:var(--clr-text1);
      justify-content: center;
  }

  body {
    overflow: hidden;
  }
  
  h1 {
    text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
    color:var(--clr-title);
    position: fixed;
    top: 1vh;
    left: 1vh;
    margin-top: -0.1vh;
    line-height: 0.8;
  }

  .viewtitle {
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
    font-size: 1.5em;
    font-family: 'Indie Flower', cursive;
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

  .next{
    align-self: flex-start;
    font-family: 'Indie Flower', cursive;
    height: 2em;
    width: 14em;
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
    height: 2em;
    width: 14em;
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

  .language {
    font-weight: bolder;
    margin: 1vh 1vh;
    color:var(--clr-text1);
    font-size: clamp(0.1rem, 1.2vw, 1.5rem);;
    position: fixed;
    top: 1vh;
    right: 1vh;
  }

  .Flag-Button {
    opacity: 0.75;
    transition: opacity 0.3s;
    background-size: 100% 100%;
    height: 5vw;
    width: 7vw;
    display: flex;
    margin: auto;
    cursor: pointer;
  }

  .Flag-Button:hover {
    opacity: 1;
  }
=======
  
  
<style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  
  * {
    font-family: 'Indie Flower', cursive;
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
}
h2 {
  font-size: 3em;
}

h3, h1 {
  font-size: 2em;
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
  color: var(--clr-blue1);
  border: 0.125em solid var(--clr-blue1);
  text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;

}

.button:hover, .tipsy.active, .drunk.active, .shitfaced.active {
  background-color: var(--clr-blue1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue1);
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15vh;
}

.next-button-container {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  margin-top: 10vh;
  gap: 10vh;
}

.input-container {
  display: flex;
  position: relative;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh;
  margin-top: 5vh;
}
.input {
  height: 3vw;
  width: 22vw;
  text-align: center;
}


.tipsy, .drunk, .shitfaced {
  height: 8vw;
  width: 12vw;
}

.next, .delete {
  height: 7vw;
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
  top: 30%;
  width: 20vw;
  background-color: transparent;
  color: var(--clr-text1);
  text-shadow: 0 0 2em 0 var(--clr-text1);
}

#additionalInfo1 {
  display: none;
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
  width: 4vw;
  border: 2px solid var(--clr-text1);
  border-radius: 1vw;
  margin-left: 1vw;
  background: transparent;
  padding: 5px 10px;
  font-family: 'Indie Flower', cursive;
  font-size: 1em;
  color: var(--clr-text1);
  background-color: var(--clr-bg);
}

>>>>>>> johan

  </style>