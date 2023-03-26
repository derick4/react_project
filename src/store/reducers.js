// 将多个 reducers 结合
import { combineReducers } from "redux";

// 重定向
import { getRedirectPath } from "../utils";

import { state1, state2, state3, state4 } from './states'


/**
 * 
 * @param {*} state 初始化 state
 * @param {*} action actions 提交的动作类型和参数
 * ...state ==> 解包state，防止修改原来对象的属性
 * doRegisterReducers ==> 处理登录注册成功和失败
 * @returns 
 */

// 登录注册
function doRegisterReducers(state = state1, action) {
    switch (action.type) {
        // 登录注册成功
        case 'REGISTER_SUCESS':
            // 获取注册用户类型，跳转到相应信息完善界面
            let { type } = action.data
            return {
                ...action.data,
                redirectTo: getRedirectPath(type),
            }
        // 登录注册失败
        case 'REGISTER_FAILED':
            return {
                ...state,
                msg: action.msg
            }
        // 更新用户信息成功
        case 'UPDATE_USER_INFO_SUCCESS':
            return {
                ...action.data
            }
        // 更新用户失败
        case 'UPDATE_USER_INFO_FAILED':
            return {
                ...state,
                msg: action.msg
            }
        // 退出成功
        case 'LOGOUT_SUCCESS':
            return {}; // 退出登录，清空state数据
        default:
            return state;
    }
}

// 获取用户列表
function getUserListReducers(state = state2, action) {
    switch (action.type) {
        case 'GET_USER_LIST_SUCCESS':
            return action.data;
        case 'GET_USER_LIST_FAILED':
            return action.data;
        default:
            return state
    }
}


// 获取用户聊天列表
function getUserMsgReducers(state = state3, action) {
    switch (action.type) {
        // 获取所有消息列表
        case 'RECEIVE_MSG_SUCCESS':
            let { userId: userID, users, chatMsgs } = action.data
            return {
                users,
                chatMsgs,
                // 统计总未读消息数
                unreadMsgCount: chatMsgs.reduce((preTotal, msg) => preTotal + (msg.to === userID && !msg.read ? 1 : 0), 0)
            };
        // 实时发送消息
        case 'RECEIVE_MSG':
            const { userId, chatMsg } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                // 统计总未读消息数
                unreadMsgCount: state.unreadMsgCount + (chatMsg.to === userId && !chatMsg.read ? 1 : 0)
            }
        // 读取消息
        case 'READ_MSG':
            // data: 未读消息数 from:消息发送方 to:消息接收方
            let {data, from, to} = action.data
            // 遍历消息列表
            state.chatMsgs.forEach(item => {
                // 如果消息未读
                if (!item.read && item.from === from && item.to === to) {
                    item.read = true; // 这样做不行，forEach不能改变原来数据
                }
            })
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map( item => {
                    if (!item.read && item.from === from && item.to === to) {
                        return {
                            ...item,
                            read: true
                        }
                    } else {
                        return item
                    }
                }),
                unreadMsgCount: state.unreadMsgCount - data
            }
        default:
            return state;
    }
}


// 获取更新简历后的用户信息
function getResumeReducers(state = state4, action) {
    switch (action.type) {
        case 'DO_UPDATE_RESUME':
            let {username,phone_num, email,info,post,wish_salary, job_exp,practice_exp, education} = action.data
            return {
                username,
                phone_num,
                email,
                info,
                post,
                wish_salary,
                job_exp,
                practice_exp,
                education
            // break
            }
        case "UPDATE_COMPANY_ACTION":
            return {
                ...state4,
                ...action.data
            }
        default:
            return state
    }
}


// 合并 reducers
export default combineReducers({
    doRegisterReducers,
    getUserListReducers,
    getUserMsgReducers,
    getResumeReducers
})