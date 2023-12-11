<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
        <div class="viewtitle" style="margin: 10px;">
          Enter your questions {{ username }}
        </div>
      <body>
        <div>
          <label for="questionInput">Question:</label>
          <input type="text" id="questionInput" v-model="questionText" />
          <button @click="submitQuestion">{{ editingQuestion ? 'Edit' : 'Submit' }}</button>
        </div>
        <div v-if="questions.length > 0">
          <p>Entered questions:</p>
          <ul>
            <li v-for="(question, index) in questions" :key="index">
              {{ question }}
              <button @click="editQuestion(index)">Edit</button>
            </li>
          </ul>
        </div>
        <div>
          <p>Questions submitted: {{ questionCounter }} / 5</p>
        </div>
        <div v-if="questionCounter === 5">
          <p>Done!</p>
        </div>
        <button class="back" v-on:click="$router.go(-1)">
          {{ uiLabels.back }}
        </button>
        <button class="start" :disabled="!selectionsMade" v-on::click="emitQuestions">
          {{ uiLabels.createGame }}
        </button>
      </body>
  </template>
  
<script>
import io from 'socket.io-client';
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
      };
    },
    created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    ///socket.emit('retrieveSettings');     //here
    ////socket.on('settingsRecieved')       //here
  },

  methods: {
      submitQuestion() {
        if (this.questionText.trim() !== '' && this.questionCounter < 5) {
          if (this.editingQuestion) {
            // Edit the existing question
            this.questions[this.editedQuestionIndex] = this.questionText;
            this.editingQuestion = false;
            this.editedQuestionIndex = null;
          } else {
            // Add a new question
            this.questions.push(this.questionText);
            this.questionCounter++;
          }
          this.questionText = ''; // Clear the input field
        }
      },
      editQuestion(index) {
        // Set the input field to the selected question for editing
        this.questionText = this.questions[index];
        this.editingQuestion = true;
        this.editedQuestionIndex = index;
      },
      emitQuestions() {
        //socket.emit('emitQuestions', {roomCode: this.roomCode, questions: this.questions})
      }
    },
  };
</script>
  