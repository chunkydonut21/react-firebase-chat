import React, { Component } from 'react'
import { Col, Modal, Form, Input, Button } from 'antd'
import logo from '../utils/images/logo-light.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCommentAlt, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { List } from 'antd'
import { connect } from 'react-redux'
import {
  addChannel,
  getAllChannelsAdmin,
  findAllMessagesByChannel,
  getChannelInfo,
  getAllUsers,
  signOutUser
} from '../actions/index'

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
    if (!this.state.channelName) return this.setState({ channelNameError: true })
    this.setState({ confirmLoading: true })
    this.props.addChannel(this.state.channelName)
    this.setState({ visible: false, confirmLoading: false, channelName: '', channelNameError: false })
  }

  handleCancel = () => this.setState({ visible: false, channelName: '', channelNameError: false })

  handleChannelName = (e) => {
    this.setState({ channelName: e.target.value, channelNameError: !e.target.value })
  }

  handleChannelDetails = (item) => {
    this.props.findAllMessagesByChannel(item)
    this.props.getChannelInfo(item)
    this.props.getAllUsers()
  }

  render() {
    const joinedHeader = (
      <div className="channel-header">
        <div>
          <FontAwesomeIcon icon={faCommentAlt} /> Channels
        </div>
        <span>
          <FontAwesomeIcon className="cp" icon={faPlus} onClick={this.showModal} />
        </span>
      </div>
    )

    const { currentProfile } = this.props
    const { visible, confirmLoading } = this.state
    return (
      <Col md={4} className="channel-drawer">
        <div className="logo-style">
          <img src={logo} alt="Brand Name" />
        </div>
        <div className="user-section">
          {currentProfile && <img src={currentProfile?.avatar} alt="Avatar" />}
          <span>
            {currentProfile?.name}{' '}
            <FontAwesomeIcon
              className="cp"
              style={{ marginLeft: 4, fontSize: 18 }}
              icon={faSignOutAlt}
              onClick={() => this.props.signOutUser()}
            />
          </span>
        </div>
        <div className="list-style">
          <List
            size="small"
            header={joinedHeader}
            dataSource={currentProfile?.channels || []}
            className="list-inner"
            renderItem={(item) => (
              <List.Item onClick={() => this.handleChannelDetails(item)}>
                <a href="/#" className="cp list-anchor">
                  # {item.channelName}
                </a>
              </List.Item>
            )}
          />
        </div>
        <div className="list-style">
          <List
            size="small"
            header={adminHeader}
            dataSource={this.props.channelsByAdmin}
            className="list-inner"
            renderItem={(item) => (
              <List.Item onClick={() => this.handleChannelDetails(item)}>
                <a href="/#" className="cp list-anchor">
                  # {item.channelName}
                </a>
              </List.Item>
            )}
          />
        </div>
        <div className="list-style">
          <List
            size="small"
            header={favHeader}
            dataSource={currentProfile?.favorites || []}
            className="list-inner"
            renderItem={(item) => (
              <List.Item onClick={() => this.handleChannelDetails(item)}>
                <a href="/#" className="cp list-anchor">
                  # {item.channelName}
                </a>
              </List.Item>
            )}
          />
        </div>
        <div>
          <p className="text-center text-light p-style">
            Created with <FontAwesomeIcon icon={faHeart} /> by Shivam Maheshwari
          </p>
        </div>

        <div>
          <Modal
            title="Create a Channel"
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
                placeholder="Channel Name"
                value={this.state.channelName}
                onChange={(e) => this.handleChannelName(e)}
              />
            </Form.Item>
          </Modal>
        </div>
      </Col>
    )
  }
}

const mapStateToProps = ({ chat }) => ({
  channelsByAdmin: chat.channelsByAdmin,
  currentProfile: chat.currentProfile
})

export default connect(mapStateToProps, {
  addChannel,
  getAllChannelsAdmin,
  findAllMessagesByChannel,
  getChannelInfo,
  getAllUsers,
  signOutUser
})(ChannelDrawer)
