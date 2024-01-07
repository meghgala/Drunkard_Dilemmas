function sockets(io, socket, data) {

  console.log("User connected:", socket.id);
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang)); 
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('creatorSelections', function(d) {
    socket.emit('selectionsMade', data.creatorSelections(d.roomCode, d.creator))
    socket.join(d.roomCode);
  });

  socket.on('deleteGame', function(d) {
    let bool = data.deleteGame(d.roomCode)
    socket.emit('gameDeleted', bool)
    io.to(d.roomCode).emit('gameDeleted', bool)
  });

  socket.on('checkRoom', function(d) {
    let roomOK = data.checkRoom(d.roomCode, d.username)
    if (roomOK) {
      socket.join(d.roomCode);
      io.to(d.roomCode).emit('playerUpdate', data.fetchPlayers(d.roomCode))
    }
    socket.emit('roomChecked', roomOK)
  });

  socket.on('enterLobby', function (d) {
    socket.join(d.roomCode)
    io.to(d.roomCode).emit('playerUpdate', data.fetchPlayers(d.roomCode))
  });

  
  socket.on('checkUnique', function(d) {
    socket.join(d.roomCode)
    socket.emit('uniqueChecked', data.checkUnique(d.tryCode))
  });

  socket.on('addSettings', function (d) {
    socket.join(d.roomCode)
    io.to(d.roomCode).emit('settingsadded', data.addSettings(d.drunkness, d.NumQuestions, d.roomCode))
  });

  socket.on('retrieveSettings', function (d) {
    socket.join(d.roomCode)
    io.to(d.roomCode).emit('settingsReceived', data.retriveSettings(d.roomCode))
  });
  
  socket.on('addQuestions', function (d) {
    socket.join(d.roomCode)
    socket.emit('questionsAdded', data.addQuestions(d.roomCode, d.questions))
    io.to(d.roomCode).emit('addToPlayerDone', data.playerDone(d.roomCode, d.username))
  });

  socket.on('playerDone', function (d)  {
    socket.join(d.roomCode);
    io.to(d.roomCode).emit('addToPlayerDone', data.playerDone(d.roomCode, d.username))
  });

  socket.on('Startgame', function (d) {
    data.shuffle(d.roomCode)
    io.to(d.roomCode).emit('Gamestarted', d.roomCode)
  });

  socket.on("loadQuestions", function (roomCode) {
    socket.join(roomCode);
    socket.emit("questionsLoaded", data.retreiveQuestions(roomCode))
  });

  socket.on('selectPlayer', function (d) {
    socket.join(d.roomCode);
    socket.emit("playerSelected", data.selectPlayer(d.roomCode, d.player))
  });

  socket.on('playerAnswered', function (roomCode) {
    io.to(roomCode).emit("playersAnswered", data.playersAnswered(roomCode))
  });

  socket.on('getWinner', function (roomCode) {
    io.to(roomCode).emit("winnerGotten", data.getWinner(roomCode))
  });

  socket.on('getNextQuestion', function (roomCode) {
    io.to(roomCode).emit('nextQuestionGotten', data.resetQuestionView(roomCode))
  });

  socket.on('getFinalWinner', function (roomCode) {
    socket.join(roomCode)
    socket.emit('finalWinnerRecieved', data.getFinalWinner(roomCode))
  });

  socket.on("newGame", function (roomCode) {
    io.to(roomCode).emit('newGamePrepared', data.newGame(roomCode))
  });
  
}

export { sockets };