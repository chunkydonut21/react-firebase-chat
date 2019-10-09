import React, { Component } from 'react'
import { Col, Button } from 'antd'
import { connect } from 'react-redux'
import { signOutUser } from '../actions/index'

class Sidebar extends Component {
    render() {
        return (
            <Col md={1} style={{ background: '#000000', height: '100vh' }}>
                <Button type="primary" icon="plus" size="large" className="add-button" />
                <Button
                    type="primary"
                    icon="logout"
                    size="large"
                    className="add-button bottom"
                    onClick={() => this.props.signOutUser()}
                ></Button>
                />
            </Col>
        )
    }
}

export default connect(
    null,
    { signOutUser }
)(Sidebar)
