/*
用户列表的 UI 组件
*/
import React from 'react'

// 导入动画库
// import QueueAnim from 'rc-queue-anim';

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {
    render() {
        // 获取 props 传递的数据
        let { userInfoList } = this.props
        // 获取用户身份
        let { type } = this.props.data
        return (
            <div>
                <WingBlank className='user-wrapper' size="sm">
                    {
                        userInfoList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Card onClick={() => this.props.history.push(`/chat/${item._id}`)}>
                                        <Header
                                            title={<div>{item.post}</div>}
                                            thumb={require(`../../assets/imgs/avatars/${item.header}.png`)}
                                            extra={item.salary ? <div>{item.salary}</div> : null}
                                        />

                                        <Body>
                                            {type === 'dashen' ?
                                                <ul className='taps'>
                                                    <li>全职</li>
                                                    <li>本科</li>
                                                    <li>不限</li>
                                                </ul> : null
                                            }

                                            {item.company ? <div>公司: {item.company}</div> : null}
                                            <div>描述: {item.info}</div>
                                        </Body>
                                    </Card>
                                    <WhiteSpace />
                                </div>
                            )
                        })
                    }
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    function mapStateToProps(state) {
        return {
            data: state.doRegisterReducers
        }
    }
)(withRouter(UserList))