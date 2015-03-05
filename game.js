var game = new Chess();

// Defines who/what is playing for each color.
// TODO instead of human/engine use a variable from the HTML page.
var player = {
  'w': human,
  'b': engine,
};

// onDragStart/onDrop/onSnapEnd/config are all for Chessboard.js configuration
// to allow for human gameplay.
function onDragStart(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
}

function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });
  if (move === null) return 'snapback';
}

function onSnapEnd() {
  board.position(game.fen());
  $('#board').trigger('moveDone');
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
};

// Make the chessboard and initialize gameplay upon loading the DOM.
var board = new ChessBoard('board', config);
$(function() {
  player[game.turn()]();
});

// Callback after a move has been made.
$('#board').on('moveDone', function() {
  player[game.turn()]();
});
