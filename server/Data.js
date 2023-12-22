'use strict';
const languages = ["en", "se"];
import {readFileSync} from "fs";

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {}; ///will be removed
  this.rooms = {}; // this is our "database"
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
///////SARA'S AND THERESE'S DATA
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
  console.log(this.rooms[roomCode].allQuestions);
  for (let i = myArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap myArray[i] and myArray[j]
    [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
  }
  this.rooms[roomCode].allQuestions = myArray;
  console.log(this.rooms[roomCode].allQuestions);
  this.rooms[roomCode].index = 0;
}

Data.prototype.retreiveQuestions = function(roomCode) {
  let question = this.rooms[roomCode].allQuestions[this.rooms[roomCode].index]
  let info = {questions: question, players: this.rooms[roomCode].playersdone}
  return info
}
////// END OF SARA'S AND THERESE'S DATA

export { Data };