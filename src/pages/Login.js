import React, { Component } from 'react'
import { Row, Layout, Col } from 'antd'
import LoginForm from '../components/LoginForm'

const { Content } = Layout

export class Login extends Component {
    render() {
        return (
            <Content style={{ background: '#a05f96' }}>
                <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                        <LoginForm />
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default Login
