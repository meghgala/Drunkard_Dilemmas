<template>
  <header>
    <h1>DRUNKARD <br> DILEMMAS</h1>
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
  
      <h2>{{ uiLabels.joingame }}</h2>
      <div class="infobox-container">
      <div class="infobox">
      <h4>
        {{ uiLabels.gameinfo }}
      </h4>
      </div>
      </div>

  
      <div class="name-and-code-container">
      <div class="name-code-row">
        <input class="button name-input" v-model="name" type="text" id="creator-name" :placeholder="uiLabels.entername"/>
        <input class="button code-input" v-model="roomCode" type="text" id="roomCode" :placeholder="uiLabels.enterroomcode"/>
      </div>
      </div>

      <div class="next-button-container">
      <div class="next-button">
        <button class="button next" :disabled="!selectionsMade" @click="emitCheckRoom">
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
    name: 'JoinRoomView',
    data: function () {
      return {
        uiLabels: {},
        id: "",
        lang: localStorage.getItem("lang") || "en",
        name: "",
        roomCode: "",
      }
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
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      });
      socket.on('roomChecked', (d) => {if (d === true) {
        sessionStorage.username = this.name;
        sessionStorage.creator = false;
        this.$router.push('/input/' + this.roomCode)} 
        else if (d === 'name_exists') {
          alert(this.uiLabels.alertusername);
        }
        else {
          alert(this.uiLabels.alertroomcode);
        }
      })    
    },
    
    computed: {
      selectionsMade() {
        return (
          this.roomCode !== null &&
          this.name !== ''
        )
      }
    },
          
    methods: {
      switchLanguage: function () {
        if (this.lang === "en") {
          this.lang = "sv";
        } else {
          this.lang = "en";
        }
        localStorage.setItem("lang", this.lang);
        socket.emit("switchLanguage", this.lang);
      },

      emitCheckRoom() {
        socket.emit('checkRoom', { roomCode: this.roomCode, username: this.name });
      },
      handleButtonClick: function (navigate) {
            navigate();
      } 
    }
  }
</script>
    
<style>
  :root {
    --clr-title: #00c8c1;
    --clr-blue1:rgb(12, 185, 237);
    --clr-blue2:rgb(10, 78, 196);
    --clr-blue3:rgb(23, 100, 232);
    --clr-blue4:rgb(3, 66, 173);
    --clr-back:rgb(232, 19, 185);
    --clr-white:#ffffff;
    --clr-bg : #10011e;
    --clr-text1: rgb(255, 255, 120);
  }
</style>
  
  
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
    font-size: 3em;
  }

h4 {
  font-size: clamp(0.5vw, 1.6vw, 1.8vw);
}
    
.button {
  color: var(--clr-blue1);
  border: 0.125em solid var(--clr-blue1);
  text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
  box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(1vw, 2vw, 2vw);
  cursor: pointer;
  border-radius: 15px;
}
    
.button:hover {
  background-color: var(--clr-blue1);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue1);
} 
    
.next-button-container {
  display: flex;
  width: 100%;
  text-align: center;
  border-radius: 0.25em;
  transition: background-color 0.3s, color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
  margin-top: 10vh;
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
.name-input, .code-input {
  height: 8vh;
  width: 22vw;
  text-align: center;
}
    
.name-input::placeholder, .code-input::placeholder {
  color: var(--clr-blue1);
}
    
.name-input:hover::placeholder, .code-input:hover::placeholder {
  color: var(--clr-bg);
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
    
.infobox-container {
  margin-left: 10vw;
  margin-right: 10vw;
}

.language {
  font-weight: bolder;
  margin: 1vh 1vh;
  color:var(--clr-text1);
  font-size: clamp(0.11vw, 1.5vw, 2vw);
  position: fixed;
  top: 1vh;
  right: 1vh;
}

@media (max-width: 600px) {

  h4 {
    font-size: 3vw;
  }

  .button {
  font-size: clamp(0.1vh, 2.5vh, 3vh);
  }

  .name-input, .code-input {
    height: 10vh;
    width: 40vw;
    border-radius: 15px;
  }

  .name-code-row {
    gap: 5vw;
  }
  
  .next {
    height: 10vh;
    width: 30vw;
    margin-top: 10vh;
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
    
    