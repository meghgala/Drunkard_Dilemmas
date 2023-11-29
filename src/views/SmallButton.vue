

<template>
  <button :style="{ backgroundColor: bgColor }" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'blue',
    },
  },
  data() {
    return {
      bgColor: 'red',
    };
  },
  methods: {
    handleClick() {
      this.bgColor = this.color;
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
button {
  padding: 5px 10px;
}
</style>
