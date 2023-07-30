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
} from '~/lib/models'

type GameState = {
  spaces: Space[]
  turn: Token
  drop(columnIndex: number, token: Token): void
}

const useGameStore = create(
  immer<GameState>(set => ({
    spaces: fill(range(BOARD_WIDTH * BOARD_HEIGHT), Space.empty),
    turn: Token.playerOne,
    drop: (columnIndex: number, token: Token) =>
      set(state => {
        const slotIndex = firstEmptySlotForColumn(state.spaces, columnIndex)
        if (slotIndex > -1) {
          state.spaces[slotIndex] = spaceFromToken(token)
        }
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
    store => (token: Token) => store.drop(spaceToColumnIndex(spaceIndex), token),
    () => true,
  )

export const useCurrentTurn = () => useGameStore(store => store.turn)
