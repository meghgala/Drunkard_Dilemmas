<template>
  <header>
    <h1>DRUNKARD <br> DILEMMAS</h1>
  </header>
  <body>
    <Particlesvue :options="{}"></Particlesvue>
    <h2>{{uiLabels.inputtitle}}</h2>
    <div v-if="isNaN(NumQuestions)">
      {{ uiLabels.waitingsettings }}
    </div>
    <div v-if="!isNaN(NumQuestions)">

    <div class="title-and-input">
      <div class="viewtitle">
        <h3>{{ uiLabels.enteryourquestion }} {{ username }}</h3>
      </div>
      <label class="questionInput" for="questionInput"><!--{{ uiLabels.question }}:--></label>
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
    <button class="back" v-on:click="$router.go(-1)">
      {{ uiLabels.back }}
    </button>
    <button class="start" :disabled="!selectionsMade" v-on:click="emitQuestions">
      {{ uiLabels.done }}
    </button>
  </div>
  </body>
</template>
  
<script>
  import io from 'socket.io-client';
  import Particlesvue from '@/components/Particlesvue.vue'

  const socket = io(sessionStorage.getItem("dataServer"));

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
          if (this.editingQuestion && this.editedQuestionIndex !== null) {
            console.log('question to edit now: ', this.questionText)
            this.questions[this.editedQuestionIndex] = this.questionText;
            this.editingQuestion = false;
            this.editedQuestionIndex = null;
          } 
          else {
            this.questions.push(this.questionText);
          }
          this.questionCounter++;
          this.questionText = '';
        }
      },   

      editQuestion(index) {
        this.questionText = this.questions[index];
        console.log('question to edit: ', this.questionText)
        this.editingQuestion = true;
        this.editedQuestionIndex = index;
        this.questionCounter--;
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

  * {
    justify-content: center;
  }

  h1 {
  text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
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
  font-size: clamp(0.1vw, 2vw, 3vw);
  margin-top: 0%;
  }

  .questionInput{
    color: rgb(255, 255, 156);
    font-size: clamp(0.1vw, 2vw, 3vw);
    padding-right: 0.5em;
  }

  .viewtitle{
    color: rgb(255, 255, 156);
    font-size: 2em;
  }

  button:hover{
    background-color: var(--clr-blue1);
    color: var(--clr-bg);
    text-shadow: none;
    box-shadow: 0 0 2em 0 var(--clr-blue1);
  }

  .questionInputBox {
    height: 5vh;
    width: 40vw;
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
    height: 6vh;
  }

  .edit{
    color: var(--clr-blue1);
    border: 0.125em solid var(--clr-blue1);
    text-shadow: 0 0 0.09em var(--clr-blue1), 0 0 0.65em var(--clr-blue1);
    box-shadow: inset 0 0 0.5em 0 var(--clr-blue1), 0 0 0.5em 0 var(--clr-blue1);
    cursor: pointer;
    font-size: clamp(0.1vw, 1.5vw, 2.5vw);
    text-align: center;
    border-radius: 0.25em;
    text-decoration: none;
    background-color: transparent;
  }
  .list{
    font-size: 2em;
  }

  .start{
    color: var(--clr-green);
    border: 0.125em solid var(--clr-green);
    text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
    box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
    cursor: pointer;
    text-align: center;
    border-radius: 0.25em;
    font-size: clamp(0.1vw, 2vw, 3vw);
    text-decoration: none;
    background-color: transparent;
    width: 30vw;
  }

  .start:hover {
    background-color: var(--clr-green);
    box-shadow: 0 0 2em 0 var(--clr-green);
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

  .title-and-input{
    margin-top: 10vh;
  }

  @media (max-width: 600px) {

  h2 {
  font-size: clamp(0.1vh, 7vh, 8vh);
  margin-top: -0.5vh;
  }
  
  h3 {
    font-size: clamp(0.1vh, 3vh, 4vh);
    margin-top: -5vh;
  }

  .questionInput{
    font-size: clamp(2vw, 4vw, 5vw);
  }

  .back {
  height: 8vh;
  width: 15vw;
  font-size: clamp(0.1vw, 3vw, 4vw);
  }

  .viewtitle {
    height: 10vh;
  }

  .start{
    font-size: clamp(2vw, 5vw, 8vw);
    width: 40vw;
    height: 6vh;
  }

  .submit {
    width:18vw;
    height:7vh;
    font-size: clamp(0.1vw, 3vw, 4vw);
  }

  .edit {
    font-size: clamp(0.1vw, 3vw, 4vw);
    height: 3.5vh;
  }

  .back {
  height: 8vh;
  width: 15vw;
  font-size: clamp(0.1vw, 3vw, 4vw);
  }

  .list {
    font-size: clamp(1vw, 6vw, 7vw);
  }
}

</style>
    