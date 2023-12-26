<template>
  <div>
    <p>
      <h2 :style="{ fontSize: computeFontSize() }">{{ player.name }}</h2>
    </p>
  </div>
</template>

<script>
export default {
  name: 'playerBox',
  props: {
    player: Object
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

      // Use the smaller of the two font sizes to ensure it fits both width and height
      return `${Math.min(widthFontSize, heightFontSize)}px`;
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
h2 {
  font-family: 'Indie Flower', cursive;
  height: 70px;
  width: 140px;
  text-align: center;
  border-radius: 0.25em;
  margin: 1em;
  text-decoration: none;
  background-color: transparent;
  color: var(--clr-blue3);
  border: 0.125em solid var(--clr-blue3);
  background-color: var(--clr-blue3);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-blue3);
}
</style>
