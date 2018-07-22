import React, { Component } from 'react'
import './Board.css'

import Cell from './Cell'
import Scoreboard from './Scoreboard'
import GameWinAlert from './GameWinAlert'
import GameLostAlert from './GameLostAlert'
import CheatButton from './CheatButton'

import {
  generateMineCells,
  generateInitialBoardState,
  getCellState,
  CELL_STATES,
  DEFAULT_COL_COUNT,
  DEFAULT_ROW_COUNT} from '../../lib/GameHelper'

const _ = require('lodash')

class Board extends Component {
  initBoard () {
    const minePositions = generateMineCells()
    const boardState = generateInitialBoardState()
    if (this.state) {
      this.setState({remainingMines: minePositions.length, dead: false, rows: DEFAULT_COL_COUNT, cols: DEFAULT_ROW_COUNT, boardState, minePositions})
    } else {
      this.state = {remainingMines: minePositions.length, dead: false, rows: DEFAULT_COL_COUNT, cols: DEFAULT_ROW_COUNT, boardState, minePositions}
    }
  }

  constructor (props) {
    super(props)
    this.initBoard()

    this.onCellClick = this.onCellClick.bind(this)
    this.onCheat = this.onCheat.bind(this)
    this.getAdjacentMineCount = this.getAdjacentMineCount.bind(this)
    this.calcNewBoardState = this.calcNewBoardState.bind(this)
    this.placeFlag = this.placeFlag.bind(this)
    this.initBoard = this.initBoard.bind(this)
    this.cellContainsMine = this.cellContainsMine.bind(this)
  }

  cellContainsMine (row, col) {
    console.log(row, col)
    console.log(_.findIndex(this.state.minePositions, (x) => { return x[0] === row && x[1] === col }))
    return (_.findIndex(this.state.minePositions, (x) => { return x[0] === row && x[1] === col }) > -1)
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

    if (!this.cellContainsMine(event.row, event.col)) {
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

  onCheat () {
    const boardState = this.state.boardState
    for (let i = 0; i < this.state.minePositions.length; i++) {
      const cell = this.state.minePositions[i]
      if (this.state.boardState[cell[0]][cell[1]] === CELL_STATES.DEFAULT) {
        boardState[cell[0]][cell[1]] = CELL_STATES.FLAG
        this.setState({boardState, remainingMines: (this.state.remainingMines - 1)})
        break
      }
    }
  }

  onCellClick (event) {
    const boardState = this.calcNewBoardState(event.row, event.col)

    if (this.cellContainsMine(event.row, event.col)) {
      boardState[event.row][event.col] = CELL_STATES.DEAD
      this.setState({dead: true})
    }

    this.setState({
      boardState
    })
  }

  getAdjacentMineCount (row, col) {
    let adjacentMineCount = 0

    if (this.cellContainsMine(row + 1, col)) {
      adjacentMineCount += 1
    }
    if (this.cellContainsMine(row + 1, col + 1)) {
      adjacentMineCount += 1
    }
    if (this.cellContainsMine(row + 1, col - 1)) {
      adjacentMineCount += 1
    }

    if (this.cellContainsMine(row - 1, col)) {
      adjacentMineCount += 1
    }
    if (this.cellContainsMine(row - 1, col + 1)) {
      adjacentMineCount += 1
    }
    if (this.cellContainsMine(row - 1, col - 1)) {
      adjacentMineCount += 1
    }

    if (this.cellContainsMine(row, col - 1)) {
      adjacentMineCount += 1
    }
    if (this.cellContainsMine(row, col + 1)) {
      adjacentMineCount += 1
    }

    return adjacentMineCount
  }

  render () {
    return (
      <div>
        <div>
          {this.state.remainingMines === 0 ? <GameWinAlert onCreateNewGame={this.initBoard} /> : null}
          {this.state.dead ? <GameLostAlert onCreateNewGame={this.initBoard} /> : null}
          <br />
        </div>
        {this.state.dead ? null : <CheatButton onClick={this.onCheat} />}
        <div>
          <Scoreboard mineCount={this.state.remainingMines} />
          <div className='board' style={{ justifyContent: 'center', width: `200px`}}>
            {Array(this.state.cols).fill()
          .map((_, i) => Array(this.state.rows).fill().map((_, j) => <Cell disabled={this.state.dead} onContextMenu={this.placeFlag} onCellClick={this.onCellClick} cellState={this.state.boardState[i][j]} col={j} row={i} />))}
          </div>
        </div>
      </div>

    )
  }
}

export default Board
