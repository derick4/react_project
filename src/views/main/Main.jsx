import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import { NavBar } from 'antd-mobile'

import { connect } from 'react-redux'

import { getPersistedUserCookies } from '../../store/actions'

import Cookies from 'js-cookie'

import Dashen from '../dashen/Dashen'
import DashenInfo from '../dashenInfo/DashenInfo'
import Boss from '../Boss/Boss'
import BossInfo from '../BossInfo/BossInfo'
import NavFooter from '../../components/navFooter/NavFooter'
import Message from '../../views/message/Message'
import Personal from '../../views/personal/Personal'
import Chat from '../chat/Chat'
import Detail from '../detail/Detail'
import EditResume from '../editResume/EditResume'
import CompanyInfo from '../companyInfo/CompanyInfo'
import Search from '../search/Search'

class Main extends Component {
  state = {
    // 底部导航栏信息列表
    navList: [
      // 大神界面
      {
        path: '/laoban', // 跳转路径
        component: Boss, // 对应组件
        icon: 'laoban', // 图标
        text: '招聘列表', // 图标下的文本
        title: '招聘列表' // 头部导航标题
      },
      // 老板界面
      {
        path: '/dashen',
        component: Dashen,
        icon: 'dashen',
        text: '求职列表',
        title: '求职列表'
      },
      // 消息界面
      {
        path: '/message',
        component: Message,
        text: '消息',
        icon: 'message',
        title: '消息中心'
      },
      // 个人中心界面
      {
        path: '/person',
        component: Personal,
        text: '我的',
        icon: 'personal',
        title: '个人中心'
      },
    ]
  }

  // 挂载完毕
  componentDidMount() {
    // 登录时存储的cookie
    let userId = Cookies.get('userid'),
      { _id } = this.props.data;
    // 刷新页面时
    if (userId && !_id) {
      this.props.getPersistedUserCookies()
    }
  }

  render() {
    let userId1 = Cookies.get('userid'),
      { _id } = this.props.data;
    // 如果未登录状态,跳转登录页
    if (!userId1) {
      return (<Redirect to="/login" />)
    }
    if (!_id) {
      return null; // 返回空白页面，触发componentDidMount
    }

    //获取下跳转得路由地址
    let pathnames=this.props.location.pathname;
    // console.log(pathnames)
    //重定向
    if(pathnames==="/"){
      //获取用户得类型
      let {type}=this.props.data;
      if(type==="dashen"){
        return <Redirect to="/dashen"/>
      }
      if(type==="laoban"){
        return <Redirect to="/laoban"/>
      }
    }

    // 获取当前路径
    let { pathname } = this.props.location
    // 获取当前访问路径信息
    let currentFooterNav = this.state.navList.find((item) => item.path === pathname)
    // 获取当前登录用户的类型
    let { type } = this.props.data
    if (currentFooterNav) {
      // 如果身份是老板，则把老板的列表隐藏
      if (type === 'dashen') {
        let { navList } = this.state
        navList[1].hide = true
      } else {
        let { navList } = this.state
        navList[0].hide = true
      }
    }

    // 获取总未读消息数
    const unreadMsgCount = this.props.unreadMsgCount


    return (
      <div>
        { currentFooterNav ? <NavBar className='nav-header'>{currentFooterNav.title}</NavBar> : null }
        <Switch>
          {/* 大神 */}
          <Route path="/dashen" component={Dashen} />
          <Route path="/dasheninfo" component={DashenInfo} />
          {/* 老板 */}
          <Route path="/laoban" component={Boss}/>
          <Route path="/laobaninfo" component={BossInfo}/>
          {/* 消息 */}
          <Route path="/message" component={Message}/>
          {/* 个人中心 */}
          <Route path="/person" component={Personal}/>
          {/* 聊天页面 */}
          <Route path="/chat/:userid" component={Chat}/>
          {/* 用户详情 */}
          <Route path="/detail/:userid" component={Detail}/>
          {/* 在线简历 */}
          <Route path="/editresume/:userid" component={EditResume}/>
          {/* 公司信息 */}
          <Route path="/company" component={CompanyInfo}/>
          {/* 搜索 */}
          <Route path="/search/:type" component={Search} />
        </Switch>
        {/* 底部导航 */}
        {currentFooterNav ? <NavFooter navList={this.state.navList} unreadMsgCount={unreadMsgCount}/> : null }
      </div>
    )
  }
}


export default connect(
  function mapStateToProps(state) {
    return {
      data: state.doRegisterReducers,
      unreadMsgCount: state.getUserMsgReducers.unreadMsgCount,
      users: state.getUserListReducers
    }
  },

  function mapDispatchToProps(dispatch) {
    return {
      getPersistedUserCookies: data => dispatch(getPersistedUserCookies(data))
    }
  }
)(Main)
