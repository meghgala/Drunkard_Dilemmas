<template>
    <header>
        <div class="viewtitle" style="margin: 10px;">
          {{uiLabels.settingstitle}}
        </div>
    </header>
    <body>
        <section id="drunkennesslevel">
            <h3>{{uiLabels.howdrunkdoyouwanttobecome}}</h3>
            <button :class="{ active: selectedDrunkenness === 'Tipsy' }" @click="handleButtonClick('Tipsy', 'drunkenness')">{{uiLabels.tipsy}}</button>
            <button :class="{ active: selectedDrunkenness === 'Danceallnight' }" @click="handleButtonClick('Danceallnight', 'drunkenness')">{{uiLabels.danceallnight}}</button>
            <button :class="{ active: selectedDrunkenness === 'Worldrecord' }" @click="handleButtonClick('Worldrecord', 'drunkenness')">{{uiLabels.worldrecord}}</button>
        </section>
        <section id="lengthofgame">
            <h3>{{uiLabels.forhowlongdoyouwanttoplay}}</h3>
            <button :class="{ active: selectedLength === 'Short' }" @click="handleButtonClick('Short', 'length')">{{uiLabels.short}}</button>
            <button :class="{ active: selectedLength === 'Middle' }" @click="handleButtonClick('Middle', 'length')">{{uiLabels.middle}}</button>
            <button :class="{ active: selectedLength === 'Long' }" @click="handleButtonClick('Long', 'length')">{{uiLabels.long}}</button>
        </section>
        <section id="generateroomcode">
            <h3>{{uiLabels.generateroomcode}}</h3>
            <button @click="generateRoomCode">{{uiLabels.generateroomcode}}</button>
            <p v-if="roomCode">{{uiLabels.roomcode}}{{ roomCode }}</p>
        </section>
        <section id="selectgame">
          <h3>{{uiLabels.selectyourgame}}</h3>
          <button :class="{ active: selectedGame === 'Game1' }" @click="selectGame('Game1', 'game')">{{uiLabels.whointheroom}}</button>
          <button :class="{ active: selectedGame === 'Game2' }" @click="selectGame('Game2', 'game')">{{uiLabels.gametwo}}</button>
          <button :class="{ active: selectedGame === 'Game3' }" @click="selectGame('Game3', 'game')">{{uiLabels.gamethree}}</button>
          <button @click="done">{{uiLabels.done}}</button>
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
      selectedGame: null,
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
    selectGame(game) {
      this.selectedGame = game;
    },
    done() {
      if (this.selectedDrunkenness && this.selectedLength && this.selectedGame) {
        this.$router.push({
          path: '/input1/:id',
          query: {
            drunkenness: this.selectedDrunkenness,
            length: this.selectedLength,
            game: this.selectedGame,
          },
        });
    } else {
        alert('Please make selections for all sections before proceeding.');
      }
    },
  },
};
</script>

<style scoped>
  .active {
    background-color: rgb(34, 5, 54);
  }
</style>

<style>
  body{
    background-color:#080B39;
  }

  header{
    font-family: 'Impact', sans-serif;
    color:#F248B6;
    font-size: xx-large;
    padding: 3em;
  }

  button {
    margin: 1vh 2vh;
    height: 5em;
    width: 10em;
    border: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    border-radius: 10pt;
    font-weight: bolder;
}
</style>
