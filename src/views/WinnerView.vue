<template>
    <h1>
        Future headline
    </h1>
    <body>
        <div id = "q-container">
            <p>
                {{ uiLabels.question }}: Whatever the question was, oh it was a long one
            </p>
        </div>
        <div id = "w-container">
            <p>
                _name_ {{ uiLabels.winner }}
            </p>
            <p id = "sips">
                {{ uiLabels.recieve }} _ {{ uiLabels.sips }}
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
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'WinnerView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      uiLabels: {}
    }
  },
  created: function () {
    this.id = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  }
}

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