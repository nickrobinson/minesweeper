import React from 'react'
import { Alert } from 'antd'

const GameLostAlert = () => {
  return (
    <Alert type='error' hidden message='Game over. Better luck next time.' />
  )
}

export default GameLostAlert
