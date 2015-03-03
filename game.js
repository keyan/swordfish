var board,
    game = new Chess();

var player = {
  'w': engine,
  'b': engine,
};

$('#board').on('moveDone', function() {
  player[game.turn()]();
});

// check this during onDragStart
var playerType = {
  'w': "computer",
  'b': "computer",
};

var cfg = {
  draggable: false,
  position: 'start',
  onDragStart: null,
  onDrop: null,
  onSnapEnd: null,
};

var board = new ChessBoard('board', cfg);

$(function() {
  player[game.turn()]();

});