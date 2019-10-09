import React, { Component } from 'react'
import { Col } from 'antd'
import { List, Avatar } from 'antd'
import { Tabs } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { addUserToChannel, removeUserFromChannel } from '../actions/index'

const { TabPane } = Tabs

const allUsers = [
    {
        title: 'Ant Design Title 1'
    },
    {
        title: 'Ant Design Title 2'
    },
    {
        title: 'Ant Design Title 3'
    },
    {
        title: 'Ant Design Title 4'
    }
]

const groupMembers = [
    {
        title: 'Ant Design Title 1'
    },
    {
        title: 'Ant Design Title 2'
    },
    {
        title: 'Ant Design Title 3'
    }
]

class UserList extends Component {
    render() {
        console.log('LOLLLL', this.props)
        return (
            <Col md={5} style={{ background: '#68656947', height: '100vh' }}>
                <div className="user-header">Users</div>
                <div style={{ marginLeft: 12, marginRight: 12 }}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Members" key="1">
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.currentChannelInfo ? this.props.currentChannelInfo.users : []}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={<a href="https://ant.design">{item.name}</a>}
                                            description="Hi I am using Snack"
                                        />
                                        {this.props.currentChannelInfo &&
                                        this.props.currentChannelInfo.admin !== item.userId ? (
                                            <a
                                                href="#"
                                                onClick={() => {
                                                    this.props.removeUserFromChannel(
                                                        this.props.currentChannelInfo,
                                                        item
                                                    )
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </a>
                                        ) : (
                                            ''
                                        )}
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="Add" key="2">
                            <List
                                itemLayout="horizontal"
                                dataSource={
                                    this.props.allUsers &&
                                    this.props.currentChannelInfo &&
                                    this.props.allUsers.filter(
                                        user => !this.props.currentChannelInfo.users.some(u => user.userId === u.userId)
                                    )
                                }
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={<a href="https://ant.design">{item.name}</a>}
                                            description="Hi I am using Snack"
                                        />
                                        <a
                                            href="#"
                                            onClick={() =>
                                                this.props.addUserToChannel(this.props.currentChannelInfo, item)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </a>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
        )
    }
}

const mapStateToProps = ({ chat, auth }) => ({
    currentChannelInfo: chat.currentChannelInfo,
    allUsers: chat.allUsers,
    currentUser: auth.currentUser
})

export default connect(
    mapStateToProps,
    { addUserToChannel, removeUserFromChannel }
)(UserList)
