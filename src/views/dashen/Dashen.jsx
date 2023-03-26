import React, { Component } from 'react'
import './Dashen.css'
import { connect } from 'react-redux'

import { SearchBar } from 'antd-mobile'

import { getAllUserList } from '../../store/actions'

import UserList from '../../components/userList/UserList'
import DemoSwiper from '../../components/swiper/DemoSwiper'

class Dashen extends Component {
  state = {
    userInfoList: [], // 用户列表
    value: '', // 搜索内容
  }
  // 加载完毕钩子
  componentDidMount() {
    this.props.getAllUserList('dashen')
  }

  render() {
    // 获取用户列表
    let userList = this.props.data
    return (
      <div>
        <SearchBar
              value={this.state.value}
              placeholder="搜索"
              onFocus={() => this.props.history.push('/search/dashen')}
            />
          <div>
            <DemoSwiper />
            <UserList userInfoList={userList} />
          </div>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      data: state.getUserListReducers
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      getAllUserList: type => dispatch(getAllUserList(type))
    }
  }
)(Dashen)
