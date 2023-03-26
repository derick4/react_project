import React, { Component } from 'react'
import './Detail.css'
import { connect } from 'react-redux'
import { getAllUserList } from '../../store/actions'

import { NavBar, Icon, Card, NoticeBar } from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body


class Detail extends Component {
    state = {
        type: '', // 当前用户数据类型
        userList: [], // 用户列表
    }

    componentDidMount() {
        // 获取当前用户类型
        let { type } = this.props.data1
        // 如果当前是大神，获取老板列表，如果是老板则获取大神列表
        if (type === 'dashen') {
            this.props.getAllUserList('laoban')
        } else if (type === 'laoban') {
            this.props.getAllUserList('dashen')
        }
        let userList = this.props.data
        if (userList) {
            this.setState({ type, userList })
        }
    }

    render() {
        // console.log(this.state.userList)
        let targetID = this.props.match.params.userid
        let targetUser = this.props.data.filter(item => item._id === targetID)
        targetUser = targetUser[0]
        if (targetUser.type === 'laoban') {
            var { company, header, info, post, salary, username } = targetUser

        } else {
            var { education, header, info, job_exp, post, practice_exp, username, wish_salary, phone_num, email } = targetUser
        }
        // console.log(targetUser)
        // console.log('---', this.props.data) // 老板列表/大神列表
        // console.log('===', this.props.data1) // 当前用户信息
        // console.log('++++', this.props.users) // 更新后的用户信息

        return (
            <div>
                <NavBar
                    key=""
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <span>举报</span>
                    ]}
                ></NavBar>

                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                求职过程中如遇收取培训费、考证费、中介费、押金等费用，发布虚假招聘广告信息等损害您合法权益的行为，请立即举报
                </NoticeBar>

                <Card key={1} className="user-detail1">
                    <Header
                        title={this.state.type === 'laoban' ? <div>求职岗位:{post}</div>:<div>招聘岗位:{post}</div>}
                        extra={salary ? <div>{salary}</div> : null}
                    />
                    <div className='user-wrapper1'>
                        <img src={require(`../../assets/imgs/avatars/${header}.png`)} alt="" />
                        <div className='username'>{username}</div>
                        <div className='arrow'>&gt;</div>
                    </div>
                </Card>

                <Card className='user-detail' key={2}>
                    {this.state.type === 'laoban' ?
                        <Body key={1}>
                            <h3 className='desc-header'>教育经历</h3>
                            <div className='content1'>{education ? education : '这个人太懒了，什么都没留下'}</div>
                            <h3 className='desc-header'>电话号码</h3>
                            <div className='content1'>{phone_num? phone_num:'这个人太懒了，什么都没留下'}</div>
                            <h3 className='desc-header'>邮箱地址</h3>
                            <div className='content1'>{email? email:'这个人太懒了，什么都没留下'}</div>
                            <h3 className='desc-header'>ta的技能</h3>
                            <div className='content1'>{info? info:'这个人太懒了，什么都没留下'}</div>
                            <h3 className='desc-header'>意向薪资</h3>
                            <div className='content1'>{wish_salary?wish_salary:'这个人太懒了，什么都没留下'}</div>
                            <h3 className='desc-header'>实习经历</h3>
                            <div className='content1'>{practice_exp? practice_exp:'这个人太懒了，什么都没留下'}</div>
                            <h3 className='desc-header'>工作经历</h3>
                            <div className='content1'>{job_exp?job_exp:'这个人太懒了，什么都没留下'}</div>
                        </Body> :
                        <Body key={2}>
                            <h3 className='desc-header'>公司名称</h3>
                            <div className='content1'>{company}</div>
                            <h3 className='desc-header'>薪资</h3>
                            <div className='content1'>{salary}</div>
                            <h3 className='desc-header'>招聘岗位</h3>
                            <div className='content1'>{post}</div>
                            <h3 className='desc-header'>职位要求</h3>
                            <div className='content1'>{info}</div>
                        </Body>
                    }
                </Card>
            </div>
        )
    }
}

export default connect(
    function mapStateToProps(state) {
        return {
            data: state.getUserListReducers, // 大神/老板列表信息
            data1: state.doRegisterReducers, // 当前用户信息
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            getAllUserList: type => dispatch(getAllUserList(type)),
        }
    }
)(Detail)
