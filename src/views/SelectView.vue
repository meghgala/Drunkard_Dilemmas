<template>
    <header>
        <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <label for="creator-name">Name</label>
        <input type="text" id="creator-name" />
        <div id="selectgame">
          <h3>{{uiLabels.selectgame}}</h3>
          <button> {{ uiLabels.whointheroom }}</button>
        </div>
        <div>
            <button class="back" v-on:click="$router.go(-1)">
                {{ uiLabels.back }}
            </button>
            <button class="next">
                {{ uiLabels.next }}
            </button>
        </div>

        
    </body>
</template>


<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
    name: 'WinnerView',
    data: function () {
    return {
        lang: localStorage.getItem("lang") || "en",
        uiLabels: {}
        }
    },
    created: function () {
        this.id = this.$route.params.id;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
        this.uiLabels = labels})
        }
}
</script>

<style scoped>

</style>
