<template>
  <h1>Drunkard Dilemmas</h1>
  <body>
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
	const socket = io("localhost:3000");

	export function removeGetWinnerListener() {
  	socket.off('getWinner');
	}

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
			this.id = this.$route.params.id;
			socket.emit("pageLoaded", this.lang);
			socket.on("init", (labels) => {
			this.uiLabels = labels
			});
			socket.on("questionsLoaded", (info) => {
        this.questionText = info.questions;
      })
      socket.emit("loadQuestions", this.roomCode)
			socket.on('winnerGotten', (winner) => {
				this.winner = winner.name
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
			socket.on('nextQuestionGotten', (d) => {if (d) {this.$router.push('/questions/' + this.roomCode)}
			else {
				{this.$router.push('/final/' + this.roomCode)}
			}})
			
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

			beforeDestroy() {
    		removeGetWinnerListener();
  		},
		}
	}
</script>
  

<style scoped>

	#q-container {
		width: 70%;
		margin: 1em auto 1em auto;
		font-size: 1.3em;
		text-align: left;
		border-radius: 1em;
		padding: 10px 10px 10px 10px;

	}

	#w-container {
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