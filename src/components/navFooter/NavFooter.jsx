import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
const Item = TabBar.Item
class footer extends Component {
    render() {
        //获取props传递的属性 navList
        let navList=this.props.navList
        // 过滤底部导航栏
        navList=navList.filter((nav)=>!nav.hide)
        //获取切换路由的路径
        let pathname=this.props.location.pathname
        // 获取未读消息数量
        let { unreadMsgCount } = this.props
        // console.log('未读消息数', unreadMsgCount)
        return (
            <div>
                <TabBar
                    unselectedTintColor="#333"
                    tintColor="#43D7AA"
                    barTintColor="white"
                >
                    {
                       navList.map((nav)=>(
                        <Item 
                          title={nav.title} 
                          icon={{ uri: require(`../../assets/imgs/footer/${nav.icon}.png`) }} 
                          selectedIcon={{ uri: require(`../../assets/imgs/footer/${nav.icon}-selected.png`) }} 
                          selected={pathname===nav.path}
                          badge={nav.path === '/message' ? unreadMsgCount : 0} 
                          onPress={()=>this.props.history.push(nav.path)} 
                          key=''>
                        </Item>
                       )) 
                    }
                </TabBar>
            </div>
        )
    }
}
export default withRouter(footer)