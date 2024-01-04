'use strict';
const languages = ["en", "se"];
import {readFileSync} from "fs";

function Data() {
  this.rooms = {}; 
}

// Adding the creators emitted settings to the room.
Data.prototype.addSettings = function(drunkness, NumQuestions, roomCode) {
  this.rooms[roomCode].drunkness = drunkness;
  this.rooms[roomCode].numQuestions = NumQuestions;
  console.log('Settings added: ', this.rooms[roomCode])
  return true;
}

//Adding the questions emitted by a player to the room.
Data.prototype.addQuestions = function(roomCode, questions) {
  if ('allQuestions' in this.rooms[roomCode]) {
    for (let q of questions) {
      this.rooms[roomCode].allQuestions.push(q)
      console.log('Questions added: ', this.rooms[roomCode].allQuestions)
    }
    return true;
  } else {
    this.rooms[roomCode].allQuestions = questions
    console.log('Questions created and added: ', this.rooms[roomCode].allQuestions)
    return true;
  }
}

// Check if the room code exists.
// If the room exists and the entered name is unique, the new player is added to the room.
Data.prototype.checkRoom = function(roomCode, name) {
  if (roomCode in this.rooms) {
    if (!this.rooms[roomCode].playerswaiting.some(player => player.name === name)) {
    let player = {
      name: name,
      sips: 0,
    }
    this.rooms[roomCode].playerswaiting.push(player);
    console.log('New player:', this.rooms[roomCode].playerswaiting)
    return true;
    }
    return 'name_exists'
  }
  return false;
}


Data.prototype.checkUnique = function(tryCode) {
  if (tryCode in this.rooms) {
    return 0;
  }
  return tryCode;
}

Data.prototype.creatorSelections = function(roomCode, creator) {
  let room = {};
  let player = {
    name: creator,
    sips: 0,
  }
  room.playersdone = [];
  room.playerswaiting = [player];
  this.rooms[roomCode] = room;

  console.log('Room created:', room)
  return true;
}

Data.prototype.deleteGame = function(roomCode) {
  if (roomCode in this.rooms) {
    delete this.rooms[roomCode];
    return true;
  }
}

Data.prototype.fetchPlayers = function(roomCode) {
  let players = { waiting: this.rooms[roomCode].playerswaiting, done: this.rooms[roomCode].playersdone}
  console.log('Fetch player lists:', players)
  return players
}

Data.prototype.getFinalWinner = function(roomCode) {
  let highestscore = 0;
  let person = [];
  for (let player in this.rooms[roomCode].selectedPlayers) {
    if (highestscore < this.rooms[roomCode].selectedPlayers[player]) {
      highestscore = this.rooms[roomCode].selectedPlayers[player];
      person = [player];
    }
    else if (highestscore === this.rooms[roomCode].selectedPlayers[player]) {
      person.push(player)
    }
  };
  let winners = this.rooms[roomCode].playersdone.filter(player => person.includes(player.name));
  let winnernames = []
  winners.forEach(winner => {
    winnernames.push(winner.name) 
  });
  return winnernames;
}

Data.prototype.getUILabels = function (lang = "en") {
  const labels = readFileSync("./server/data/labels-" + lang + ".json");
  return JSON.parse(labels);
}
Data.prototype.getWinner = function(roomCode) {
  let highestscore = 0;
  let person = [];
  for (let player in this.rooms[roomCode].selectedPlayers) {
    if (highestscore < this.rooms[roomCode].selectedPlayers[player]) {
      highestscore = this.rooms[roomCode].selectedPlayers[player];
      person = [player];
    }
    else if (highestscore === this.rooms[roomCode].selectedPlayers[player]) {
      person.push(player)
    }
  };
  let sips = Math.floor(Math.random() * this.rooms[roomCode].drunkness) + 1;
  let winners = this.rooms[roomCode].playersdone.filter(player => person.includes(player.name));
  let winnernames = []
  winners.forEach(winner => {
    winner.sips += sips;
    winnernames.push(winner.name) 
  });
  console.log('Amount of sips: ', sips)
  console.log('The winning player:', winnernames)
  return {name: winnernames, sips: sips};
}

Data.prototype.newGame = function(roomCode) {
  this.rooms[roomCode].allQuestions = [];
  return true
}

Data.prototype.playersAnswered = function(roomCode) {
  let nrofpeople = 0;
  for (let player in this.rooms[roomCode].selectedPlayers) {
    nrofpeople += this.rooms[roomCode].selectedPlayers[player]
  }
  if (nrofpeople === this.rooms[roomCode].playersdone.length) {
    return true;
  }
  return false;
}

Data.prototype.playerDone = function(roomCode, nameToFind) {
  const foundPlayer = this.rooms[roomCode].playerswaiting.find(player => player.name === nameToFind);
  this.rooms[roomCode].playersdone.push(foundPlayer);
  this.rooms[roomCode].playerswaiting = this.rooms[roomCode].playerswaiting.filter(player => player.name !== nameToFind);
  let players = { waiting: this.rooms[roomCode].playerswaiting, done: this.rooms[roomCode].playersdone}
  console.log('Updated player lists:', players)
  return players
}

Data.prototype.resetQuestionView = function(roomCode) {
  this.rooms[roomCode].index += 1;
  if (this.rooms[roomCode].index < this.rooms[roomCode].allQuestions.length) {
    this.rooms[roomCode].selectedPlayers = {}
    return true;
  }
  return false;
}

Data.prototype.retreiveQuestions = function(roomCode) {
  let question = this.rooms[roomCode].allQuestions[this.rooms[roomCode].index]
  let info = {questions: question, players: this.rooms[roomCode].playersdone}
  return info
}

Data.prototype.retriveSettings = function(roomCode) {
  return this.rooms[roomCode].numQuestions;
}

Data.prototype.selectPlayer = function(roomCode, player) {
  if ('selectedPlayers' in this.rooms[roomCode]) {
    if (player in this.rooms[roomCode].selectedPlayers) {
      this.rooms[roomCode].selectedPlayers[player] += 1;
    } 
    else {
      this.rooms[roomCode].selectedPlayers[player] = 1;
    }
  } 
  else {
    this.rooms[roomCode].selectedPlayers = {[player]: 1};
  }
  console.log('Selected players', this.rooms[roomCode].selectedPlayers);
  return true;
}

Data.prototype.shuffle = function(roomCode) {
  let myArray = this.rooms[roomCode].allQuestions;
  for (let i = myArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
  }
  this.rooms[roomCode].allQuestions = myArray;
  console.log('All questions:', this.rooms[roomCode].allQuestions);
  this.rooms[roomCode].index = 0;
}

export { Data };