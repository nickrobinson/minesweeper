import React, { Component } from 'react'
import './Board.css'

import Cell from './Cell'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {rows: 10, cols: 30}
    this.state.boardState = Array(this.state.cols).fill(Array(this.state.rows).fill()
                              .map((_, i) => i * i))
    this.state.boardState = Array(this.state.cols).fill(Array(this.state.rows).fill(''))
  }

  onCellClick (event) {
    console.log('Click')
    console.log(event)
  }

  render () {
    return (
      <div className='board' style={{width: `480px`}}>
        {Array(this.state.cols).fill()
          .map((_, i) => Array(this.state.rows).fill().map((_, j) => <Cell onCellClick={this.onCellClick} col={i} row={j} />))}
      </div>
    )
  }
}

export default Board
