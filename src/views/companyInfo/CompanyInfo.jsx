import React, { Component } from 'react'
import './CompanyInfo.css'

import { connect } from 'react-redux'
import { updateCompanyInfo } from '../../store/actions'

import { NavBar, Icon, List, InputItem, TextareaItem, Button } from 'antd-mobile'

class CompanyInfo extends Component {
  state = {
    company: '', // 公司
    post: '', // 职位
    salary: '', // 薪资
    info: '', // 要求
  }

  componentWillMount() {
    let {company, post, salary, info} = this.props.users
    this.setState({company, post, salary, info})
  }

  // 收集表单
  handler = (name, val) =>{
    this.setState({[name]: val})
  }

  // 提交
  finished = () => {
    this.props.updateCompanyInfo(this.state)

    this.props.history.push('/person')
  }

  render() {
    
    return (
      <div>
        <NavBar
            id='comp'
            icon={<Icon type='left' />}
            onLeftClick={() => this.props.history.goBack()}
            >编辑招聘信息
        </NavBar>
        <List renderHeader={() => ''}>
          <InputItem
            clear
            placeholder="公司名称"
            value={this.state.company}
            onChange={(val) => this.handler('company', val)}
          >公司名称</InputItem>
          <InputItem
            clear
            placeholder="招聘职位"
            value={this.state.post}
            onChange={(val) => this.handler('post', val)}
          >招聘职位</InputItem>
          <InputItem
            clear
            placeholder="薪资"
            value={this.state.salary}
            onChange={(val) => this.handler('salary', val)}
          >薪资</InputItem>
          <TextareaItem
            title="职位要求"
            placeholder="auto focus in Alipay client"
            value={this.state.info}
            data-seed="logId"
            autoHeight
            maxLength={150}
            onChange={(val) => this.handler('info', val)}
          />
        </List>
        <Button type='primary' id='btn0' onClick={this.finished}>完成</Button>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      users: state.doRegisterReducers,
      company: state.getResumeReducers
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
        updateCompanyInfo: data => dispatch(updateCompanyInfo(data))
    }
  }
)(CompanyInfo)