import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

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

  // const changes = from
  //   .map(
  //     (row, rowIndex) => row.map((symbol, columnIndex) => ({
  //       from: symbol,
  //       to: to[rowIndex][columnIndex]
  //     }))
  //   )
  //   .reduce((a,b) => a.concat(b))
  //   .filter(change => change.from !== change.to)
  //
  // return changes.length === 1 &&
  //   changes[0].to === playerSymbol &&
  //   changes[0].from === null
}

export const calculateWinner = (board: Board): Symbol | null => {
    return null;
    // const matchesPlayerX = board.filter(row => row.matched && row.matchedSymbol === 'x').length;
    // const matchesPlayerO = board.filter(row => row.matched && row.matchedSymbol === 'o').length
    //
    // if (matchesPlayerX > matchesPlayerO) {
    //     return 'x'
    // }
    // else {
    //     return 'o'
    // }
}

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

