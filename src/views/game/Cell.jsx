import React from 'react'
import './Cell.css'

const isChecked = (state) => {
  return (state !== '')
}

const Cell = (props) => {
  return (
    <input type='checkbox' checked={isChecked(props.cellState)}
      className={`cell ${props.cellState}`}
      onContextMenu={(e) => props.onContextMenu({e: e, row: props.row, col: props.col})}
      onClick={() => props.onCellClick({row: props.row, col: props.col})} />
  )
}

export default Cell
