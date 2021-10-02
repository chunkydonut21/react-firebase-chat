import React, { Component } from 'react'
import { Col, Card, Input, Row, Button, Avatar } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { addMessage, addChannelToFavorites, removeChannelFromFav, leaveChannel, uploadImage } from '../actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSignOutAlt, faPlus, faShare, faFile } from '@fortawesome/free-solid-svg-icons'
import { Picker } from 'emoji-mart'

class MessageSection extends Component {
  state = {
    messageText: '',
    togglePicker: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.messageText) {
      this.props.addMessage(this.props.currentChannel.channelId, this.state.messageText)
      this.setState({ messageText: '' })
    }
  }

  handleFileUpload = (e) => {
    this.props.uploadImage(this.props.currentChannel.channelId, e.target.files[0])
  }
  render() {
    const { currentChannel, currentChannelInfo, currentUser, currentProfile } = this.props
    return (
      <Col md={15} style={{ background: '#dededed1' }}>
        <Row>
          <Col style={{ height: '85vh' }}>
            <Card
              title={
                <div className="card-header-custom">
                  <div># {currentChannel ? currentChannel.channelName : ''}</div>
                  <div>
                    {currentProfile?.favorites?.find((channel) => channel.channelId === currentChannel.channelId) ? (
                      <div
                        className="cp"
                        onClick={() =>
                          this.props.removeChannelFromFav({
                            channelId: currentChannel.channelId,
                            channelName: currentChannel.channelName
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faHeart} style={{ marginRight: 8 }} className="fav" />
                      </div>
                    ) : (
                      <div
                        className="cp"
                        onClick={() =>
                          this.props.addChannelToFavorites({
                            channelId: currentChannel.channelId,
                            channelName: currentChannel.channelName
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faHeart} style={{ marginRight: 8 }} className="non-fav" />
                      </div>
                    )}

                    {currentChannelInfo?.admin !== currentUser?.uid ? (
                      <div className="cp" onClick={() => this.props.leaveChannel(currentChannelInfo, currentProfile)}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              }
              bordered={false}
              style={{ width: '100%', height: '100%', overflowY: 'scroll' }}
            >
              {this.props.messageList?.map((message) => (
                <div className="d-flex align-items-center message">
                  <div>
                    <Avatar src={message.user.avatar} size="large" />
                  </div>
                  <div className="message-section" style={{ marginLeft: 16 }}>
                    <div className="message-sender">
                      {message.user.name} <span>{moment(message.createdAt).fromNow()}</span>
                    </div>
                    {message.text && <div className="message-text">{message.text}</div>}
                    {message.image && (
                      <div>
                        <img src={message.image} alt="Message" style={{ width: '50%' }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </Col>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <Col style={{ height: '15vh' }} className="d-flex justify-content-center align-items-center">
              <Button
                type="primary"
                size="large"
                className="input-button"
                onClick={() => this.setState({ togglePicker: !this.state.togglePicker })}
              >
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 28 }} />
              </Button>
              {this.state.togglePicker && (
                <div>
                  <Picker
                    onSelect={(e) => {
                      this.setState((prevState) => ({
                        messageText: `${prevState.messageText}${e.native}`,
                        togglePicker: !this.state.togglePicker
                      }))
                    }}
                    style={{ position: 'absolute', bottom: '30px', left: '20px', zIndex: 1 }}
                  />
                </div>
              )}

              <Input
                className="input-box"
                style={{ borderRadius: 0 }}
                value={this.state.messageText}
                onChange={(e) => this.setState({ messageText: e.target.value })}
              />

              <div class="upload-btn-wrapper">
                <Button size="large" type="danger" className="input-button" type="file">
                  <FontAwesomeIcon icon={faFile} style={{ fontSize: 28 }} />
                </Button>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) => this.handleFileUpload(e)}
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </div>

              <button type="submit" size="large" className="input-button-send">
                <FontAwesomeIcon icon={faShare} style={{ fontSize: 28 }} />
              </button>
            </Col>{' '}
          </form>
        </Row>
      </Col>
    )
  }
}

const mapStateToProps = ({ chat, auth }) => ({
  messageList: chat.messageList,
  currentChannel: chat.currentChannel,
  currentChannelInfo: chat.currentChannelInfo,
  currentUser: auth.currentUser,
  currentProfile: chat.currentProfile
})

export default connect(mapStateToProps, {
  addMessage,
  addChannelToFavorites,
  removeChannelFromFav,
  leaveChannel,
  uploadImage
})(MessageSection)
