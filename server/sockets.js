function sockets(io, socket, data) {

  console.log("User connected:", socket.id);
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang)); 
  });

  socket.on('settings', function (d) {
    console.log("Received 'settings' event:", d.drunkness, d.length, d.roomCode);
    data.gameSettings(d.drunkness, d.length, d.roomCode)
    console.log("socket is running")
    //socket.emit('roomcode', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  ////////// SARA'S SOCKETS
  socket.on('creatorSelections', function(d) {
    data.creatorSelections(d.roomCode, d.game, d.creator)
  });

  socket.on('checkRoom', function(d) {
    socket.emit('roomChecked', data.checkRoom(d.roomCode, d.name))

  });

  //// END OF SARA'S SOCKETS
}

export { sockets };