<template>
  <h1>DRUNKARD <br> DILEMMAS</h1>
  <body>
	<Particlesvue :options="{}"></Particlesvue>
		<div id = "no-winner" v-if="peopleanswered === false">
			<h2>{{ uiLabels.waitingfor }}</h2>
			<Bar class="bar" v-bind:players="players"></Bar>
		</div>
		<div id = "show-winner" v-if="peopleanswered === true">
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
				<button class="next" v-on:click="emitNextQuestion">
  					{{ showNextQuestion ? uiLabels.nextquestion : uiLabels.finish }}
				</button>
			</div>
		</div>
  </body>
</template>
  
<script>
	import io from 'socket.io-client';
	import Particlesvue from '@/components/Particlesvue.vue'
	import Bar from '../components/sipBar.vue'
	
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
					players: [],
					sips: 0,
					creator: sessionStorage.creator,
					showNextQuestion: true,
					index: 0,
					numQuestions: 0
				}
		},

		components: {
      		Particlesvue,
	  		Bar
    	},
	
		created: function () {
			this.roomCode = this.$route.params.roomCode;
			socket.emit("pageLoaded", this.lang);
			socket.on("init", (labels) => {
			this.uiLabels = labels
			});
			socket.on("questionsLoaded", (info) => {
        		this.questionText = info.questions;
				this.index = info.index + 1
        		this.numQuestions = info.amount
				console.log(this.index === this.numQuestions)
				if (this.index === this.numQuestions) {
					this.showNextQuestion = false;
				}
      		})
      		socket.emit("loadQuestions", this.roomCode)
			socket.on('winnerGotten', (winner) => {
				this.winner = winner.name.join(this.uiLabels.and);
				this.sips = winner.sips
			});
			socket.on("playersFetched", (players) => {
        		this.players = players.done;
      		});
      		socket.emit("fetchPlayers", this.roomCode)
			socket.on('playersAnswered', (bool) => {
				this.peopleanswered = bool
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
				socket.off('playersAnswered')
				socket.off('winnerGotten')
				}
			else {
				{this.$router.push('/final/' + this.roomCode)}
			}});
		},
		
		methods: {

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
    font-size: 2em;
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
		margin: 0em auto 0em auto;
		font-size: 3.5em;
	}

	#sips {
		font-size: 75%;
		margin-top: 10px;
	}

	p {
		margin: 0em;
	}

	h2 {
  		font-size: clamp(0.1vh, 8vh, 10vh);
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
		width: 200px;
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
	
	.bar {
    	margin-top: 300px;
		right: 75vh;
  	}
	
	@media (max-width: 600px) {
		#q-container {
			width: 90%;
      font-size: 1.7em;

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
	.bar {
    	margin-top: 300px;
		right: 0;
  	}
}
    
</style>