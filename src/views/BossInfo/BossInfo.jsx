import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
 
import { updateUserInfo } from '../../store/actions'

import { NavBar, List, InputItem, Button, TextareaItem  } from 'antd-mobile'

import Avatar from '../../components/avatar/Avatar'

class BossInfo extends Component {
    state = {
        header: '', // 头像
        post: '', // 招聘岗位
        company: '', // 公司名称
        salary: '', // 薪资
        info: '', // 岗位要求
    }

    // 输入内容
    handleInput = (type, val) => {
        this.setState({[type]: val})
    }

    
    // 设置头像
    setAvatar = (text) => {
        this.setState({header: text})
    }
    
    // 完成信息完善
    handleSave() {
        this.props.updateUserInfo(this.state)
    }

    render() {
      // console.log(this.props.state)
        let { type, header } = this.props.state
        if (type && header) {
            let path = '/dashen';
            return(<Redirect to={path}/>)
        }
        return (
            <div>
                <NavBar mode="dark">信息完善界面</NavBar>
                <Avatar setAvatar={this.setAvatar} />
                <List>
                    <InputItem onChange={(val) => this.handleInput('post', val)}>招聘职位</InputItem>
                    <InputItem onChange={(val) => this.handleInput('company', val)}>公司名称</InputItem>
                    <InputItem onChange={(val) => this.handleInput('salary', val)}>薪资待遇</InputItem>
                    <TextareaItem 
                      title="职位要求" 
                      autoHeight
                      onChange={(val) => this.handleInput('info', val)} 
                      />
                </List>
                <Button type='primary' onClick={() => this.handleSave()}>完成</Button>
            </div>
        )
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
  )(BossInfo)