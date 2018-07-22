import React from 'react'
import { Alert } from 'antd'

const GameWinAlert = () => {
  return (
    <Alert type='success' hidden closable message='Congratulations. You Won!!!' />
  )
}

export default GameWinAlert
