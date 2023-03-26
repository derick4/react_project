import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { updateUserInfo } from '../../store/actions'

import { NavBar, List, Button, InputItem, TextareaItem } from 'antd-mobile'

import Avatar from '../../components/avatar/Avatar'

class DashenInfo extends Component {
  state = {
    post: '', // 岗位
    info: '', // 个人介绍
    header: '' // 头像
  }
  render() {
    // 跳转到大神主界面
    let {type, header} = this.props.state
    if (type && header) {
      let path = '/laoban';
      return (<Redirect to={path}/>)
    }
    return (
      <div>
        <NavBar mode="dark">大神信息完善界面</NavBar>
        <Avatar setAvatar={this.setAvatar}/>
        <List>
          <InputItem onChange={(val) => this.handleInput('post', val)}>求职意向</InputItem>
          <TextareaItem 
            onChange={(val) => this.handleInput('info', val)}
            title="个人介绍" 
            autoHeight
            count={100}
          ></TextareaItem>
        </List>
        <Button type='primary' onClick={() => this.handleSave()}>完成</Button>
      </div>
    )
  }
  // 获取输入内容
  handleInput = (type, val) => {
    this.setState({[type]: val})
  }
  // 获取头像
  setAvatar = (val) => {
    this.setState({header: val})
  } 
  // 保存信息
  handleSave() {
    this.props.updateUserInfo(this.state)
  }
}


export default connect(
  function mapStateToProps(state) {
    return {
      state: state.doRegisterReducers
    }
  },

  function mapDispatchToProps(dispatch) {
    return {
      updateUserInfo: data => dispatch(updateUserInfo(data))
    }
  }
)(DashenInfo)