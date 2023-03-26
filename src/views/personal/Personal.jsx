/*
用户个人中心路由组件
 */
import React from 'react'
import { List, WhiteSpace, WingBlank, Button, Modal } from 'antd-mobile'
import { createFromIconfontCN } from '@ant-design/icons'

import Cookies from 'js-cookie'

import { doLogout } from '../../store/actions'

import { connect } from 'react-redux'

const Item = List.Item

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_3932255_z6x8lswn01.js']
})

class Personal extends React.Component {
  // 退出操作
  logout = () => {
    Modal.alert('退出', '确定退出登录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          // 调用退出登录,清除state数据
          this.props.doLogout()
          // 清除cookie
          Cookies.remove('userid')
          // 跳转登录页
          this.props.history.replace('/login')
        }
      }
    ])
  }
  render() {
    // 解构数据
    let { header, username, post, type, _id:userid } = this.props.data
    return (
      <div style={{ marginBottom: '55px' }}>
        <div className='my-info'>
          <div className='img'>
            <img src={require(`../../assets/imgs/avatars/${header}.png`)}
              alt=""
              style={{ width: '60px' }} />
          </div>
          <div className='name'>{username}</div>
          {type === 'dashen' ? <div className='editor' onClick={() => this.props.history.push(`/editresume/${userid}`)}>在线简历&nbsp;&gt;</div> : null}
        </div>
        <ul className='history'>
          {type === 'dashen' ?
            <li><span className='num'>118</span> <span className='text'>投递</span></li> :
            <li><span className='num'>126</span> <span className='text'>收递</span></li>}
          <li><span className='num'>34</span> <span className='text'>收藏</span></li>
          <li><span className='num'>560</span> <span className='text'>足迹</span></li>
          <li><span className='num'>12</span> <span className='text'>关注</span></li>
          <li><span className='num'>43</span> <span className='text'>互动</span></li>
        </ul>

        {type === 'dashen' ?
          <List>
            <Item
              thumb={<IconFont type="icon-qiuzhizhuangtai"
                style={{ fontSize: '18px' }} />}
              extra={post}
              arrow="horizontal"
              onClick={() => { }}>
              求职意向
            </Item>
            <Item
              thumb={<IconFont type="icon-yaoqing"
                style={{ fontSize: '18px' }} />}
              arrow="horizontal"
              onClick={() => { }}>
              面试邀请
            </Item>
            <Item
              thumb={<IconFont type="icon-wenjian"
                style={{ fontSize: '18px' }} />}
              extra="去上传"
              arrow="horizontal"
              onClick={() => { }}>
              附件简历
            </Item>
            <Item
              thumb={<IconFont type="icon-shouye"
                style={{ fontSize: '18px' }} />}
              extra="去设置"
              arrow="horizontal"
              onClick={() => { }}>
              我的住址
            </Item>
          </List> :
          <List>
            <Item
              thumb={<IconFont type="icon-neizhaorencaiku"
                style={{ fontSize: '18px' }} />}
              arrow="horizontal"
              onClick={() => {this.props.history.push('/company')}}>
              我要招人
            </Item>
            <Item
              thumb={<IconFont type="icon-shouye"
                style={{ fontSize: '18px' }} />}
              extra="去设置"
              arrow="horizontal"
              onClick={() => { }}>
              我的住址
            </Item>
          </List>}
        <WhiteSpace />
        <WingBlank>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
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
  },
  function mapDispatchToProps(dispatch) {
    return {
      doLogout: () => dispatch(doLogout())
    }
  }
)(Personal)