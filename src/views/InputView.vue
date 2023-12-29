<template>
  <header>
    <h1>Drunkard <br> Dilemmas</h1>
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <div>
      <label class="title"></label>
      <div class="viewtitle" style="margin: 10px;">
        {{ uiLabels.enteryourquestion }} {{ username }}
      </div>
      <label class="questionInput" for="questionInput">{{ uiLabels.question }}:</label>
      <input class="questionInputBox" type="text" id="questionInput" v-model="questionText"/>
      <button class="submit" @click="submitQuestion">
        {{ editingQuestion ? 'Edit' : 'Submit' }}
      </button>
    </div>
    <div v-if="questions.length > 0">
      <p class="list">{{ uiLabels.enteredquestions }}:</p>
      <li class="list" v-for="(question, index) in questions" :key="index">
        {{ question }}
        <button class="edit" @click="editQuestion(index)">
          {{ uiLabels.edit }}
        </button>
      </li>
    </div>
    <div>
      <p class="list">{{ uiLabels.questionssubmitted }}: {{ questionCounter }} / {{ NumQuestions }}</p>
    </div>
    <div v-if="questionCounter === NumQuestions">
      <p class="list">{{ uiLabels.done }}!</p>
    </div>
    <button class="back" v-on:click="$router.go(-1)">
      {{ uiLabels.back }}
    </button>
    <button class="start" :disabled="!selectionsMade" v-on:click="emitQuestions">
      {{ uiLabels.createGame }}
    </button>
    <section class="language"> {{ uiLabels.changeLanguage }}
      <div class="Flag-Button">
        <button class="Flag-Button" v-on:click="switchLanguage" :style="{ backgroundImage: 'url(' + uiLabels.flag + ')' }">
        </button>
      </div>
    </section>
  </body>
</template>
  
<script>
  import io from 'socket.io-client';
  import Particlesvue from '@/components/Particlesvue.vue'
  const socket = io("localhost:3000");

  export default {
    name: 'InputView',
    data() {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        questionText: '',
        questions: [],
        questionCounter: 0,
        editingQuestion: false,
        editedQuestionIndex: null,
        roomCode: '',
        username: sessionStorage.username,
        NumQuestions: 0,
      };
    },

    created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    socket.emit('retrieveSettings', {roomCode: this.roomCode});
    socket.on('settingsReceived', (NumQuestions) => {
      this.NumQuestions = parseInt(NumQuestions)});
    socket.on('questionsAdded', (d) => {if (d) {this.$router.push('/load/' + this.roomCode)}})     
    },

    components: {
      Particlesvue,
    },

    computed: {
      selectionsMade() {
        return (
          this.questionCounter === this.NumQuestions)
      }
    },

    methods: {
      submitQuestion() {
        if (this.questionText.trim() !== '' && this.questionCounter < this.NumQuestions) {
          if (this.editingQuestion) {
            this.questions[this.editedQuestionIndex] = this.questionText;
            this.editingQuestion = false;
            this.editedQuestionIndex = null;
          } else {
            this.questions.push(this.questionText);
            this.questionCounter++;
          }
          this.questionText = '';
        }
      },
      editQuestion(index) {
        this.questionText = this.questions[index];
        this.editingQuestion = true;
        this.editedQuestionIndex = index;
      },
      emitQuestions() {
        socket.emit('addQuestions', {roomCode: this.roomCode, questions: this.questions, username: this.username})
      }
    },
  };
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
    --clr-yellow: rgb(255, 255, 120);
  }
</style>

<style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');


  * {
    font-family: 'Indie Flower', cursive;
    color:var(--clr-yellow);
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

  .title{
    text-shadow: 0 0 0.2em white, 0 0 6em var(--clr-yellow);
    color: var(--clr-yellow);
    font-size: 5em;
    font-family: 'Indie Flower', cursive;
    margin-top: 20em;
  }

  .questionInput{
    color: rgb(255, 255, 156);
    font-size: 2em;
    font-family: 'Indie Flower', cursive;
    padding-right: 0.5em;
  }

  .viewtitle{
    color: rgb(255, 255, 156);
    font-size: 2em;
    font-family: 'Indie Flower', cursive;
  }

  button:hover{
    background-color: var(--clr-blue1);
    color: var(--clr-bg);
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-blue1);
  }

  .questionInputBox {
    height: 1.5em;
    width: 30em;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2);
    border: 0.125em solid var(--clr-blue1);
    text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
    border-radius: 0.25em;
    margin-right: 0.5em;
    font-size: 1.5em;
  }

  .questionInputBox:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--clr-yellow) ;
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-white);
  }

  .submit{
    color: var(--clr-blue1);
    border: 0.125em solid var(--clr-blue1);
    text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: 1.5em;
    text-decoration: none;
    background-color: transparent;
    height: 2em;
  }

  .edit{
    color: var(--clr-blue1);
    border: 0.125em solid var(--clr-blue1);
    text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
    cursor: pointer;
    font-size: 0.6em;
    text-align: center;
    border-radius: 0.25em;
    text-decoration: none;
    background-color: transparent;
  }
  .list{
    font-size: 2em;
  }

  .start{
    color: var(--clr-blue1);
    border: 0.125em solid var(--clr-blue1);
    text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: 2em;
    text-decoration: none;
    background-color: transparent;
    width: 15em;
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
    border: transparent;
  }

  .Flag-Button:hover {
    opacity: 1;
  }
    

</style>
    