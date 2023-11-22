<template>
    <h1>
        Future headline
    </h1>
    <div id="box-container">
        <div id="player_creating" style="background-color: burlywood;">
            <p>
                Still creating questions...
            </p>
            <div>
                <div>
                    Player 1
                </div>
            </div>
        </div>
        <div id="player_done" style="background-color: aquamarine;">
            <p>
                Done!
            </p>
            <div>
                Player 2
            </div>
        </div>
    </div>
    <div>
        <button>
            Start
        </button>
    </div>
</template>
  
  
<script>
  
</script>
  

<style>
#box-container {
    display: grid;
    grid-template-columns: auto auto;
}

#player_creating {
    grid-row: 1;
    grid-column: 1;
}
#player_done {
    grid-row: 1;
    grid-column: 2;
}
</style>