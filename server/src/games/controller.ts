import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board, emptyBoard } from './entities'
import {IsBoard, isValidTransition, finished} from './logic'
import {updateBoardWithMatches,matchFound, missMatchFound, resetFlippedTiles} from './logic'
import { Validate } from 'class-validator'
import {io} from '../index'

class GameUpdate {

  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
}

const shuffleArray = arr => (
  arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])
)

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create({
      board: shuffleArray(emptyBoard)
    }).save()

    await Player.create({
      game: entity, 
      user,
      symbol: 'x'
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game, 
      user,
      symbol: 'o'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    if (!isValidTransition(game.board, update.board)) {
      throw new BadRequestError(`Invalid move`)
    }

    update.board = updateBoardWithMatches(update.board);

    // const winner = calculateWinner(update.board)
    // if (winner) {
    //   game.winner = winner
    //   game.status = 'finished'
    // }
    if (finished(update.board)) {
      game.status = 'finished'
    }
    else if (matchFound(game.board, update.board)) {
      player.score += 1;
    }
    else if(missMatchFound(update.board)) {
      game.board = update.board

        io.emit('action', {
            type: 'UPDATE_GAME',
            payload: game
        })

      game.turn = player.symbol === 'x' ? 'o' : 'x'
        update.board = resetFlippedTiles(update.board);
    }

    game.board = update.board
    await game.save()
      await player.save()
      
      const delay = player.symbol != game.turn ? 800 : 0

    setTimeout(() => io.emit('action', {
        type: 'UPDATE_GAME',
        payload: game
    }), delay)

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

