<template>

<header>
  <h1>DRUNKARD <br> DILEMMAS</h1>
</header>

<body>
  <Particlesvue :options="{}"></Particlesvue>

    <h2>{{ uiLabels.creategame }}</h2>
    <div class="infobox-container">
    <div class="infobox">
      <h4>
        {{ uiLabels.gameinfo }}
      </h4>
    </div>
    </div>


    <div class="name-container">
    <div class="name-code-row">
        <input class="button name-input" v-model="creatorName" type="text" id="creator-name" :placeholder="uiLabels.entername" />
        <div class="roomcode-output">
          <button class="button generate-roomcode" @click="generateRoomCode">
            {{ uiLabels.generateroomcode }}
          </button>
        </div>
    </div>
    </div>

    <div class="roomcode-container">
    <div class="roomcode-box" v-if="roomCode"> 
        <span class="room-code" v-if="roomCode" ref="roomCodeElement" @click="copyRoomCode">{{ roomCode }}</span>
    </div>
      <div v-if="copyConfirmation" class="copy-confirmation">{{ uiLabels.copyConfirmation }}</div>
    </div>

    <div class="next-button-container">
    <div class="next-button">
      <button class="button next" :disabled="!selectionsMade" v-on::click="emitSelections">
        {{ uiLabels.next }}
      </button>
    </div>
    </div>
    
    <div class="back-button-container">
    <div class="back-button">
      <button class="back" v-on:click="handleButtonClick(() => this.$router.push('/'))">
        {{ uiLabels.back }}
      </button>
    </div>
    </div>
  
  </body>
</template>
  
<script>
  import io from 'socket.io-client';
  import Particlesvue from '@/components/Particlesvue.vue'

  const socket = io(sessionStorage.getItem("dataServer"));
  
  export default {
    name: 'SelectView',
    data: function () {
      return {
        uiLabels: {},
        lang: localStorage.getItem("lang") || "en",
        creatorName: "",
        roomCode: null,
        copyConfirmation: '',
      };
    },

    components: {
      Particlesvue,
    },

    mounted: function () {
      console.log('Vue app mounted');
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels;
      });
    },

    created: function () {
      this.id = this.$route.params.id;
      socket.on('uniqueChecked', (code) => {
        if (code !== 0) {this.roomCode = code} 
        else {generateRoomCode()}
      });
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
      this.uiLabels = labels
      });
      socket.on('selectionsMade', (d) => {
        if (d) {
        sessionStorage.username = this.creatorName;
        sessionStorage.creator = true;
        this.$router.push('/settings/' + this.roomCode)} 
        else {alert('Fel')}
      });
    },

    computed: {
      selectionsMade() {
        return (
          this.creatorName !== '' &&
          this.roomCode !== null
        );
      }
    },
    
    methods: {

    copyRoomCode() {    
    const textArea = document.createElement('textarea');
    textArea.value = this.roomCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.copyConfirmation = 'Room code copied!';
    setTimeout(() => this.copyConfirmation = '', 3000);
  },
    
      generateRoomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 6;
        let code = '';
        for (let i = 0; i < codeLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
        socket.emit('checkUnique', {tryCode: code});
      },

      emitSelections() {
          console.log(this.roomCode, this.creatorName);
          socket.emit('creatorSelections', {roomCode: this.roomCode, creator: this.creatorName});
      },

      handleButtonClick: function (navigate) {
        navigate();
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

h4 {
  font-size: clamp(0.5vw, 1.6vw, 1.8vw);
}

.room-code {
  font-size: clamp(0.1vw, 2.5vw, 5vw);
}

.button {
  color: var(--clr-orange);
  border: 0.125em solid var(--clr-orange);
  text-shadow: 0 0 0.09em var(--clr-orange), 0 0 0.65em var(--clr-orange);
  box-shadow: inset 0 0 0.5em 0 var(--clr-orange), 0 0 0.5em 0 var(--clr-orange);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;
}

.next {
  color: var(--clr-blue1);
  border: 0.125em solid var(--clr-blue1);
  text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
}

.button:hover {
  background-color: var(--clr-orange);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-orange);
}

.next:hover {
  background-color: var(--clr-blue1);
  box-shadow: 0 0 2em 0 var(--clr-blue1);
}
.roomcode-container {
  display: flex;
  align-items: center;
  margin-top: 8vh;
  height: 8vh;
}

.next-button-container {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  margin-top: 10vh;
}

.infobox-container {
  margin-left: 10vw;
  margin-right: 10vw;
}

.roomcode-output {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position:relative;
}

.copy-confirmation {
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  position: absolute;
  align-items: center;
  right: 28vw;
}

.name-code-row {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  flex-wrap: wrap;
  gap: 20vh;
  margin-top: 5vh;
}

.name-input {
  height: 8vh;
  width: 22vw;
  text-align: center;
}


.name-input::placeholder {
  color: var(--clr-orange);
}

.name-input:hover::placeholder {
  color: var(--clr-bg);
}

.generate-roomcode {
  height: 9vh;
  width: 22vw;
}

.roomcode-box {
  border: 0.125em solid var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
  background-color: transparent;
  height: 6vh;
  width: 12vw;
  border-radius: 15px;
}

.next {
  height: 10vh;
  width: 14vw;
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

@media (max-width: 600px) {
  h4 {
    font-size: 3vw;
  }

  .button {
  font-size: clamp(0.1vh, 2.5vh, 3vh);
  }

  .name-input {
    height: 10vh;
    width: 40vw;
    border-radius: 15px;
  }

  .generate-roomcode {
    height: 11.25vh;
    width: 44vw;
    border-radius: 15px;
  }

  .name-code-row {
    gap: 5vw;
  }

  .roomcode-box {
    margin-top: -10vh;
    width: 18vh;
  }

  .room-code {
    font-size: clamp(6vw, 7vw, 8vw);
  }

  .copy-confirmation {
    font-size: clamp(1vw, 3vw, 4vw);
    right: 10vw;
    top: 65vh;
  }
  
  .next {
    height: 10vh;
    width: 30vw;
  }
  .next-button-container {
  margin-top: 0;
  }

.back {
  height: 8vh;
  width: 15vw;
  font-size: clamp(0.1vw, 3vw, 4vw);
  }
}
  
</style>
  
  