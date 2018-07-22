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
  DEFAULT: ''
})

const chooseIfMineCell = (p = 0.60) => {
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
  }

  onCellClick (event) {
    console.log(event)
    const mineCount = this.getAdjacentMineCount(event.row, event.col)
    const boardState = this.state.boardState

    if (this.state.minePositions[event.row][event.col]) {
      boardState[event.row][event.col] = CELL_STATES.DEAD
      this.setState({dead: true})
    } else {
      boardState[event.row][event.col] = getCellState(mineCount)
    }

    this.setState({
      boardState
    })
  }

  getAdjacentMineCount (row, col) {
    console.log(row, col)
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
          .map((_, i) => Array(this.state.rows).fill().map((_, j) => <Cell onCellClick={this.onCellClick} cellState={this.state.boardState[i][j]} col={j} row={i} />))}
      </div>
    )
  }
}

export default Board
