<template>
    <header>
        <h1>Drunkard Dilemmas</h1>
    </header>
    <body>
        <section class="Buttons">
            <router-link  to="/select/" custom v-slot="{ navigate }">
              <button class="Button-Create" @click="navigate" role="link">
                  {{ uiLabels.createPoll }}
              </button>
            </router-link>
            <router-link  to="/join/" custom v-slot="{ navigate }">
              <button class="Button-Join" @click="navigate" role="link">
                  {{ uiLabels.participatePoll }}
              </button>
            </router-link>
        </section>
    </body>
</template>


<script>
</script>


<style>

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
</style>

