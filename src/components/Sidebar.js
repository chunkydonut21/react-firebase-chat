import React, { Component } from 'react'
import { Col, Button } from 'antd'

class Sidebar extends Component {
    render() {
        return (
            <Col md={1} style={{ background: '#000000', height: '100vh' }}>
                <Button type="primary" icon="plus" size="large" className="add-button" />
            </Col>
        )
    }
}

export default Sidebar
