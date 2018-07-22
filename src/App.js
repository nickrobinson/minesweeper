import React, { Component } from 'react'
import 'antd/dist/antd.css'
import './App.css'
import Board from './views/game/Board'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

class App extends Component {
  render () {
    return (
      <Layout className='layout'>
        <Header>
          <h1 className='logo'>Minesweeper Redux</h1>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
      />
        </Header>
        <Content style={{ display: 'flex', justifyContent: 'center' }}>
          <Board />
        </Content>
        <Footer />
      </Layout>

    )
  }
}

export default App
