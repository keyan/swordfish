var engine = function () {
  var possibleMoves = game.moves();
  var moveIndex = Math.floor(
    Math.random()*possibleMoves.length);
  var move = possibleMoves[moveIndex];
  console.log(move)
  game.move(move);
  board.position(game.fen());
  window.setTimeout(
    function() {$('#board').trigger('moveDone')},
    500
  );
};