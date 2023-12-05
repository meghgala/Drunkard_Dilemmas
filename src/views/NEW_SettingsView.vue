<template>
    <header>
      <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <h2 class="viewtitle" style="margin: 10px;">
          {{uiLabels.settingstitle}}
        </h2>
        <label for="num-questions">Select the number of questions each player should at least enter</label>
        <input v-model="NumQuestions" type="number" id="num-questions" placeholder="Enter a number">
        <div id="drunkennesslevel">
            <h3>{{uiLabels.howdrunkdoyouwanttobecome}}</h3>
            <button :class="{ active: selectedDrunkenness === 'Tipsy' }" @click="handleButtonClick('Tipsy', 'drunkenness')">{{uiLabels.tipsy}}</button>
            <button :class="{ active: selectedDrunkenness === 'Drunk' }" @click="handleButtonClick('Drunk', 'drunkenness')">{{uiLabels.drunk}}</button>
            <button :class="{ active: selectedDrunkenness === 'Shitfaced' }" @click="handleButtonClick('Shitfaced', 'drunkenness')">{{uiLabels.shitfaced}}</button>
        </div>
    </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'SettingsView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en", uiLabels: {},
      NumQuestions: null,

    };
  },

  created: function () {
    this.id = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {this.uiLabels = labels})
  },
}

</script>

