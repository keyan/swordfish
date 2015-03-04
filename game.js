var game = new Chess();

var player = {
  'w': human,
  'b': engine,
};

var onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};

var onDrop = function(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });
  if (move === null) return 'snapback';
};

var onSnapEnd = function() {
  board.position(game.fen());
  $('#board').trigger('moveDone');
};

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
};

var board = new ChessBoard('board', config);
$(function() {
  player[game.turn()]();
});

$('#board').on('moveDone', function() {
  player[game.turn()]();
});
