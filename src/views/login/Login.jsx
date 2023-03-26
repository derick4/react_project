import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
// 导航栏
import { NavBar, List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import { connect } from 'react-redux'

import { login } from '../../store/actions'

import logo from './logo3.jpg'
import './login.css'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  // 登录数据
  handleChange = (name, val) => {
    this.setState({[name]: val})
  }

  // 登录
  doLogin = () => {
    this.props.login(this.state)
  }
  // 跳转注册页面
  doRegister = () => {
    this.props.history.push('/register')
  }

  render() {
    let { redirectTo }  = this.props.data
    // 注册成功，跳转主界面
    if (redirectTo) {
      return (<Redirect to={redirectTo}/>)
    }
    return (
      <div>
        <NavBar mode="dark" style={{fontSize: '15px', background: '#587cf7'}}>登录</NavBar>
        <div className='logo-container'>
            <img src={logo} style={{width: '150px'}} alt="" />
        </div>
        <WingBlank>
          <List>
            <InputItem 
              type='text' 
              placeholder='用户名'
              onChange={val => this.handleChange('username', val)}
            >用户名</InputItem>
            <WhiteSpace size='md' />
            <InputItem 
              type='password' 
              placeholder='密码'
              onChange={val => this.handleChange('password', val)}
            >密&nbsp;&nbsp;&nbsp;码</InputItem>
          </List>
          <WhiteSpace size='xl' />
          <Button style={{background: '#587cf7'}} type='primary' onClick={this.doLogin}>登录</Button>
          <ul>
            <li><a href="##">忘记密码</a></li>
            <li className='no-account' onClick={this.doRegister}><a href="##">还没有账号？</a></li>
          </ul>
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
      login: data => dispatch(login(data))
    }
  }
)(Login)