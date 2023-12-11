<template>
    <div>
      <header>
        <div class="viewtitle" style="margin: 10px;">
          {{uiLabels.enteryourquestion}}
        </div>
      </header>
      {{ roomCode }}
      <body>
        <div>
          <label for="questionInput">{{uiLabels.question}}</label>
          <input type="text" id="questionInput" v-model="questionText" />
          <button @click="submitQuestion">{{ editingQuestion ? uiLabels.edit : uiLabels.submit }}</button>
          <SmallButton @click="testButtonClicked" color="green">{{uiLabels.test}}</SmallButton>

        </div>
        <div v-if="questions.length > 0">
          <p>{{uiLabels.enteredquestions}}</p>
          <ul>
            <li v-for="(question, index) in questions" :key="index">
              {{ question }}
              <button @click="editQuestion(index)">{{uiLabels.edit}}</button>
            </li>
          </ul>
        </div>
        <div>
          <p>{{uiLabels.questionssubmitted}} {{ questionCounter }} / 5</p>
        </div>
        <div v-if="questionCounter === 5">
          <p>{{uiLabels.done}}!</p>
        </div>
      </body>
    </div>
  </template>
  
  <script>
  import SmallButton from '../components/SmallButton.vue';
  import io from 'socket.io-client';
  const socket = io("localhost:3000");

  export default {
    name: 'JoinView',
    components: {
        SmallButton,
    },

    data: function () {
      return {
        lang: localStorage.getItem("lang") || "en", uiLabels: {},
        questionText: '',
        questions: [],
        questionCounter: 0,
        editingQuestion: false,
        editedQuestionIndex: null,
        roomCode: '',
        username: sessionStorage.username,
      }
    },

    created: function () {
    this.roomCode = this.$route.params.roomCode;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
    //socket.emit("", this.roomCode) ///fixaa, behöver även en socket.on
    

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
      testButtonClicked() {
        console.log('Testbutton clicked');
      }
    },
  };
  </script>
  