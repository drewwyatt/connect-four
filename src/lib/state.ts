'use client'
import fill from 'lodash/fill'
import range from 'lodash/range'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

import { BOARD_HEIGHT, BOARD_WIDTH } from '~/constants'
import {
  Space,
  Token,
  firstEmptySlotForColumn,
  isColumnFull,
  spaceFromToken,
  spaceToColumnIndex,
  tokenForSpace,
  getWinners,
} from '~/lib/models'

type GameState = {
  spaces: Space[]
  turn: Token
  drop(columnIndex: number): void
  reset(): void
}

const INITIAL_STATE: Pick<GameState, 'spaces' | 'turn'> = {
  spaces: fill(range(BOARD_WIDTH * BOARD_HEIGHT), Space.empty),
  turn: Token.playerOne,
}

const useGameStore = create(
  immer<GameState>(set => ({
    ...INITIAL_STATE,
    drop: (columnIndex: number) =>
      set(state => {
        const slotIndex = firstEmptySlotForColumn(state.spaces, columnIndex)
        const token = state.turn
        if (slotIndex > -1) {
          state.spaces[slotIndex] = spaceFromToken(token)
          state.turn = state.turn === Token.playerOne ? Token.playerTwo : Token.playerOne
        }
      }),
    reset: () =>
      set(state => {
        state.spaces = INITIAL_STATE.spaces
      }),
  })),
)

export const useTokenForSpace = (
  index: number,
): [token: Token | null, isColumnFull: boolean] =>
  useGameStore(
    store => [
      tokenForSpace(store.spaces[index]),
      isColumnFull(store.spaces, spaceToColumnIndex(index)),
    ],
    shallow,
  )

export const useDrop = (spaceIndex: number) =>
  useGameStore(
    store => () => store.drop(spaceToColumnIndex(spaceIndex)),
    () => true,
  )

export const useCurrentTurn = () => useGameStore(store => store.turn)

export const useGameOver = (): [isGameOver: boolean, winner: Token | null] =>
  useGameStore(store => {
    const [winner] = getWinners(store.spaces)
    return [!!winner || store.spaces.every(s => s !== Space.empty), winner]
  })

export const useReset = () => useGameStore(store => store.reset)

export const useWinningSpaces = () =>
  useGameStore(
    store => getWinners(store.spaces),
    ([a], [b]) => a === b,
  )
