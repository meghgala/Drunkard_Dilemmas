<template>
    <div>
      <header>
        <div class="viewtitle" style="margin: 10px;">
          {{uiLabels.enteryourquestion}}
        </div>
      </header>
      <body>
        <div>
          <label for="questionInput">Question:</label>
          <input type="text" id="questionInput" v-model="questionText" />
          <button @click="submitQuestion">{{ editingQuestion ? 'Edit' : 'Submit' }}</button>
          <SmallButton @click="testButtonClicked" color="green">Test</SmallButton>

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
      }
    },

    created: function () {
    this.id = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
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
  