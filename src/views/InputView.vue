<template>
    <div>
      <header>
        <div class="viewtitle" style="margin: 10px;">
          Enter your questions
        </div>
      </header>
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
      </body>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questionText: '',
        questions: [],
        questionCounter: 0,
        editingQuestion: false,
        editedQuestionIndex: null,
      };
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
    },
  };
  </script>
  