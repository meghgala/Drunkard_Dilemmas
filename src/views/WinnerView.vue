<template>
  <h1>DRUNKARD <br> DILEMMAS</h1>
  <body>
	<Particlesvue :options="{}"></Particlesvue>
		<div id = "no-winner" style="display: none;">
			<h2>{{ uiLabels.waitingfor }}</h2>
		</div>
		<div id = "show-winner" style="display: none;">
			<div id = "q-container">
				<p>
					{{ uiLabels.question }} : {{ questionText}}
				</p>
			</div>
			<div id = "w-container">
				<p>
					{{ winner }} {{ uiLabels.winner }}
				</p>
				<p id = "sips">
					{{ uiLabels.recieve }} {{ sips }} {{ uiLabels.sips }}
				</p>
			</div> 
			<img class="img" src="../../public/img/penguin.png">
			<div v-if="creator === 'true'" >
				<button class="next" v-on::click="emitNextQuestion">
						{{ uiLabels.nextquestion }}
				</button>
			</div>
		</div>
  </body>
</template>
  
<script>
	import io from 'socket.io-client';
	import Particlesvue from '@/components/Particlesvue.vue'
	
    const socket = io(sessionStorage.getItem("dataServer"));

	export default {
		name: 'WinnerView',
		data: function () {
				return {
					lang: localStorage.getItem("lang") || "en",
					uiLabels: {},
					roomCode: '',
					questionText: '',
					peopleanswered: false,
					winner: '',
					sips: 0,
					creator: sessionStorage.creator,
				}
		},
	
		created: function () {
			this.roomCode = this.$route.params.roomCode;
			socket.emit("pageLoaded", this.lang);
			socket.on("init", (labels) => {
			this.uiLabels = labels
			});
			socket.on("questionsLoaded", (info) => {
        this.questionText = info.questions;
      })
      socket.emit("loadQuestions", this.roomCode)
			socket.on('winnerGotten', (winner) => {
				this.winner = winner.name.join(this.uiLabels.and);
				this.sips = winner.sips
			});
			socket.on('playersAnswered', (bool) => {
				this.peopleanswered = bool
				this.toggleWinnerVisibility()
				if (bool === true) {
					if (this.creator === 'true'){
						console.log('creator', this.creator)
						socket.emit('getWinner', this.roomCode)
					}
				}
			});
			socket.emit("playerAnswered", this.roomCode);
			socket.on('nextQuestionGotten', (d) => {if (d) {
				this.$router.push('/questions/' + this.roomCode)
				socket.off('playersAnswered')}
			else {
				{this.$router.push('/final/' + this.roomCode)}
			}});
		},
		components: {
      Particlesvue,
    },
		methods: {
			toggleWinnerVisibility() {
  			const showWinnerDiv = document.getElementById('show-winner');
				const dontshowWinnerDiv = document.getElementById('no-winner')
  			if (this.peopleanswered) {
    			showWinnerDiv.style.display = 'block';
					dontshowWinnerDiv.style.display = 'none';
  			} 
				else {
    			showWinnerDiv.style.display = 'none';
					dontshowWinnerDiv.style.display = 'block';
  			}
			},

			emitNextQuestion() {
        socket.emit('getNextQuestion', this.roomCode);
      },
		}
	}
</script>
  

<style scoped>

	#q-container {
		width: 70%;
    margin: 1em auto 1em auto;
    font-size: 2.3em;
    text-align: left;
    border-radius: 1em;
    padding: 10px;
    display: flex;
    justify-content: center;
    word-wrap: break-word;
	}

	#w-container {
		border-radius: 1em;
		padding: 10px 10px 10px 10px;
		width: 60%;
		margin: 0em auto 1em auto;
		font-size: 3.5em;
	}

	#sips {
		font-size: 75%;
		margin-top: 10px;
	}

	p {
		margin: 0em;
	}
	.next{
  color: var(--clr-green);
  border: 0.125em solid var(--clr-green);
  text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
  box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
  background-color: transparent;
  font-weight: bolder;
  font-size: clamp(0.1rem, 1.5vw, 1.5rem);
  cursor: pointer;
  border-radius: 15px;
  height: 10vh;
  width: 24vw;
}
.next:hover{
  background-color: var(--clr-green);
  color: var(--clr-bg);
  text-shadow: none;
  box-shadow: 0 0 2em 0 var(--clr-green);
}

.img{
	width: 300px;
	margin: 15px;
}

	h1 {
		text-shadow: 0 0 0.02em white, 0 0 6em var(--clr-title);
		position: fixed;
		top: 1vh;
		left: 1vh;
		margin-top: -0.1vh;
		line-height: 0.8;
		font-size: clamp(1vw, 3vw, 4vw);
		}
	
	@media (max-width: 600px) {
		#q-container {
			width: 90%; /* Adjust width for smaller screens */
      font-size: 2em;

      word-wrap: break-word;
	}
	#w-container {
		font-size: clamp(0.1vh, 7vh, 8vh);
	}
	.img{
		margin-top: -25px;
		width: 150px;
	}
	.next{
		color: var(--clr-green);
		border: 0.125em solid var(--clr-green);
		text-shadow: 0 0 0.09em var(--clr-green), 0 0 0.65em var(--clr-green);
		box-shadow: inset 0 0 0.5em 0 var(--clr-green), 0 0 0.5em 0 var(--clr-green);
		background-color: transparent;
		font-weight: bolder;
		font-size: clamp(1vw, 4vw, 4vw);
		cursor: pointer;
		border-radius: 15px;
		height: 10vh;
		width: 24vw;
	}
	}
    
</style>