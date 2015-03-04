var engine = function () {
  if (game.game_over()) {
    return false
  }

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

var evaluate = function () {
    currentGame = game
    gamePrime = currentGame.move()

    function() {
        score = (
            
        )
    }
};

var search = function () {
    return null
};
