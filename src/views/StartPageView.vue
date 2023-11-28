<template>
    <body>
        <header>
            <h1>Drunkard Dilemmas</h1>
        </header>
        <section class="Buttons">
            <div class="Button-Create">
                <button>Create</button>
            </div>
            <div class="Button-Join">
                <button>Join</button>
            </div>
            <div class="Button-Language">
                <button>Change language</button>
            </div>
        </section>
    </body>
</template>

<style>

body{
    background-color:mediumaquamarine;
}

.Buttons{
    display: grid;
}

.Button-Create{
    grid-column: 1;
    grid-row: 2;
    justify-self: end;
}

.Button-Join{
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
}

.Button-Language{
    grid-column: 1 / span 2;
    grid-row: 1;
    justify-self: end;
}

button {
      margin: 1vh 2vh;
      height: 7em;
      width: 15em;
      border: solid black;
      cursor: pointer;
      transition: background-color 0.3s;
      text-align: center;
      border-radius: 20px;
      font-size: 25px;
      font-weight: bolder;
  }

button:hover {
    background-color:seagreen;
}



</style>

<script>
</script>
