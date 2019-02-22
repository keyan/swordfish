var game = new Chess();

// Defines who/what is playing for each color.
function assignPlayers() {
    var wElement = document.getElementById("white-select");
    var bElement = document.getElementById("black-select");
    var wValue = wElement.options[wElement.selectedIndex].value;
    var bValue = bElement.options[bElement.selectedIndex].value;

    console.log("wValue: " + wValue);
    console.log("bValue: " + bValue);

    var wPlayerFunc;
    var bPlayerFunc;
    switch (wValue) {
        case "human":
            console.log("Selected human for white")
            wPlayerFunc = human;
            break;
        case "computer":
            console.log("Selected engine for white")
            wPlayerFunc = engine;
            break;
    }
    switch (bValue) {
        case "human":
            bPlayerFunc = human
            break;
        case "computer":
            bPlayerFunc = engine
            break;
    }

    return {
        'w': wPlayerFunc,
        'b': bPlayerFunc,
    }
};

var players = assignPlayers();

// onDragStart/onDrop/onSnapEnd/config are all for Chessboard.js configuration
// to allow for human gameplay.
function onDragStart(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true) {
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
  moveSpeed: 'fast',
  snapSpeed: 'fast',
  appearSpeed: 'fast',
  trashSpeed: 'fast',
};

// Make the chessboard and initialize gameplay upon loading the DOM.
var board = new ChessBoard('board', config);
$(function() {
    $('.start').click(function(e) {
        e.preventDefault();
        players = assignPlayers();
        players[game.turn()]();
    });

});

// Callback after a move has been made.
$('#board').on('moveDone', function() {
  players[game.turn()]();
});
