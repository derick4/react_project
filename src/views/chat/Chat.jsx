/*
对话聊天的路由组件
*/
import React, { Component } from 'react'

import { connect } from 'react-redux'

import { sendMsg, getReadMsg } from '../../store/actions'

import { NavBar, InputItem, Icon, Grid } from 'antd-mobile'

// 导入动画库
// import QueueAnim from 'rc-queue-anim';

class Chat extends Component {
    /* 
        发送消息格式：{from: 发送方, to：接收方, content:内容 }
        from, to ==> 用户 id
    */

    state = {
        content: '', // 输入内容
        isShow: false, // 表情列表的显示与隐藏
    }

    // 发送
    handleSend = () => {
        // 发送方id
        let from = this.props.data._id
        let to = this.props.match.params.userid
        let { content } = this.state
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        // 清除输入框,关闭表情列表
        this.setState({ content: '', isShow: false })
    }
    // 组件即将挂载完毕
    componentWillMount() {
        // 初始化表情列表数据
        const emojis = ['😀', '😆', '😅', '🤣', '😂', 
            '🙃', '😉', '🥰', '😍', '😛', 
            '😜', '🤑', '🤗', '🤭', '🙄', 
            '😔', '😪', '😴', '😷', '🤒', 
            '🤢', '🤮', '🥵', '🥶', '😵', 
            '😎', '🧐', '😮', '😲', '😳', 
            '😭', '😱', '😫', '😡', '😈',
            '💩', '🤡', '👹', '👻', '👽', 
            '😺', '😹', '😻', '😿', '👋', 
            '👌', '🤏', '✌️', '🤞', '🤟',
            '🤙', '👈', '👉', '👆', '👇',
            '👍', '👎', '✊', '👊', '👏',
            '🤝', '🙏', '🙈', '🙉', '🙊',
            '☀️', '⛅', '☁️', '⛈️', '☔',
        ]
        this.emojis = emojis.map(emoji => ({ text: emoji }))
    }

    // 组件挂载完毕
    componentDidMount() {
        window.scrollTo(0, document.body.clientHeight)
    }

    // 组件即将销毁
    componentWillUnmount() {
        // 获取消息发送方和接收方id
        let from = this.props.match.params.userid
        let to = this.props.data._id
        // 调用读取消息方法
        this.props.getReadMsg(from, to)
    }

    // 组件数据更新完毕
    componentDidUpdate() {
        window.scrollTo(0, document.body.clientHeight)
    }

    // 切换表情包列表
    toggleEmoji = () => {
        let isShow = !this.state.isShow
        this.setState({ isShow })
        // 异步手动派发resize事件,解决表情列表显示的bug
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            })
            this.msgWrapper.style.paddingBottom = '280px'
        } else {
            this.msgWrapper.style.paddingBottom = 0
        }
    }
    // 点击输入框，关闭表情包
    onFocus = () => {
        this.setState({ isShow: false })
    }

    onBlur = () => {
        window.scrollTo(0, document.body.clientHeight)
    }



    render() {
        // 解构用户列表和消息列表
        let { users, chatMsgs } = this.props.msgList

        // 获取接收方id
        let targetId = this.props.match.params.userid
        // 获取当前用户id
        let { _id: myId } = this.props.data
        // 判断有无聊天数据,没有返回空白界面
        if (!users[myId]) {
            return null;
        }
        // 获取聊天id chat_id (后台的chat_id 使用以下方法连接的)
        let chatId = [myId, targetId].sort().join('_')
        // 过滤消息 =》只获取当前id有关的消息
        let filterMsgs = chatMsgs.filter(item => item.chat_id === chatId)
        // 获取接收方的头像和用户名
        let targetHeader = users[targetId].header
        let targetUsername = users[targetId].username
        // 获取我的头像
        const { header: myHeader } = this.props.data

        let send = document.querySelector('.send')
        if (!this.state.content) {
            send.classList.add('send1')
        } else {
            send.classList.remove('send1')
        }


        return (
            <div id='chat-page'>
                <NavBar
                    className='nav-header'
                    icon={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={<Icon type="ellipsis" onClick={() => this.props.history.push(`/detail/${targetId}`)} />}
                >{targetUsername}</NavBar>
                <div style={{ margin: '50px 0', overflow: 'hidden' }} ref={node => this.msgWrapper = node}>
                    {/* duration:每个动画持续时间 appear 进入时是否触发 ===> 发送消息出现动画效果 */}
                    {/* <QueueAnim duration={200}> */}
                        {
                            filterMsgs.map((item, index) => {
                                if (item.from === targetId) {
                                    return (
                                        <div className="msg-wrapper" key={index}>
                                            <div className="img" onClick={() => this.props.history.push(`/detail/${targetId}`)}>
                                                <img src={require(`../../assets/imgs/avatars/${targetHeader}.png`)} alt="" style={{ width: '35px' }} />
                                            </div>
                                            <div className="content">{item.content}</div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="my-msg-wrapper" key={index}>
                                            <div className="my-img" onClick={() => this.props.history.push(`/person`)}>
                                                <img src={require(`../../assets/imgs/avatars/${myHeader}.png`)} alt="" style={{ width: '35px' }} />
                                            </div>
                                            <div className="my-content">{item.content}</div>
                                        </div>
                                    )
                                }
                            })
                        }
                    {/* </QueueAnim> */}
                </div>
                <div className='am-tab-bar'>
                    <InputItem
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        onFocus={() => {this.onFocus()}}
                        onBlur={() => this.onBlur()}
                        extra={
                            <span>
                                <span className='emoji' onClick={this.toggleEmoji}>😀</span>
                                <span className='send' onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={7}
                            carouselMaxRow={5}
                            isCarousel={true}
                            square={false}
                            hasLine={false}
                            onClick={(item) => {
                                this.setState({ content: this.state.content + item.text, isShow: false })
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}


export default connect(
    // state 属性
    function mapStateToProps(state) {
        return {
            data: state.doRegisterReducers,
            msgList: state.getUserMsgReducers
        }
    },
    // 动作属性
    function mapDispatchToProps(dispatch) {
        return {
            sendMsg: data => dispatch(sendMsg(data)),
            getReadMsg: (from, to) => dispatch(getReadMsg(from, to))
        }
    }
)(Chat)