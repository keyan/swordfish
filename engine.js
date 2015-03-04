var engine = function () {
  var possibleMoves = game.moves();
  var moveIndex = Math.floor(
    Math.random()*possibleMoves.length);
  var move = possibleMoves[moveIndex];
  game.move(move);
  board.position(game.fen());
  window.setTimeout(
    function() {$('#board').trigger('moveDone')}, 500
  );
};

var evaluate = function (state, statePrime) {
    return null
};

var search = function () {
    return null
}