<template>
    <body>
        <header>
            <h1>Drunkard Dilemmas</h1>
        </header>
        <div class="Flag-Button">
                <button class="flag1"></button>
                <button class="flag2"></button>
        </div>
        <section class="Buttons">
            <button class="Button-Create">Create</button>
            <button class="Button-Join">Join</button>
        </section>
    </body>
</template>

<style>

body{
    background-color:rgb(34, 5, 54);
    font-family: 'Impact', sans-serif;
    color: aliceblue;
    font-size: xx-large;
}

header{
    padding: 3em;
}

.Buttons{
    display: grid;
}

.Button-Create{
    grid-column: 1;
    grid-row: 2;
    justify-self: end;
    background-color: saddlebrown;
}

.Button-Join{
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
    background-color: green;
}

button {
    margin: 1vh 2vh;
    height: 7em;
    width: 15em;
    border: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    border-radius: 20pt;
    font-size: 20pt;
    font-weight: bolder;
}

.Button-Create:hover {
    background-color:darkorange;
}

.Button-Join:hover {
    background-color:limegreen;
}

.Flag-Button {
    display: flex;
}

.flag1, .flag2 {
    position: absolute;
    width: 100%;
    height: 100%; 
    background-size: cover;
}

.flag1 {
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
  background-image: url('https://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53E4/A986/7055/D0CD/B15F/0A28/100A/F37A/Flag_of_Sweden_ml.png');
  transform: scale(0.15);
}

.flag2 {
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
  background-image: url('https://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53E6/2F6A/4819/C919/633F/0A28/100B/048A/Flag_of_the_United_Kingdom.png');
  transform: scale(0.15);
}
</style>

<script>
</script>
