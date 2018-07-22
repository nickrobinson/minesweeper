import React from 'react'
import { Button } from 'antd'

const CheatButton = (props) => {
  return (
    <div>
      <Button onClick={props.onClick}>Cheat</Button>
    </div>
  )
}

export default CheatButton
