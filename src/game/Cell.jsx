import React from 'react'
import './Cell.css'

const Cell = (props) => {
  return (
    <input type='checkbox' className={`cell ${props.cellState}`} onClick={() => props.onCellClick({row: props.row, col: props.col})} />
  )
}

export default Cell
