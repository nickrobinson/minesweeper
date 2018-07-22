import React from 'react'
import { Alert, Button, Row, Col } from 'antd'

const GameLostAlert = (props) => {
  return (
    <div>
      <Row>
        <Col><Alert type='error' hidden message='Game over. Better luck next time.' /></Col>
      </Row>
      <br />
      <Row>
        <Col span={8} />
        <Col span={8}><Button onClick={props.onCreateNewGame} type='primary'>New Game</Button></Col>
      </Row>
    </div>
  )
}

export default GameLostAlert
