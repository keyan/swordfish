// Piece and mobility weights for evaulation function.
var kingWt = 200;
var queenWt = 9;
var rookWt = 5;
var knightWt = 3;
var bishopWt = 3;
var pawnWt = 1;
var mobilityWt = 0.1;

// Implements at replaceAt function to change a char at specific index.
function stringReplaceAt(s, index, replacement) {
    return s.substr(0, index) + replacement + s.substr(index+1, s.length);
}

// Check to see if computer should move, if yes find/make the move, update the
// board and callback.
function engine() {
  if (game.game_over()) {
    return false;
  }

  var move = think()['move'];
  game.move(move);
  board.position(game.fen());
  window.setTimeout(
    function() {$('#board').trigger('moveDone')}, 2000
  );
}

// Wrapper for search and evaulate.
// TODO: remove hardcoded initial scores, find suitable alternative.
function think(){
    var possibleMoves = game.moves();
    var bestMove = {
        'move': null,
        'score': (game.turn() === 'w' ? -9999:9999),
    };

    for (var x = 0; x < possibleMoves.length; x++){
        var currentGame = new Chess(game.fen());
        var currentMove = possibleMoves[x]
        currentGame.move(currentMove);
        var currentMoveScore = evaluate(currentGame);
        if (game.turn() == 'b') {
            if (currentMoveScore < bestMove['score']) {
                bestMove['move'] = currentMove;
                bestMove['score'] = currentMoveScore;
            }
        } else if (game.turn() == 'w') {
            if (currentMoveScore > bestMove['score']) {
                bestMove['move'] = currentMove;
                bestMove['score'] = currentMoveScore;
            }
        }
    }
    return bestMove;
}

function search () {
    return null
}

function evaluate(gameState) {
    var possibleMoves = gameState.moves();
    var fen = gameState.fen();
    var currentChar;
    var piecesMap = {
        'p': 0,
        'b': 0,
        'n': 0,
        'r': 0,
        'q': 0,
        'k': 0,
        'P': 0,
        'B': 0,
        'N': 0,
        'R': 0,
        'Q': 0,
        'K': 0,
    };

    for (var x = 0; x < fen.length; x++) {
        currentChar = fen.charAt(x);
        if (currentChar === ' ') {
            break;
        } 
        if (currentChar in piecesMap) {
            piecesMap[currentChar] += 1;
        }
    }

    var materialScore = (
          kingWt * (piecesMap['K'] - piecesMap['k'])
        + queenWt * (piecesMap['Q'] - piecesMap['q'])
        + rookWt * (piecesMap['R'] - piecesMap['r'])
        + bishopWt * (piecesMap['B'] - piecesMap['b'])
        + knightWt * (piecesMap['N'] - piecesMap['n'])
        + pawnWt * (piecesMap['P'] - piecesMap['p'])
    );

    var turnCharIndex = fen.indexOf(' ') + 1;

    if (fen.charAt(turnCharIndex) === 'w') {
        fen = stringReplaceAt(fen, turnCharIndex, 'b');
        var oppositeGame = new Chess(fen);
        whiteMobility = gameState.moves().length;
        blackMobility = oppositeGame.moves().length;
    } else {
        fen = stringReplaceAt(fen, turnCharIndex, 'w');
        var oppositeGame = new Chess(fen);
        whiteMobility = oppositeGame.moves().length;
        blackMobility = gameState.moves().length;
    }
    var mobilityScore = mobilityWt * (whiteMobility - blackMobility);

    return (materialScore + mobilityScore);
}
