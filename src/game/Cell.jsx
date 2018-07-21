import React from 'react'
import './Cell.css'

const Cell = (props) => {
  return (
    <btn className={`cell ${props.checked}`} onClick={() => props.onCellClick({row: props.row, col: props.col})} />
  )
}

export default Cell
