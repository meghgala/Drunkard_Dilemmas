
<template>
    <header>
        <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <label for="creator-name">Name</label>
        <input v-model="creatorName" type="text" id="creator-name" placeholder="Enter your name"/>
        <div id="selectgame">
          <h3>{{uiLabels.selectgame}}</h3>
          <button :class="{ active: selectedGame === 'Game1' }" @click="selectGame('Game1', 'game')">{{uiLabels.whointheroom}}</button>
          <button :class="{ active: selectedGame === 'Game2' }" @click="selectGame('Game2', 'game')">{{uiLabels.gametwo}}</button>
          <button :class="{ active: selectedGame === 'Game3' }" @click="selectGame('Game3', 'game')">{{uiLabels.gamethree}}</button>
        </div>
        <h3>{{uiLabels.generateroomcode}}</h3>
            <button @click="generateRoomCode">{{uiLabels.generateroomcode}}</button>
            <p v-if="roomCode">{{uiLabels.roomcode}}{{ roomCode }}</p>

        <div>
            <button class="back" v-on:click="$router.go(-1)">
                {{ uiLabels.back }}
            </button>
            <button class="next" :disabled="!selectionsMade" v-on::click="emitSelections" role="link">
                    {{ uiLabels.next }}
            </button>
        </div>
    </body>
</template>


<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
    name: 'SelectView',
    data: function () {
        return {
            lang: localStorage.getItem("lang") || "en",
            uiLabels: {},
            selectedGame: null,
            creatorName: "",
            roomCode: null

        }
        },
    created: function () {
        this.id = this.$route.params.id;
        socket.on('uniqueChecked', (code) => {if (code !== 0) {this.roomCode = code} else {generateRoomCode()}});
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
        this.uiLabels = labels})
        socket.on('selectionsMade', (d) => {
            if (d) {
            sessionStorage.username = this.creatorName;
            this.$router.push('/settings/' + this.roomCode)} 
            else {alert('Fel')}})
    },

    computed: {
        selectionsMade() {
            return (
        this.selectedGame !== null &&
        this.creatorName !== '' &&
        this.roomCode !== null
      )
        }
    },
    methods: {
        selectGame(game) {
        this.selectedGame = game;
        },
        generateRoomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 6;
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
            }
        socket.emit('checkUnique', {tryCode: code});
        },
        emitSelections() {
            console.log(this.roomCode, this.selectedGame, this.creatorName);
            socket.emit('creatorSelections', {roomCode: this.roomCode, game: this.selectedGame, creator: this.creatorName});
        
        }
    },
    };
</script>

<style scoped>
.active {
    background-color: rgb(34, 5, 54);
  }
#next:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}
</style>
