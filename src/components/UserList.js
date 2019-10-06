import React, { Component } from 'react'
import { Col } from 'antd'
import { List, Avatar } from 'antd'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const data = [
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

class UserList extends Component {
    render() {
        return (
            <Col md={5} style={{ background: '#68656947', height: '100vh' }}>
                <div className="user-header">Users</div>
                <div style={{ marginLeft: 12, marginRight: 12 }}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Members" key="1">
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Hi I am using Snack"
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="Add" key="2">
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Hi I am using Snack"
                                        />
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

export default UserList
