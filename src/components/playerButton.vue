<template>
  <div class="player-row">
    <button v-on:click="handleClick" :class="{ active: isSelected }">
      {{ player.name }}
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
  data() {
    return {
      isSelected: false
    };
  },
  watch: {
    '$parent.selectedPlayer': function(newPlayer) {
      this.isSelected = this.player.name === newPlayer;
    }
  },
  methods: {
    handleClick() {
      this.$emit('selectedPlayer', this.player.name);
    }
  }
};
</script>

<style scoped>

.player-row {
  display: flex;
  justify-content: center;
}

button {
  color: var(--clr-orange);
  border: 0.125em solid var(--clr-orange);
  text-shadow: 0 0 0.09em var(--clr-orange), 0 0 0.65em var(--clr-orange);
  box-shadow: inset 0 0 0.5em 0 var(--clr-orange), 0 0 0.5em 0 var(--clr-orange);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;
  height: 10vh;
  width: 14vw;
  margin: 0.2%;
}

button:hover {
  background-color: var(--clr-orange);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-orange);
}

button.active {
  /* Styles for the active/selected button */
  background-color: var(--clr-orange);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-orange);
}

@media (max-width: 600px) {
  
  button {
  color: var(--clr-orange);
  border: 0.125em solid var(--clr-orange);
  text-shadow: 0 0 0.09em var(--clr-orange), 0 0 0.65em var(--clr-orange);
  box-shadow: inset 0 0 0.5em 0 var(--clr-orange), 0 0 0.5em 0 var(--clr-orange);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(1vw, 4vw, 4vw);
  cursor: pointer;
  border-radius: 15px;
  height: 50px;
  width: 100px;
  margin: 2%;
  
}
}
</style>
