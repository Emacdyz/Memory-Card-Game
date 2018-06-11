import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
      return board.every(row => typeof row.flipped !== 'undefined' && typeof row.matched !== 'undefined')
  }
}

export const isValidTransition = (from: Board, to: Board) => {
    const oldChangedTiles = from.filter(row => row.flipped)
    const newChangeTiles = to.filter(row => row.flipped)
    const flippedTiles = newChangeTiles.length - oldChangedTiles.length;

    if(flippedTiles !== 1) return false
    else return true

}

// export const calculateWinner = (board: Board): Symbol | null => {
//     return null;
//     const player1 = player.symbol['x']
//     const player2 = player.symbol['o']

//         if (player[player1].score > player[player2].score) return player1 === game.winner
//         else if (player[player1].score < player[player2].score) return player2
//         else return null // no winner as the scores are even

// }

export const finished = (board: Board): boolean =>
    board.every(row => row.matched)

export const updateBoardWithMatches = (board: Board): Board => {
    const flippedTiles = board.filter(row => row.flipped)

    if(flippedTiles.length < 2) { // Return old board
        return board
    }
    else if(flippedTiles[0].id === flippedTiles[1].id) { // match found
        board.map(row => {
            if(row.id === flippedTiles[0].id) {
                row.flipped = false;
                row.matched = true;
            }

            return row;
        })
    }

    return board;
}

export const matchFound = (oldBoard: Board, newBoard: Board): boolean => {
    return newBoard.filter(row => row.matched).length > oldBoard.filter(row => row.matched).length
}

export const missMatchFound = (board: Board): boolean =>
    board.filter(row => row.flipped).length >= 2

export const resetFlippedTiles = (board: Board): Board =>
    board.map(row => { row.flipped = false; return row} )

