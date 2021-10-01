import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Layout, message } from 'antd'
import { signOutUser, getAllChannelsAdmin, getCurrentUserInfo } from '../actions/index'
import ChannelDrawer from '../components/ChannelDrawer'
import MessageSection from '../components/MessageSection'
import UserList from '../components/UserList'

const { Content } = Layout

class Home extends Component {
    componentDidMount = () => {
        if (this.props.currentUser) {
            const userId = this.props.currentUser.uid
            this.props.getCurrentUserInfo(userId)
            this.props.getAllChannelsAdmin(userId)
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.channelAdded) {
            message.success('Channel has been created.')
        }
        if (this.props.channelFailed) {
            message.error('This is an error while creating a channel.')
        }

        if (prevProps.currentUser !== this.props.currentUser) {
            const userId = this.props.currentUser.uid
            this.props.getCurrentUserInfo(userId)
            this.props.getAllChannelsAdmin(userId)
        }
    }

    render() {
        return (
            <Content>
                <Row>
                    <ChannelDrawer />
                    {this.props.currentChannel && <MessageSection />}
                    {this.props.currentChannel && <UserList />}
                </Row>
            </Content>
        )
    }
}

const mapStateToProps = ({ chat, auth }) => ({
    channelAdded: chat.channelAdded,
    channelFailed: chat.channelFailed,
    currentUser: auth.currentUser,
    currentChannel: chat.currentChannel
})

export default connect(
    mapStateToProps,
    { signOutUser, getAllChannelsAdmin, getCurrentUserInfo }
)(Home)
