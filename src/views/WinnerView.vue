<template>
    <h1>
        Future headline
    </h1>
    <body>
        <div id = "q-container">
            <p>
                Question: Whatever the question was, oh it was a long one
            </p>
        </div>
        <div id = "w-container">
            <p>
                _name_ is the winner !
            </p>
            <p id = "sips">
                You get _ sips
            </p>
        </div>
        <div>
            <button>
                Next question
            </button>
        </div>
    </body>
</template>
  
  
<script>
  
</script>
  

<style>
body {
    background-color: rgb(34, 5, 54);
}

#q-container {
    width: 70%;
    margin: 1em auto 1em auto;
    font-size: 1.3em;
    text-align: left;
    background-color:darkmagenta;
    border-radius: 1em;
    padding: 10px 10px 10px 10px;

}

#w-container {
    background-color: chartreuse;
    border-radius: 1em;
    padding: 10px 10px 10px 10px;
    width: 60%;
    margin: 0em auto 1em auto;
    font-size: 2.5em;
}

#sips {
    font-size: 75%;
    margin-top: 10px;
}

p {
    margin: 0em;
}

/* Adjust font size for smaller screens */
@media screen and (max-width: 800px) {
    #q-container {
        font-size: 1em; 
    }
    #w-container {
        font-size: 2em;
    }
}

@media screen and (max-width: 600px) {
    #q-container {
        font-size: 0.8em; 
    }
    #w-container {
        font-size: 1.6em;
    }
}
    
</style>