<template>
    <div>
        <button>
            <h2> {{ player.name }}</h2>
        </button>
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
