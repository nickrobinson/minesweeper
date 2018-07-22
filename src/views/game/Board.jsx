import React, { Component } from 'react'
import './Board.css'

import Cell from './Cell'
import { Object } from 'core-js'

const CELL_STATES = Object.freeze({
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

const chooseIfMineCell = (p = 0.80) => {
  const val = Math.pow(Math.random(), 2)
  return val >= p
}

const getCellState = (mineCount) => {
  return CELL_STATES[Object.keys(CELL_STATES)[mineCount]]
}

class Board extends Component {
  constructor (props) {
    super(props)
    const minePositions = Array(20).fill().map(() => Array(10).fill().map((_) => { return chooseIfMineCell() }))
    const boardState = Array(20).fill().map(() => Array(10).fill().map(() => CELL_STATES.DEFAULT))
    this.state = {dead: false, rows: 10, cols: 20, boardState, minePositions}

    this.onCellClick = this.onCellClick.bind(this)
    this.getAdjacentMineCount = this.getAdjacentMineCount.bind(this)
    this.calcNewBoardState = this.calcNewBoardState.bind(this)
    this.placeFlag = this.placeFlag.bind(this)
  }

  calcNewBoardState (row, col) {
    let tempBoardState = this.state.boardState
    const updateBoard = (nextRow, nextCol) => {
      console.log(nextRow, nextCol)
      const mineCount = this.getAdjacentMineCount(nextRow, nextCol)
      if (mineCount === 0 && tempBoardState[nextRow][nextCol] === CELL_STATES.DEFAULT) {
        tempBoardState[nextRow][nextCol] = CELL_STATES.ZERO_MINES
        for (let i = -1; i <= 1; ++i) {
          for (let j = -1; j <= 1; ++j) {
            if (i !== 0 || j !== 0) {
              if (tempBoardState[nextRow + i]) {
                updateBoard(nextRow + i, nextCol + j)
              }
            }
          }
        }
      } else {
        tempBoardState[nextRow][nextCol] = getCellState(mineCount)
      }
    }
    updateBoard(row, col)
    return tempBoardState
  }

  placeFlag (event) {
    event.e.preventDefault()
    const boardState = this.calcNewBoardState(event.row, event.col)
    boardState[event.row][event.col] = CELL_STATES.FLAG
    this.setState({boardState})
    return false
  }

  onCellClick (event) {
    const boardState = this.calcNewBoardState(event.row, event.col)

    if (this.state.minePositions[event.row][event.col]) {
      boardState[event.row][event.col] = CELL_STATES.DEAD
      this.setState({dead: true})
    }

    this.setState({
      boardState
    })
  }

  getAdjacentMineCount (row, col) {
    let adjacentMineCount = 0

    if (this.state.minePositions[row + 1]) {
      if (this.state.minePositions[row + 1][col]) {
        adjacentMineCount += 1
      }
      if (this.state.minePositions[row + 1][col + 1]) {
        adjacentMineCount += 1
      }
      if (this.state.minePositions[row + 1][col - 1]) {
        adjacentMineCount += 1
      }
    }

    if (this.state.minePositions[row - 1]) {
      if (this.state.minePositions[row - 1][col]) {
        adjacentMineCount += 1
      }
      if (this.state.minePositions[row - 1][col + 1]) {
        adjacentMineCount += 1
      }
      if (this.state.minePositions[row - 1][col - 1]) {
        adjacentMineCount += 1
      }
    }

    if (this.state.minePositions[row][col - 1]) {
      adjacentMineCount += 1
    }
    if (this.state.minePositions[row][col + 1]) {
      adjacentMineCount += 1
    }

    return adjacentMineCount
  }

  render () {
    return (
      <div className='board' style={{width: `240px`}}>
        {Array(this.state.cols).fill()
          .map((_, i) => Array(this.state.rows).fill().map((_, j) => <Cell onContextMenu={this.placeFlag} onCellClick={this.onCellClick} cellState={this.state.boardState[i][j]} col={j} row={i} />))}
      </div>
    )
  }
}

export default Board
