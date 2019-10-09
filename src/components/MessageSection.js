import React, { Component } from 'react'
import { Col, Card, Input, Row, Button, Avatar } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { addMessage, addChannelToFavorites, removeChannelFromFav, leaveChannel } from '../actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSignOutAlt, faPlus, faShare, faFile } from '@fortawesome/free-solid-svg-icons'

class MessageSection extends Component {
    state = {
        messageText: ''
    }

    handleSubmit = () => {
        if (this.state.messageText) {
            this.props.addMessage(this.props.currentChannel.channelId, this.state.messageText)
            this.setState({ messageText: '' })
        }
    }
    render() {
        return (
            <Col md={15} style={{ background: '#dededed1' }}>
                <Row>
                    <Col style={{ height: '85vh' }}>
                        <Card
                            title={
                                <div className="card-header-custom">
                                    <div>
                                        # {this.props.currentChannel ? this.props.currentChannel.channelName : ''}
                                    </div>
                                    <div>
                                        {this.props.currentProfile &&
                                        this.props.currentProfile.favorites &&
                                        this.props.currentProfile.favorites.find(
                                            channel => channel.channelId === this.props.currentChannel.channelId
                                        ) ? (
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    this.props.removeChannelFromFav(this.props.currentChannel)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    style={{ marginRight: 8 }}
                                                    className="fav"
                                                />
                                            </a>
                                        ) : (
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    this.props.addChannelToFavorites(this.props.currentChannel)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    style={{ marginRight: 8 }}
                                                    className="non-fav"
                                                />
                                            </a>
                                        )}

                                        {this.props.currentChannelInfo &&
                                        this.props.currentChannelInfo.admin !== this.props.currentUser.uid ? (
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    this.props.leaveChannel(
                                                        this.props.currentChannelInfo,
                                                        this.props.currentProfile
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                            </a>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            }
                            bordered={false}
                            style={{ width: '100%', height: '100%', overflowY: 'scroll' }}
                        >
                            {this.props.messageList &&
                                this.props.messageList.map(message => (
                                    <div className="d-flex align-items-center message">
                                        <Avatar src={message.user.avatar} size="large" />
                                        <div className="message-section">
                                            <div className="message-sender">
                                                {message.user.name} <span>{moment(message.createdAt).fromNow()}</span>
                                            </div>
                                            <div className="message-text">{message.text}</div>
                                        </div>
                                    </div>
                                ))}
                        </Card>
                    </Col>
                    <Col style={{ height: '15vh' }} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" size="large" className="input-button">
                            <FontAwesomeIcon icon={faPlus} style={{ fontSize: 28 }} />
                        </Button>
                        <Input
                            className="input-box"
                            style={{ borderRadius: 0 }}
                            value={this.state.messageText}
                            onChange={e => this.setState({ messageText: e.target.value })}
                        />
                        <Button size="large" type="danger" className="input-button">
                            <FontAwesomeIcon icon={faFile} style={{ fontSize: 28 }} />
                        </Button>
                        <Button
                            type="success"
                            size="large"
                            className="input-button-send"
                            onClick={() => this.handleSubmit()}
                        >
                            <FontAwesomeIcon icon={faShare} style={{ fontSize: 28 }} />
                        </Button>
                    </Col>
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

export default connect(
    mapStateToProps,
    { addMessage, addChannelToFavorites, removeChannelFromFav, leaveChannel }
)(MessageSection)
