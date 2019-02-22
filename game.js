var game = new Chess();

// Defines who/what is playing for each color.
// TODO instead of human/engine use a variable from the HTML page.
var player = {
  'w': engine,
  'b': engine,
};

// onDragStart/onDrop/onSnapEnd/config are all for Chessboard.js configuration
// to allow for human gameplay.
function onDragStart(source, piece, position, orientation) {
  // if (game.in_checkmate() === true || game.in_draw() === true ||
  //   piece.search(/^b/) !== -1) {
    return false;
  // }
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
  window.setTimeout(
    function() {$('#board').trigger('moveDone')}, 500
  );
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  moveSpeed: 'slow',
  snapSpeed: 'fast',
  appearSpeed: 'slow',
  trashSpeed: 'fast',
};

// Make the chessboard and initialize gameplay upon loading the DOM.
var board = new ChessBoard('board', config);
$(function() {
    $('.start').click(function(e) {
        e.preventDefault();
        player[game.turn()]();
    });

});

// Callback after a move has been made.
$('#board').on('moveDone', function() {
  player[game.turn()]();
});
