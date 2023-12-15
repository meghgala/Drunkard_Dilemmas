<template>
    <header>
        <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <section>
          <form>
            <div>
                <label for="Roomcode"></label><br>
                <input v-model="roomCode" id="Roomcode" type="text" required="required" :placeholder= uiLabels.enterroomcode />
            </div>
            <div>
                <label for="Name"></label><br>
                <input v-model="name" id="Name" type="text" required="required" :placeholder= uiLabels.entername />
            </div>
          </form>
        </section>
        <section class="Buttons">
          <button class="back" v-on:click="$router.go(-1)">
                {{ uiLabels.back }}
            </button>
                <button class="next" :disabled="!selectionsMade" v-on::click="emitCheckRoom">
                    {{ uiLabels.next }}
                </button>
        </section>
    </body>
</template>


<script>

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
    name: 'JoinRoomView',
    data: function () {
        return {
            uiLabels: {},
            id: "",
            lang: localStorage.getItem("lang") || "en",
            name: "",
            roomCode: null 
        }
    },
    computed: {
        selectionsMade() {
            return (
                this.roomCode !== null &&
                this.name !== '')
        }
    },
    created: function () {
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })
        socket.on('roomChecked', (d) => {if (d) {
            sessionStorage.username = this.name;
            this.$router.push('/input/' + this.roomCode)} else {alert(this.uiLabels.alertroomcode)}})
    },
    methods: {
        emitCheckRoom() {
            socket.emit('checkRoom', {roomCode: this.roomCode, name: this.name});
        }
    }
}
</script>


<style scoped>

body{
    background-color:#007672
}

header{
    background-color:#007672;
    font-family: 'Impact', sans-serif;
    color:#00c8c1;
    font-size: 4vmin;
    padding: 2em;
}

.Button-Join{
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
    background-color: #FF5929;
}

button {
    margin: 1vh 1vh;
    height: 15vh;
    width: 15vw;
    border: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    border-radius: 20pt;
    font-size: 5vmin;
    font-weight: bolder;
}

</style>

