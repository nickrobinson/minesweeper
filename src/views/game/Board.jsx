import React, { Component } from 'react'
import './Board.css'

import Cell from './Cell'
import Scoreboard from './Scoreboard'
import GameWinAlert from './GameWinAlert'
import GameLostAlert from './GameLostAlert'

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

const generateMinePositions = (rows = 20, cols = 10) => {
  return Array(rows).fill().map(() => Array(cols).fill().map((_) => { return chooseIfMineCell() }))
}

const generateInitialBoardState = (rows = 20, cols = 10) => {
  return Array(rows).fill().map(() => Array(cols).fill().map(() => CELL_STATES.DEFAULT))
}

const getMineCount = (minePositions) => {
  return minePositions.reduce((acc, val) => acc.concat(val), []).filter(v => v).length
}

class Board extends Component {
  initBoard () {
    const minePositions = generateMinePositions()
    const boardState = generateInitialBoardState()
    if (this.state) {
      this.setState({remainingMines: getMineCount(minePositions), dead: false, rows: 10, cols: 20, boardState, minePositions})
    } else {
      this.state = {remainingMines: getMineCount(minePositions), dead: false, rows: 10, cols: 20, boardState, minePositions}
    }
  }

  constructor (props) {
    super(props)
    this.initBoard()

    this.onCellClick = this.onCellClick.bind(this)
    this.getAdjacentMineCount = this.getAdjacentMineCount.bind(this)
    this.calcNewBoardState = this.calcNewBoardState.bind(this)
    this.placeFlag = this.placeFlag.bind(this)
    this.initBoard = this.initBoard.bind(this)
  }

  calcNewBoardState (row, col) {
    let tempBoardState = this.state.boardState
    const updateBoard = (nextRow, nextCol) => {
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

    if (!this.state.minePositions[event.row][event.col]) {
      this.setState({dead: true})
      const boardState = this.calcNewBoardState(event.row, event.col)
      boardState[event.row][event.col] = CELL_STATES.DEAD
      this.setState(boardState)
    } else {
      const boardState = this.calcNewBoardState(event.row, event.col)
      boardState[event.row][event.col] = CELL_STATES.FLAG
      this.setState({boardState, remainingMines: (this.state.remainingMines - 1)})
    }

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
      <div>
        <br />
        {this.state.remainingMines === 0 ? <GameWinAlert /> : null}
        {this.state.dead ? <GameLostAlert onCreateNewGame={this.initBoard} /> : null}
        <br />
        <Scoreboard mineCount={this.state.remainingMines} />
        <div className='board' style={{width: `250px`}}>
          {Array(this.state.cols).fill()
          .map((_, i) => Array(this.state.rows).fill().map((_, j) => <Cell disabled={this.state.dead} onContextMenu={this.placeFlag} onCellClick={this.onCellClick} cellState={this.state.boardState[i][j]} col={j} row={i} />))}
        </div>
      </div>

    )
  }
}

export default Board
