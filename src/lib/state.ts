'use client'
import fill from 'lodash/fill'
import range from 'lodash/range'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

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
  drop(columnIndex: number, token: Token): void
}

const useGameStore = create(
  immer<GameState>(set => ({
    spaces: fill(range(BOARD_WIDTH * BOARD_HEIGHT), Space.empty),
    drop: (columnIndex: number, token: Token) =>
      set(state => {
        const slotIndex = firstEmptySlotForColumn(state.spaces, columnIndex)
        if (slotIndex > -1) {
          state.spaces[slotIndex] = spaceFromToken(token)
        }
      }),
  })),
)

export const useTokens = () => useGameStore(store => store.spaces.map(tokenForSpace))

export const useDrop = (spaceIndex: number) =>
  useGameStore(
    store => (token: Token) => store.drop(spaceToColumnIndex(spaceIndex), token),
  )

export const useIsColumnFull = (spaceIndex: number) =>
  useGameStore(store => isColumnFull(store.spaces, spaceToColumnIndex(spaceIndex)))
