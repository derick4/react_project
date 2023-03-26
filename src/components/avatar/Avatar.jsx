import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'

export default class Avatar extends Component {
    constructor() {
        super();
        // 创建头像列表
        this.avatarList = [];
        for (let i = 0; i < 20; i++) {
            this.avatarList.push({
                // 导入头像
                icon: require(`../../assets/imgs/avatars/头像${i + 1}.png`),
                text: `头像${i + 1}`
            })
        }
        this.state = {
            icon: ''
        }
    }
    render() {
        let { icon } = this.state
        // 设置选中头像
        let renderHeader = this.state.icon ? (
            <div>
                您的头像：<img src={icon} alt="" style={{width: '40px'}}/>
            </div>
        ) : '选择您的头像';
        return (
            <div>
                <List renderHeader={renderHeader}>
                    <Grid
                        data={this.avatarList}
                        columnNum={5}
                        hasLine={false}
                        onClick={this.selectAvatar}
                    ></Grid>
                </List>
            </div>
        )
    }

    // 选择头像
    selectAvatar = (data) => {
        let { icon, text } = data
        this.setState({ icon })
        // 传递给父组件
        this.props.setAvatar(text)
    }

}
