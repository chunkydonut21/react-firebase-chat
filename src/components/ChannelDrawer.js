import React, { Component } from 'react'
import { Col, Modal, Form, Input } from 'antd'
import logo from '../utils/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCommentAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { List } from 'antd'
import { connect } from 'react-redux'
import { addChannel } from '../actions/index'

const joinedChannels = ['# Bicycling', '# Hiking', '# Dancing', '# Singing', '# Horse Riding']
const favChannels = ['# Bicycling', '# Hiking', '# Horse Riding']
const adminChannels = ['# Bicycling', '# Hiking']

const adminHeader = (
    <div className="channel-header">
        <div>
            <FontAwesomeIcon icon={faCommentAlt} /> Admin
        </div>
    </div>
)

const favHeader = (
    <div className="channel-header">
        <div>
            <FontAwesomeIcon icon={faHeart} /> Favourites
        </div>
    </div>
)

class ChannelDrawer extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        channelName: '',
        channelNameError: false
    }

    showModal = () => this.setState({ visible: true })

    handleOk = () => {
        if (!this.state.channelName) {
            return this.setState({ channelNameError: true })
        }
        this.setState({ confirmLoading: true })
        this.props.addChannel(this.state.channelName)
        this.setState({ visible: false, confirmLoading: false, channelName: '', channelNameError: false })
    }

    handleCancel = () => this.setState({ visible: false, channelName: '', channelNameError: false })

    handleChannelName = e => {
        this.setState({ channelName: e.target.value, channelNameError: !e.target.value ? true : false })
    }

    render() {
        const joinedHeader = (
            <div className="channel-header">
                <div>
                    <FontAwesomeIcon icon={faCommentAlt} /> Channels
                </div>
                <span>
                    <FontAwesomeIcon icon={faPlus} onClick={this.showModal} />
                </span>
            </div>
        )
        const { visible, confirmLoading } = this.state

        return (
            <Col md={4} className="channel-drawer">
                <div className="logo-style">
                    <img src={logo} alt="Brand Name" />
                </div>
                <div className="user-section">
                    <img src="http://gravatar.com/avatar/b4d2c5a80a8b74e5939285e1dce7b1b3?d=identicon" alt="Avatar" />
                    <span>John Doe</span>
                </div>
                <div className="list-style">
                    <List
                        size="small"
                        header={joinedHeader}
                        dataSource={joinedChannels}
                        className="list-inner"
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
                <div className="list-style">
                    <List
                        size="small"
                        header={adminHeader}
                        dataSource={adminChannels}
                        className="list-inner"
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
                <div className="list-style">
                    <List
                        size="small"
                        header={favHeader}
                        dataSource={favChannels}
                        className="list-inner"
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
                <div>
                    <Modal
                        title="Add a Channel"
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <Form.Item
                            validateStatus={this.state.channelNameError ? 'error' : ''}
                            help={this.state.channelNameError && 'Channel Name is required'}
                        >
                            <Input
                                placeholder="Username"
                                value={this.state.channelName}
                                onChange={e => this.handleChannelName(e)}
                            />
                        </Form.Item>
                    </Modal>
                </div>
            </Col>
        )
    }
}

export default connect(
    null,
    { addChannel }
)(ChannelDrawer)
