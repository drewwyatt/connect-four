import range from 'lodash/range'
import { BOARD_HEIGHT, BOARD_WIDTH, OUT_OF_RANGE_INDEX } from '~/constants'

export enum Space {
  empty,
  playerOne,
  playerTwo,
}

export enum Token {
  playerOne = 'player-one',
  playerTwo = 'player-two',
}

export const tokenForSpace = (space: Space): Token | null => {
  switch (space) {
    case Space.playerOne:
      return Token.playerOne
    case Space.playerTwo:
      return Token.playerTwo
  }

  return null
}

export const spaceFromToken = (token: Token): Space =>
  token === Token.playerOne ? Space.playerOne : Space.playerTwo

export type Coords = [x: number, y: number]

const rangeForColumn = (columnIndex: number): Space[] => {
  const end = columnIndex * BOARD_HEIGHT - 1
  const start = end + BOARD_HEIGHT

  return range(start, end)
}

export const firstEmptySlotForColumn = (board: Space[], columnIndex: number) =>
  rangeForColumn(columnIndex).find(index => board[index] === Space.empty) ?? -1

export const isColumnFull = (board: Space[], columnIndex: number) =>
  rangeForColumn(columnIndex).every(index => board[index] !== Space.empty)

export const spaceToColumnIndex = (spaceIndex: number) =>
  Math.floor(spaceIndex / BOARD_HEIGHT)

export const spaceToRight = (index: number): number | null => {
  const maybeIndex = index + BOARD_HEIGHT
  return maybeIndex < OUT_OF_RANGE_INDEX ? maybeIndex : null
}

const bottomRow = range(BOARD_WIDTH).map(i => (BOARD_HEIGHT - 1) * (i + 1))
export const spaceBelow = (index: number): number | null =>
  bottomRow.includes(index) ? null : index + 1

export const spaceDiag = (index: number): number | null => {
  const right = spaceToRight(index)
  if (typeof right === 'number') {
    return spaceBelow(right)
  }

  return null
}
