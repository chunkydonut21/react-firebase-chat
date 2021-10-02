import React, { Component } from 'react'
import { Col } from 'antd'
import { List, Avatar } from 'antd'
import { Tabs } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { addUserToChannel, removeUserFromChannel } from '../actions/index'

const { TabPane } = Tabs

class UserList extends Component {
  render() {
    const { currentChannelInfo, currentUser } = this.props
    return (
      <Col md={5} style={{ background: '#68656947', height: '100vh' }}>
        <div className="user-header">Users</div>
        <div style={{ marginLeft: 12, marginRight: 12 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Members" key="1">
              <List
                itemLayout="horizontal"
                dataSource={currentChannelInfo ? currentChannelInfo.users : []}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.avatar} />}
                      title={<span>{item?.name}</span>}
                      description="Hi I am using Snack"
                    />
                    {currentChannelInfo &&
                    currentChannelInfo?.admin !== item?.userId &&
                    currentUser?.uid !== item.userId ? (
                      <a
                        href="/#"
                        onClick={() => {
                          this.props.removeUserFromChannel(currentChannelInfo, item)
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
                  currentChannelInfo &&
                  this.props.allUsers?.filter((user) => !currentChannelInfo.users.some((u) => user.userId === u.userId))
                }
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.avatar} />}
                      title={<span>{item?.name}</span>}
                      description="Hi I am using Snack"
                    />
                    <a href="/#" onClick={() => this.props.addUserToChannel(currentChannelInfo, item)}>
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

export default connect(mapStateToProps, { addUserToChannel, removeUserFromChannel })(UserList)
