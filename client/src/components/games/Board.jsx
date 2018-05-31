
import React, {PureComponent} from 'react'
import './Board.css'


// const renderCel = (makeMove, rowIndex, cellIndex, Symbol, hasTurn) => { 
//   return (
//     <button
//       className="board-tile"
//       disabled={hasTurn}
//       onClick={() => makeMove(rowIndex, cellIndex)}
//       key={`${rowIndex}-${cellIndex}`}
//     >{Symbol || '_'}</button>
//   )
// }

// export default ({board, makeMove}) => board.map((cells, rowIndex) =>
//   <div key={rowIndex}>
//     {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
//   </div>)


class Board extends PureComponent {
    render() {
        return (
            this.props.board.map((tile, rowIndex) => {
                if(tile.flipped === true || tile.matched === true) {
                    return <img key={rowIndex} src={`/images/combi${tile.id}.jpg`} onClick={(event) => this.props.makeMove(this.props.game, rowIndex)} className="board-tile" alt="tile"/>
                } else {
                    return <img key={rowIndex} src="/images/background.gif" onClick={(event) => this.props.makeMove(this.props.game, rowIndex)} className="board-tile" alt="tile"/>
                }
            })
        )
    }
}

export default Board