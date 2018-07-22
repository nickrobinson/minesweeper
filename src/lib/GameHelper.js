import { Object } from 'core-js'

const _ = require('lodash')

export const DEFAULT_ROW_COUNT = 8
export const DEFAULT_COL_COUNT = 8

export const CELL_STATES = Object.freeze({
  ZERO_MINES: 'checked mines-0',
  ONE_MINE: 'checked mines-1',
  TWO_MINES: 'checked mines-2',
  THREE_MINES: 'checked mines-3',
  FOUR_MINES: 'checked mines-4',
  FIVE_MINES: 'checked mines-5',
  SIX_MINES: 'checked mines-6',
  SEVEN_MINES: 'checked mines-7',
  EIGHT_MINES: 'checked mines-8',
  DEAD: 'mine',
  FLAG: 'flag',
  DEFAULT: ''
})

export const generateMineCells = (mineCount = 10, rows = DEFAULT_ROW_COUNT, cols = DEFAULT_COL_COUNT) => {
  let minePositions = []
  while (minePositions.length < mineCount) {
    let col = Math.floor(Math.random() * (rows))
    let row = Math.floor(Math.random() * (cols))

    if (_.findIndex(minePositions, (x) => { return x[0] === row && x[1] === col }) === -1) {
      minePositions = minePositions.concat([[row, col]])
    }
  }

  return minePositions
}

export const getCellState = (mineCount) => {
  return CELL_STATES[Object.keys(CELL_STATES)[mineCount]]
}

export const generateInitialBoardState = (rows = DEFAULT_ROW_COUNT, cols = DEFAULT_COL_COUNT) => {
  return Array(rows).fill().map(() => Array(cols).fill().map(() => CELL_STATES.DEFAULT))
}
