



const changeMatch = (x) => {
    const matchIndex = game.board.findIndex(match => match.id === x)
        game.board[matchIndex].matched = true;
};

const changeFlipped = (x) => {
    const flipIndex = game.board.findIndex(flipped => flipped.id === x)
    game.board[flipIndex].flipped = false;
}

export const checkMatches = () => {
    const {game, player, UpdateGame, UpdatePlayer} = this.props

    if (flippedArray[0].id === flippedArray[1].id) {
        // change picture of matched tiles, and matched to true
        const currentplayer = player.findIndex(player => player.symbol === game.turn)
        player[currentplayer].score ++

            changeMatch(flippedArray[0].id)
            changeMatch(flippedArray[1].id)

        return game.board, player.score


    } else {
        //- flipped tiles back
            changeFlipped(flippedArray[0].id)
            changeFlipped(flippedArray[1].id)
        //- change back to background??
        return  game.turn, game.board
    }
    
  }



 // add to makeMove - UpdateGame(game.id, board), UpdatePlayer(player.score)