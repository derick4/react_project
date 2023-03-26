import React, { Component } from 'react'
import './EditResume.css'
import { connect } from 'react-redux'
import { updateResume } from '../../store/actions'

import { NavBar, Icon, List, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'

class EditResume extends Component {
  state = {
    username: '', // 用户名
    phone_num: '', // 电话
    email: '', // 邮箱
    post :'', // 意向职位
    wish_salary: '', // 期望薪资
    info: '', // 技能描述
    job_exp: '', // 工作经验
    practice_exp: '', // 实习经历
    education: '', // 教育经历
  }

  componentDidMount() {
    this.getUpdateUser()
  }

  getUpdateUser = () => {
    let {username, phone_num,email,post, info,wish_salary,job_exp,practice_exp,education} = this.props.users
    this.setState({username,phone_num,email,post,info,wish_salary,job_exp,practice_exp,education})
  }

  // 收集表单
  handler = (name, val) =>{
    this.setState({[name]: val})
  }

  // 提交
  finished = () => {
    let {username,phone_num,post,email} = this.state
    if (!username || !phone_num || !post || !email) {
      Toast.fail('请将用户名，手机，邮箱，职位等信息补充完整', 1.5)
      return;
    }
    // 验证手机
    let regExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    // 验证邮箱
    let regExp1 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!regExp.test(phone_num)) {
      Toast.fail('手机号码输入格式有误~', 1.5)
      return;
    }
    if (!regExp1.test(email)) {
      Toast.fail('邮箱输入格式有误~', 1.5)
      return;
    }

    this.props.updateResume(this.state)
    this.props.history.push('/person')
  }

  render() {
    return (
      <div>
        <NavBar
            key=''
            icon={<Icon type='left' />}
            onLeftClick={() => this.props.history.goBack()}>编辑在线简历
        </NavBar>
        <List renderHeader={() => ''} className="resume-wrapper">
          <InputItem
            clear
            placeholder="姓名"
            value={this.state.username}
            onChange={(val) => this.handler('username', val)}
          >姓名</InputItem>
          <InputItem
            clear
            placeholder="电话"
            value={this.state.phone_num}
            onChange={(val) => this.handler('phone_num', val)}
          >电话</InputItem>
          <InputItem
            clear
            placeholder="邮箱地址"
            value={this.state.email}
            onChange={(val) => this.handler('email', val)}
          >邮箱地址</InputItem>
          <InputItem
            clear
            placeholder="求职意向"
            value={this.state.post}
            onChange={(val) => this.handler('post', val)}
          >意向岗位</InputItem>
          <InputItem
            clear
            placeholder="意向薪资"
            value={this.state.wish_salary}
            onChange={(val) => this.handler('wish_salary', val)}
          >意向薪资</InputItem>
          <TextareaItem
            title="技能描述"
            placeholder="auto focus in Alipay client"
            value={this.state.info}
            data-seed="logId"
            autoHeight
            maxLength={300}
            onChange={(val) => this.handler('info', val)}
          />
          <TextareaItem
            title="工作经历"
            placeholder="工作经历"
            data-seed="logId"
            autoHeight
            maxLength={300}
            value={this.state.job_exp}
            onChange={(val) => this.handler('job_exp', val)}
          />
          <TextareaItem
            title="实习经历"
            placeholder="实习经历"
            data-seed="logId"
            autoHeight
            maxLength={300}
            value={this.state.practice_exp}
            onChange={(val) => this.handler('practice_exp', val)}
          />
          <InputItem
            clear
            placeholder="教育经历"
            value={this.state.education}
            onChange={(val) => this.handler('education', val)}
          >教育经历</InputItem>
          <Button type='primary' onClick={this.finished}>完成</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      users: state.doRegisterReducers,
      resume: state.getResumeReducers
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      updateResume: users => dispatch(updateResume(users))
    }
  }
)(EditResume)