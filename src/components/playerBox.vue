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

<style>
:root {
  --clr-title: #00c8c1;
  --clr-blue1: rgb(12, 185, 237);
  --clr-blue2: rgb(10, 78, 196);
  --clr-blue3: rgb(23, 100, 232);
  --clr-blue4: rgb(3, 66, 173);
  --clr-back: rgb(232, 19, 185);
  --clr-white: #ffffff;
  --clr-bg: #10011e;
  --clr-yellow: rgb(255, 255, 120);
}
</style>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

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
