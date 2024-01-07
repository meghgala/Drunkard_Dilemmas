<template>
  <div>
    <p>
      <h2 v-if="isMobile">{{ player.name }}</h2>
      <h2 v-else :style="{ fontSize: computeFontSize() }">{{ player.name }}</h2>
    </p>
  </div>
</template>

<script>
export default {
  name: 'playerBox',
  props: {
    player: Object
  },
  data() {
    return {
      isMobile: window.innerWidth <= 600
    };
  },
  created() {
    window.addEventListener('resize', this.updateIsMobile);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateIsMobile);
  },
  methods: {
    computeFontSize() {
      // You can adjust this ratio based on your design preferences
      const widthToFontSizeRatio = 0.8;
      const heightToFontSizeRatio = 0.5;

      const maxWidth = 100; // Adjust based on your width
      const maxHeight = 50; // Adjust based on your height

      const widthFontSize = maxWidth * widthToFontSizeRatio;
      const heightFontSize = maxHeight * heightToFontSizeRatio;
      // ...
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 600;
    }
  }
};
</script>

<style scoped>

h2 {
  text-align: center;
  border-radius: 0.25em;
  margin: 1em;
  text-decoration: none;
  background-color: var(--clr-blue3);
  color: var(--clr-bg);
  border: 0.125em solid var(--clr-blue3);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue3);
}

@media (max-width: 600px) {
  
  h2 {
    font-size: clamp(1vw, 4vw, 6vw);
    height: 5vh;
    width: 20vw;
  }


}
</style>
