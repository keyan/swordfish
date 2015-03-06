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

  var move = think();
  console.log("Current Player: " + game.turn());
  console.log("Best move: " + move['move']);
  console.log("Best score: " + move['score']);
  console.log("-----------------------");
  game.move(move['move']);
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
        'score': -Infinity,
    };

    var moves = [];

    for (var x = 0; x < possibleMoves.length; x++) {
        var currentGame = new Chess(game.fen());
        var currentMove = possibleMoves[x]
        currentGame.move(currentMove);
        var currentMoveScore = evaluate(currentGame);
        moves.push(currentMove + ' ' + currentMoveScore);
        if (currentMoveScore > bestMove['score']) {
                bestMove['move'] = currentMove;
                bestMove['score'] = currentMoveScore;
        }
    }
    console.log(moves);
    return bestMove;
}

function search () {

}

function negaMax (state, depth) {
    if (depth == 0) {
        return evauluate(state);
    }
    var posssibleMoves = state.moves();
    var bestMove = {
        'move': null,
        'score': -Infinity,
    };
    for (var x = 0; x < possibleMoves; x++) {
        var currentGame = new Chess(state.fen())
        currentGame.move(possibleMoves[x]);
        var move = -negaMax(currentGame, depth-1);
        if (move['score'] > bestMove['score']) {
            bestMove['move'] = move['move'];
            bestMove['score'] = move['score'];
        }
    }
    return bestMove;
}

function flipPlayer(player) {
    if (player === 'w') {
        return 'b'
    } else if (player === 'b') {
        return 'w'
    }
}

function evaluate(oppositeGame) {
    oppositeFen = oppositeGame.fen();
    var oppositeCharIndex = oppositeFen.indexOf(' ') + 1;
    var oppositePlayer = oppositeFen[oppositeCharIndex];
    var currentPlayer = flipPlayer(oppositePlayer);

    var currentFen = stringReplaceAt(oppositeFen, oppositeCharIndex, currentPlayer);
    
    var currentGame = new Chess(currentFen);

    
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

    for (var x = 0; x < currentFen.length; x++) {
        currentChar = currentFen.charAt(x);
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

    if (currentPlayer === 'w') {
        whiteMobility = currentGame.moves().length;
        blackMobility = oppositeGame.moves().length;
    } else {
        whiteMobility = oppositeGame.moves().length;
        blackMobility = currentGame.moves().length;
    }
    var mobilityScore = mobilityWt * (whiteMobility - blackMobility);
    return (materialScore + mobilityScore) * (currentPlayer === 'w' ? 1:-1);
}
