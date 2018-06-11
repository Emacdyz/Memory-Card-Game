import React, {PureComponent} from 'react'
import './Board.css'


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