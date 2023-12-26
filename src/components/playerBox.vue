<template>
    <div>
        <p>
            <h2> {{ player.name }}</h2>
        </p>
    </div>
</template>


<script>
  export default {
    name: 'playerBox',
    props: {
      player: Object
    },
}
</script>

<style scoped>
div {
  margin: 2em 2em 2em 2em;
  background-color: darkred;
  width: 8em;
  color: white;
}
</style>
