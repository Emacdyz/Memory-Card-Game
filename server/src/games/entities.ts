import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
// export type Row = [ number, number, number, number]
//export type Board = Number[]
export type Board = Tile[]

export type Tile = {
  id: number
 // url: string
  flipped: boolean
  matched: boolean
}

type Status = 'pending' | 'started' | 'finished'

// const emptyRow: Row = [null, null, null]
const tiles = [1,2,3,4,5,6,7,8].map(index => { 
  return {
          id: index, 
          // url: `.png`, we don't need it it's put in the component.
          flipped: false,
          matched: false
        }
});
export const emptyBoard: Board = tiles.concat(tiles)

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column() 
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('int', {default: 0})
  score: number
}