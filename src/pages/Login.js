import React, { Component } from 'react'
import { Row, Layout, Col } from 'antd'
import LoginForm from '../components/LoginForm'

const { Content } = Layout

export class Login extends Component {
  render() {
    return (
      <Content className="background-img">
        <Row type="flex" justify="end">
          <Col style={{ height: '100vh' }}>
            <LoginForm />
          </Col>
        </Row>
      </Content>
    )
  }
}

export default Login
