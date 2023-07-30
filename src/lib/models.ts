import range from 'lodash/range'
import { BOARD_HEIGHT } from '~/constants'

export enum SlotState {
  empty,
  playerOne,
  playerTwo,
}

export enum Token {
  playerOne = 'player-one',
  playerTwo = 'player-two',
}

export const stateToToken = (state: SlotState): Token | null => {
  switch (state) {
    case SlotState.playerOne:
      return Token.playerOne
    case SlotState.playerTwo:
      return Token.playerTwo
  }

  return null
}

export type BoardState = SlotState[]

export type Coords = [x: number, y: number]

export const indexToCoords = (index: number): Coords => [
  index / BOARD_HEIGHT,
  BOARD_HEIGHT - (index % BOARD_HEIGHT) - 1,
]

export const coordsToIndex = ([x, y]: Coords): number =>
  x * BOARD_HEIGHT + BOARD_HEIGHT - y - 1

export const firstEmptySlotForColumn = (board: BoardState, colIndex: number) => {
  const end = colIndex * BOARD_HEIGHT
  const start = end + BOARD_HEIGHT - 1

  return range(start, end).find(index => board[index] === SlotState.empty)
}