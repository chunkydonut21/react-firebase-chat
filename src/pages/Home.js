import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Layout, message } from 'antd'
import { signOutUser } from '../actions/index'
import Sidebar from '../components/Sidebar'
import ChannelDrawer from '../components/ChannelDrawer'
import MessageSection from '../components/MessageSection'
import UserList from '../components/UserList'

const { Content } = Layout

class Home extends Component {
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.channelAdded) {
            message.success('Channel has been created.')
        }
        if (this.props.channelFailed) {
            message.error('This is an error while creating a channel.')
        }
    }

    render() {
        return (
            <Content>
                <Row>
                    {/* <button onClick={() => this.props.signOutUser()}>Logout</button> */}
                    <Sidebar />
                    <ChannelDrawer />
                    <MessageSection />
                    <UserList />
                </Row>
            </Content>
        )
    }
}

const mapStateToProps = ({ chat }) => ({ channelAdded: chat.channelAdded, channelFailed: chat.channelFailed })

export default connect(
    mapStateToProps,
    { signOutUser }
)(Home)
