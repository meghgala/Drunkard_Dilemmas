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
    background-color:rgb(34, 5, 54);
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
</style>

<script>
</script>
