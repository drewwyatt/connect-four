import { dir } from 'console'
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

export const getWinners = (
  board: Space[],
): [Space.playerOne | Space.playerTwo, number[]] | [null, []] => {
  const checks = {
    right: new Set<number>(),
    down: new Set<number>(),
    diag: new Set<number>(),
  }

  for (const [index, space] of board.entries()) {
    if (space === Space.empty) continue

    const winners = getConnections(checks, index, space, board).find(Array.isArray)
    if (winners) {
      return [board[winners[0]] as Space.playerOne | Space.playerTwo, winners]
    }
  }

  return [null, []]
}

type Checks = { right: Set<number>; down: Set<number>; diag: Set<number> }
const getConnections = (
  checks: Checks,
  index: number,
  space: Space.playerOne | Space.playerTwo,
  board: Space[],
) => [
  getConnectionsForDirection('right', checks, [index], space, board),
  getConnectionsForDirection('diag', checks, [index], space, board),
  getConnectionsForDirection('down', checks, [index], space, board),
]

const getConnectionsForDirection = (
  direction: keyof Checks,
  checks: Checks,
  chain: number[],
  space: Space.playerOne | Space.playerTwo,
  board: Space[],
): number[] | null => {
  const [lastIndex] = chain.slice(-1)
  if (checks[direction].has(lastIndex)) {
    return null
  }

  checks[direction].add(lastIndex)
  const next = getDirection(direction, lastIndex)
  if (typeof next === 'number' && board[next] === space) {
    const connections = [...chain, next]
    if (connections.length === 4) {
      return connections
    }

    return getConnectionsForDirection(direction, checks, connections, space, board)
  }

  return null
}

const getDirection = (direction: keyof Checks, index: number) => {
  switch (direction) {
    case 'diag':
      return spaceDiag(index)
    case 'down':
      return spaceBelow(index)
    case 'right':
      return spaceToRight(index)
  }
}

const spaceToRight = (index: number): number | null => {
  const maybeIndex = index + BOARD_HEIGHT
  return maybeIndex < OUT_OF_RANGE_INDEX ? maybeIndex : null
}

const bottomRow = range(BOARD_WIDTH).map(i => (BOARD_HEIGHT - 1) * (i + 1))
const spaceBelow = (index: number): number | null =>
  bottomRow.includes(index) ? null : index + 1

const spaceDiag = (index: number): number | null => {
  const right = spaceToRight(index)
  if (typeof right === 'number') {
    return spaceBelow(right)
  }

  return null
}
