import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { register } from '../../store/actions'

// 导航栏
import { NavBar, List, InputItem, WingBlank, WhiteSpace, Button, Flex, Radio } from 'antd-mobile'
import logo from './logo3.jpg'
import './Register.css'

class Register extends Component {
  state = {
    username: '',
    password: '',
    password1: '',
    type: 'dashen'
  }

  // 表单数据
  handleChange = (type, val) => {
    this.setState({ [type]: val })
  }

  // 注册
  doRegister = () => {
    // 调用 actions
    this.props.register(this.state)
  }

  // 跳转登录
  doLogin = () => {
    this.props.history.push('/login')
  }

  render() {
    let { redirectTo, msg }  = this.props.data
    // 注册成功，跳转主界面
    if (redirectTo) {
      return (<Redirect to={redirectTo}/>)
    }
    return (
      <div>
        <NavBar mode="dark" style={{background: '#587cf7'}}>注册</NavBar>
        <div className='logo-container'>
          <img src={logo} alt="logo" style={{width: '150px'}} />
        </div>
        <WingBlank>
          {/* 错误提示信息 */}
          <p className='reg-error'>{ msg? msg: null }</p>
          <List>
            <InputItem type='text'
              placeholder='用户名'
              onChange={val => this.handleChange('username', val)}
            >
              用户名
            </InputItem>
            <WhiteSpace size='sm' />
            <InputItem
              type='password'
              placeholder='密码'
              onChange={val => this.handleChange('password', val)}
            >
              密&nbsp;&nbsp;&nbsp;码
            </InputItem>
            <WhiteSpace size='sm' />
            <InputItem
              type='password'
              placeholder='确认密码'
              onChange={val => this.handleChange('password1', val)}
            >
              确认密码
            </InputItem>
          </List>
          <Flex style={{ padding: '10px 15px' }}>
            <Flex.Item
              style={{ padding: '15px 0', color: '#666', flex: 'none' }}
            >
              选择身份
            </Flex.Item>
            <Flex.Item>
              <Radio
                className="my-radio"
                style={{ margin: '0 18px' }}
                onClick={() => this.handleChange('type', 'dashen')}
                checked={this.state.type === 'dashen'}
              >
                牛人</Radio>
              <Radio
                className="my-radio"
                onClick={() => this.handleChange('type', 'laoban')}
                checked={this.state.type === 'laoban'}
              >招聘者</Radio>
            </Flex.Item>
          </Flex>
          <Button type='primary' onClick={this.doRegister} style={{fontSize: '15px', background: '#587cf7'}}>注册</Button>
          <WhiteSpace />
          <p onClick={this.doLogin} style={{margin: '0', textAlign: 'center', color: '#666'}}>已有账号</p>
        </WingBlank>
      </div>
    )
  }
}

// 连接组件和 redux
export default connect(
  // 把state变为组件属性
  function mapStateToProps(state) {
    return {
      data: state.doRegisterReducers
    }
  },
  // 把actions变为组件属性
  function mapDispatchToProps(dispatch) {
    return {
      register: data => dispatch(register(data))
    }
  }
)(Register)
