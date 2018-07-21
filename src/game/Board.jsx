import React, { Component } from 'react'
import './Board.css'

import Cell from './Cell'

class Board extends Component {
  constructor (props) {
    super(props)
    const boardState = Array(30).fill(Array(10).fill(''))
    this.state = {rows: 10, cols: 30, boardState}

    this.onCellClick = this.onCellClick.bind(this)
  }

  onCellClick (event) {
    console.log('Click')
    console.log(event)
    console.log(this.state)
    const boardState = this.state.boardState
    boardState[event.col][event.row] = 'checked mines-0'
    this.setState({
      boardState
    })
  }

  render () {
    console.log(this.state)
    return (
      <div className='board' style={{width: `480px`}}>
        {Array(this.state.cols).fill()
          .map((_, i) => Array(this.state.rows).fill().map((_, j) => <Cell onCellClick={this.onCellClick} cellState={this.state.boardState[i][j]} col={i} row={j} />))}
      </div>
    )
  }
}

export default Board
