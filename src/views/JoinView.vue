<template>
    <div>
      <header>
        <div class="viewtitle" style="margin: 10px;">
          Enter your information
        </div>
      </header>
      <body>
        <div>
          <label for="usernameInput">Username:</label>
          <input type="text" id="usernameInput" v-model="username" />
        </div>
        <div>
          <label for="gameCodeInput">Game Code:</label>
          <input type="text" id="gameCodeInput" v-model="gameCode" />
        </div>
        <button @click="submitInfo">Submit</button>
      </body>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        gameCode: '',
      };
    },
    methods: {
      submitInfo() {
        // You can add validation or further logic here
        if (this.username.trim() !== '' && this.gameCode.trim() !== '') {
          // Do something with the entered information, e.g., send it to the server
          console.log('Username:', this.username);
          console.log('Game Code:', this.gameCode);
          // Clear the input fields
          this.username = '';
          this.gameCode = '';
        }
      },
    },
  };
  </script>
  