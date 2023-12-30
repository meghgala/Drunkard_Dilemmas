'use strict';
const languages = ["en", "se"];
import {readFileSync} from "fs";

function Data() {
  this.rooms = {}; 
  this.rooms["FUN123"] = {
    gametype: "Game1",
    playerswaiting: [{name: "Therese", sips: 10}, {name: "Sara", sips: 20}],
    playersdone: [{name: "Johan", sips: 0}, {name: "Megh", sips: 100}],
    allQuestions: ["a", "b", "c"],
    drunkness: "Tipsy",
    numQuestions: 1
  }
}

Data.prototype.getUILabels = function (lang = "en") {
  const labels = readFileSync("./server/data/labels-" + lang + ".json");
  return JSON.parse(labels);
}

Data.prototype.creatorSelections = function(roomCode, game, creator) {
  let room = {};
  room.gametype = game;
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

Data.prototype.checkRoom = function(roomCode, name) {
  if (roomCode in this.rooms) {
    let player = {
      name: name,
      sips: 0,
    }
    this.rooms[roomCode].playerswaiting.push(player);
    console.log('New player:', this.rooms[roomCode].playerswaiting)
    return true;
  }
  return false;
}

Data.prototype.fetchPlayers = function(roomCode) {
  let players = { waiting: this.rooms[roomCode].playerswaiting, done: this.rooms[roomCode].playersdone}
  console.log('Fetch player lists:', players)
  return players
}

Data.prototype.checkUnique = function(tryCode) {
  if (tryCode in this.rooms) {
    return 0;
  }
  return tryCode;
}

Data.prototype.deleteGame = function(roomCode) {
  if (roomCode in this.rooms) {
    delete this.rooms[roomCode];
    return true;
  }
}

Data.prototype.addSettings = function(drunkness, NumQuestions, roomCode) {
  this.rooms[roomCode].drunkness = drunkness;
  this.rooms[roomCode].numQuestions = NumQuestions;
  return true;
}

Data.prototype.retriveSettings = function(roomCode) {
  return this.rooms[roomCode].numQuestions;
}

Data.prototype.addQuestions = function(roomCode, questions) {
  if ('allQuestions' in this.rooms[roomCode]) {
    for (let q of questions) {
      this.rooms[roomCode].allQuestions.push(q)
    }
    return true;
  } else {
    this.rooms[roomCode].allQuestions = questions
    return true;
  }
}

Data.prototype.playerDone = function(roomCode, nameToFind) {
  const foundPlayer = this.rooms[roomCode].playerswaiting.find(player => player.name === nameToFind);
  this.rooms[roomCode].playersdone.push(foundPlayer);
  this.rooms[roomCode].playerswaiting = this.rooms[roomCode].playerswaiting.filter(player => player.name !== nameToFind);
  let players = { waiting: this.rooms[roomCode].playerswaiting, done: this.rooms[roomCode].playersdone}
  console.log('Updated player lists:', players)
  return players
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

Data.prototype.retreiveQuestions = function(roomCode) {
  let question = this.rooms[roomCode].allQuestions[this.rooms[roomCode].index]
  let info = {questions: question, players: this.rooms[roomCode].playersdone}
  return info
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

Data.prototype.getWinner = function(roomCode) {
  let highestscore = 0;
  let person = '';
  for (let player in this.rooms[roomCode].selectedPlayers) {
    if (highestscore < this.rooms[roomCode].selectedPlayers[player]) {
      highestscore = this.rooms[roomCode].selectedPlayers[player];
      person = player;
    };
  };
  let sips = Math.floor(Math.random() * this.rooms[roomCode].drunkness) + 1;
  let winner = this.rooms[roomCode].playersdone.find(player => player.name === person);
  winner.sips += sips;
  console.log('Amount of sips: ', sips)
  console.log('The winning player:',winner)
  return {name: winner.name, sips: sips};
}

Data.prototype.resetQuestionView = function(roomCode) {
  this.rooms[roomCode].index += 1;
  if (this.rooms[roomCode].index < this.rooms[roomCode].allQuestions.length) {
    this.rooms[roomCode].selectedPlayers = {}
    return true;
  }
  return false;
}

export { Data };