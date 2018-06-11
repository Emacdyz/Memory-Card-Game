import 'mocha'
import { equal } from 'assert'
import { calculateWinner, isValidTransition, finished } from './logic'
import { Board, Player } from './entities'

// describe('calculateWinner()', () => {

//   it('should return x if score of player 1 is higher than the score of player 2', () => {
//     const player: Symbol  = 'x' > 'o'

//     equal(calculateWinner(player), 'x')
//   })

//   it('should return o if score of player 2 is higher than the score of player 1', () => {
    
//     equal(calculateWinner(player), 'o')
//   })

//   it('should return null if there is no winner', () => {
    


//     equal(calculateWinner(player), null)
//   })
// })

describe('finished()', () => {

  it('should finish when all tiles are flipped and matched', () => {
    const board: Board = [
      {id:1, flipped: true, matched: true}, 
      {id:2, flipped: true, matched: true}, 
      {id:3, flipped: true, matched: true},
      {id:1, flipped: true, matched: true}, 
      {id:2, flipped: true, matched: true}, 
      {id:3, flipped: true, matched: true}
      ]

    equal(finished(board), true)
  })

  it('should not finish when there are tiles left that aren\'t matched', () => {
    const board: Board = [
      {id:1, flipped: true, matched: true}, 
      {id:2, flipped: false, matched: false}, 
      {id:3, flipped: true, matched: true},
      {id:4, flipped: false, matched: false},
      {id:1, flipped: true, matched: true}, 
      {id:2, flipped: true, matched: false}, 
      {id:3, flipped: true, matched: true},
      {id:4, flipped: true, matched: false}
    ]
    equal(finished(board), false)
  })
})
