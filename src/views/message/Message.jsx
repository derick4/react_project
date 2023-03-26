import React, { Component } from 'react'

import { connect } from 'react-redux'

import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

// 分组、获取最后一条消息方法
function getLastMsg(chatMsgs, userId) {
  // 定义最后一条信息集合
  let lastMsgObj = {};
  // 遍历消息列表
  chatMsgs.forEach(item => {
    if (item.to === userId && !item.read) {
      // 统计未读消息
      item.unreadCount = 1
    } else {
      item.unreadCount = 0
    }
    let chatId = item.chat_id
    // 根据集合获取分隔分组的最后一条消息
    let lastMsg = lastMsgObj[chatId]
    if (!lastMsg) {
      lastMsgObj[chatId] = item
    } else {
      // 统计未读消息总数 = 分组未读消息条数 + 初始
      let unreadCountMsg = lastMsg.unreadCount + item.unreadCount
      if (item.create_time > lastMsg.create_time) {
        lastMsgObj[chatId] = item
      }
      lastMsgObj[chatId].unreadCount = unreadCountMsg
    }
  })
  // 转换为数组形式
  let lastMsgObjs = Object.values(lastMsgObj)
  // 根据发送消息的先后对消息列表进行降序排序
  lastMsgObjs.sort((a, b) => {
    return b.create_time - a.create_time
  })
  return lastMsgObjs;
}

// 转换时间
function stamptimeToLocaltime(date) {
  var t = new Date(date).toLocaleString()
  return t;
}

// 获取聊天日期
function getDate(date) {
  var t1 = new Date(date).toLocaleDateString()
  return t1;
}
// 获取当前时间日期
function getNowTime() {
  let t3 = +new Date()
  t3 = new Date(t3).toLocaleDateString()
  return t3
}

class Message extends Component {

  handleClick = (targetId) => {
    // 跳转聊天界面
    this.props.history.push(`/chat/${targetId}`)
  }

  render() {
    // 获取当前用户与其他用户的所有聊天信息
    const { users, chatMsgs } = this.props.chatMsgList
    // 调用先获取最后一条消息，在做分组方法
    // 获取登录的用户信息
    let user = this.props.user
    // 传入消息列表和登录用户id
    let result = getLastMsg(chatMsgs, user._id)
    return (
      <List style={{ margin: '45px 0' }}>
          {
            result.map(item => {
              //获取下目标用户的id
              const targetId = item.to === user._id ? item.from : item.to
              //获取目标用户的信息
              const targetUser = users[targetId]
              // 转换时间
              let time = item.create_time
              let localeTime = stamptimeToLocaltime(time)
              localeTime = localeTime.slice(0, -3)

              return (
                <Item
                  key={item._id}
                  extra={<Badge text={item.unreadCount} />}
                  thumb={require(`../../assets/imgs/avatars/${targetUser.header}.png`)}
                  onClick={() => this.handleClick(targetId)}
                >
                  {targetUser.username}
                  <Brief>{item.content}</Brief>
                  {getDate(time) === getNowTime() ? <div className='time'>{localeTime.slice(-5)}</div> : <div className='time'>{localeTime}</div>
                  }
                </Item>
              )
            })
          }

      </List>
    )
  }
}
export default connect(
  function mapStateToProps(state) {
    return {
      user: state.doRegisterReducers,
      chatMsgList: state.getUserMsgReducers,
      readMsg: state.readMsgReducers
    }
  },
)(Message)