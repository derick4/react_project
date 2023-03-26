import React, { Component } from 'react'
import './Boss.css'
import { connect } from 'react-redux'

import { SearchBar } from 'antd-mobile'

import { getAllUserList } from '../../store/actions'

import UserList from '../../components/userList/UserList'
import Swiper from '../../components/swiper/DemoSwiper'

class Boss extends Component {

  componentDidMount() {
    this.props.getAllUserList('laoban')
  }

  render() {
    let userList = this.props.data
    return (
      <div>
        <SearchBar
          placeholder="搜索"
          onFocus={() => this.props.history.push('/search/laoban')}
        />
        <Swiper />
        <UserList userInfoList={userList} />
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
)(Boss)
