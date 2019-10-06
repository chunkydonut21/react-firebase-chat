import React, { Component } from 'react'
import { Row, Layout, Col } from 'antd'
import RegisterationForm from '../components/RegisterationForm'

const { Content } = Layout
export class Register extends Component {
    render() {
        return (
            <Content style={{ background: '#a05f96' }}>
                <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                        <RegisterationForm />
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default Register
