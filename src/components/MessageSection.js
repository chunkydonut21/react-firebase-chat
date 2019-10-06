import React, { Component } from 'react'
import { Col, Card, Input, Row, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSignOutAlt, faPlus, faShare, faFile } from '@fortawesome/free-solid-svg-icons'

class MessageSection extends Component {
    render() {
        return (
            <Col md={14} style={{ background: '#dededed1' }}>
                <Row>
                    <Col style={{ height: '80vh' }}>
                        <Card
                            title={
                                <div className="card-header-custom">
                                    <div># Bicycling</div>
                                    <div>
                                        <FontAwesomeIcon icon={faHeart} style={{ marginRight: 8 }} />
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                    </div>
                                </div>
                            }
                            bordered={false}
                            style={{ width: '100%', height: '100%', overflowY: 'scroll' }}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col style={{ height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button type="primary" size="large" className="input-button">
                            <FontAwesomeIcon icon={faPlus} style={{ fontSize: 28 }} />
                        </Button>
                        <Input className="input-box" style={{ borderRadius: 0 }} />
                        <Button size="large" type="danger" className="input-button">
                            <FontAwesomeIcon icon={faFile} style={{ fontSize: 28 }} />
                        </Button>
                        <Button type="success" size="large" className="input-button-send">
                            <FontAwesomeIcon icon={faShare} style={{ fontSize: 28 }} />
                        </Button>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default MessageSection
