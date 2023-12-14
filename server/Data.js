'use strict';
const languages = ["en", "se"];
import {readFileSync} from "fs";

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {}; ///will be removed
  this.rooms = {}; // this is our "database"
  this.rooms["FUN123"] = {
    gametype: "Game1",
    players: ["Therese", "Sara"],
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
  room.players = [player];
  this.rooms[roomCode] = room;
  return true;
}

Data.prototype.checkRoom = function(roomCode, name) {
  if (roomCode in this.rooms) {
    let player = {
      name: name,
      sips: 0,
    }
    this.rooms[roomCode].players.push(player);
    return true;
  }
  return false;
}

Data.prototype.fetchPlayers = function(roomCode) {
  return this.rooms[roomCode].players
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

////// END OF SARA'S AND THERESE'S DATA

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
export { Data };