<template>
    <header>
        <div class="viewtitle" style="margin: 10px;">
            Settings
        </div>
    </header>
    <body>
        <section id="drunkennesslevel">
            <h3>How drunk do you want to become?</h3>
            <button :class="{ active: selectedDrunkenness === 'Tipsy' }" @click="handleButtonClick('Tipsy', 'drunkenness')">Tipsy</button>
            <button :class="{ active: selectedDrunkenness === 'Danceallnight' }" @click="handleButtonClick('Danceallnight', 'drunkenness')">Dance all night</button>
            <button :class="{ active: selectedDrunkenness === 'Worldrecord' }" @click="handleButtonClick('Worldrecord', 'drunkenness')">World record</button>
        </section>
        <section id="lengthofgame">
            <h3>For how long do you want to play?</h3>
            <button :class="{ active: selectedLength === 'Short' }" @click="handleButtonClick('Short', 'length')">Short</button>
            <button :class="{ active: selectedLength === 'Middle' }" @click="handleButtonClick('Middle', 'length')">Middle</button>
            <button :class="{ active: selectedLength === 'Long' }" @click="handleButtonClick('Long', 'length')">Long</button>
        </section>
        <section id="generateroomcode">
            <h3>Generate Room Code</h3>
            <button @click="generateRoomCode">Generate Code</button>
            <p v-if="roomCode">Room Code: {{ roomCode }}</p>
        </section>
    </body>
</template>

<script>
export default {
  data() {
    return {
      selectedDrunkenness: null,
      selectedLength: null,
      roomCode: null,
    };
  },
  methods: {
    handleButtonClick(buttonText, section) {
      if (section === 'drunkenness') {
        this.selectedDrunkenness = buttonText;
      } else if (section === 'length') {
        this.selectedLength = buttonText;
      }

    },
    generateRoomCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const codeLength = 6;
      let code = '';
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      this.roomCode = code;
    },
  },
};
</script>

<style scoped>
  .active {
    background-color: lightblue;
  }
</style>
