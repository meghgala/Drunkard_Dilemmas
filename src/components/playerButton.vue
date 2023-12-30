<template>
    <div>
        <button v-on:click ="handleClick">
            <h2> {{ player.name }}</h2>
        </button>
    </div>
</template>


<script>
  export default {
    name: 'playerButton',
    props: {
      player: Object
    },
    emits: ['selectedPlayer'],
    methods: {
        handleClick() {
            this.$emit("selectedPlayer", this.player.name);
            },
    }

}
</script>

<style scoped>
 .white {
       background-color: white;
       width: 200px;
       height: 200px;  

   }
   .blue {
       width: 200px;
       height: 200px;
       background-color: blue;

   }

</style>
