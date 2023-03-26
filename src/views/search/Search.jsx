import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/userList/UserList'
import CommandJob from '../../components/commandJob/CommandJob'

import { getAllUserList } from '../../store/actions'

import { SearchBar } from 'antd-mobile'
import './Search.css'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/c/font_3932255_tuv7y23fnwl.js']
})



class Search extends Component {
    state = {
        userInfoList: [], // 所有用户列表
        filterUsers: [], // 过滤后的数据
        content: '', // 搜索内容
        type: '', // 用户类型
        length: '', 
    }
    // 组价加载完毕钩子
    componentDidMount() {
        let { type } = this.props.match.params
        this.props.getAllUserList(type)
        let userInfoList = this.props.data
        this.setState({ userInfoList })
        if (type === 'laoban') {
            this.setState({ type: 'laoban' })
        } else {
            this.setState({ type: 'dashen' })
        }
    }
    onChange = (val) => {
        this.setState({ content: val })
    }

    // 清空搜索内容
    clear = () => {
        this.setState({ content: '' })
    };

    // 搜索
    onSubmit = () => {
        let { userInfoList, content } = this.state;
        let filterUsers = userInfoList.filter(user => (user.post).includes(content))
        let length = filterUsers.length;
        this.setState({ filterUsers, length })
    }

    render() {
        let length = this.state.length
        console.log(length)
        if (!this.state.content) {
            return (
                <div>
                    <IconFont
                        className='left'
                        onClick={() => this.props.history.push(`/${this.state.type}`)}
                        type="icon-xiangzuojiantou">
                    </IconFont>
                    <SearchBar
                        className='search-bar1'
                        value={this.state.content}
                        placeholder="搜索职位"
                        onSubmit={() => this.onSubmit()}
                        onClear={() => this.clear()}
                        onChange={val => this.onChange(val)}
                    />
                    <CommandJob/>
                </div>
            )
        } else {
            return (
                <div>
                    <IconFont
                        className='left'
                        onClick={() => this.props.history.push(`/${this.state.type}`)}
                        type="icon-xiangzuojiantou">
                    </IconFont>
                    <SearchBar
                        className='search-bar1'
                        value={this.state.content}
                        placeholder="搜索职位"
                        onSubmit={() => this.onSubmit()}
                        onClear={() => this.clear()}
                        onChange={val => this.onChange(val)}
                    />
                    <div style={{ marginTop: '37px' }}>
                        {length === 0 ?
                            <div className='not-found'>
                                <img src={require('../../assets/imgs/notfound/2.png')} alt="" />
                                <div className='text'>未找到相关职位，修改筛选条件再试试吧~</div>
                            </div>
                            :
                            <div>
                                <UserList userInfoList={this.state.filterUsers} />
                            </div>
                        }
                    </div>
                </div>
            )
        }
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
)(Search)