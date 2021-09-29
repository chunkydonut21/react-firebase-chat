import React, { Component } from 'react'
import { Row, Layout, Col } from 'antd'
import RegisterationForm from '../components/RegisterationForm'

const { Content } = Layout

export class Register extends Component {
  render() {
    return (
      <Content className="background-img">
        <Row type="flex" justify="end">
          <Col style={{ height: '100vh' }}>
            <RegisterationForm />
          </Col>
        </Row>
      </Content>
    )
  }
}

export default Register
