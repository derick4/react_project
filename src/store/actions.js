import { 
    registerRequest, 
    loginRequest, 
    updateUser, 
    persistedUser, 
    getUserList, 
    getUserMsgList, 
    readMsg,
    updateUserResume,
    updateCompany 
} from '../api'

import { Toast } from 'antd-mobile'

// 引入 socketIO
import io from 'socket.io-client'

function failToast(msg) {
    Toast.fail(msg, 1);
}
/**
 * 
 * 同步代码
 * 返回的是对象
 * 
*/

// 登录注册成功动作
export const registerSuccess = (data) => ({
    type: 'REGISTER_SUCESS',
    data
})
// 登录注册失败动作
export const registerFailed = (msg) => ({
    type: 'REGISTER_FAILED',
    msg
})

// 完善信息成功
export const updateUserInfoSuccess = (data) => ({
    type: 'UPDATE_USER_INFO_SUCCESS',
    data
})
// 完善信息失败
export const updateUserInfoFailed = (msg) => ({
    type: 'UPDATE_USER_INFO_FAILED',
    msg
})


// 获取用户列表成功
export const getUserListSuccess = (data) => ({
    type: 'GET_USER_LIST_SUCCESS',
    data
})

// 获取用户列表失败
export const getUserListFailed = (msg) => ({
    type: 'GET_USER_LIST_FAILED',
    data: msg
})


// 退出登录成功
export const logoutSuccess = (msg) => ({
    type: 'LOGOUT_SUCCESS',
    data: msg
})

// 获取用户聊天列表成功
export const receiveMsgSucess = (data) => ({
    type: 'RECEIVE_MSG_SUCCESS',
    data
})

// 实时获取聊天信息
export const receiveMsg = (chatMsg, userId) => ({
    type: 'RECEIVE_MSG',
    data: { chatMsg, userId }
})

// 读取消息
export const readMsgs = (data) => ({
    type: 'READ_MSG',
    data
})


/**
 * 
 * 异步代码
 * 返回的是函数
 * 
*/

// 注册
export function register(data) {
    const { username, password, password1, type } = data

    // 表单验证
    let reg = /\w{2,12}|[\u4e00-\u9fa5]{2,6}/;
    let reg1 = /\w{6,12}/;
    if (!username) {
        return registerFailed('用户名不能为空')
    } else if (!reg.test(username)) {
        return registerFailed('用户名应为2-12位字母数组下划线组成')
    } else if (!reg1.test(password) || !reg1.test(password1)) {
        return registerFailed('密码应为6-12位任意数字字母下划线组成')
    } else if (!password || !password1) {
        return registerFailed('密码不能为空')
    } else if (password !== password1) {
        return registerFailed('两次密码不一致')
    }


    return async dispatch => {
        // 注册
        let result = await registerRequest(username, password, type)
        let { code, msg, data } = result.data
        // 注册成功
        if (code === 0) {
            dispatch(registerSuccess(data))
            // 调用获取用户聊天列表
            requestUserMsgList(dispatch, data._id)
        } else {
            dispatch(registerFailed(msg))
        }
    }
}


// 登录
export function login(data) {
    let { username, password } = data
    // 表单验证
    if (!username) {
        failToast('用户名不能为空')
        return registerFailed('用户名不能为空')
    } else if (!password) {
        failToast('密码不能为空')
        return registerFailed('密码不能为空')
    }

    return async dispatch => {
        // 调用登录接口
        let result = await loginRequest(username, password)
        let { code, msg, data } = result.data
        // 登录成功
        if (code === 0) {
            dispatch(registerSuccess(result.data.data))
            // 调用获取用户聊天列表
            requestUserMsgList(dispatch, data._id)
        } else {
            failToast('用户名或密码不正确')
            dispatch(registerFailed(msg))
        }
    }
}

// 更新完善用户信息
export function updateUserInfo(data1) {
    return async (dispatch) => {
        let result = await updateUser(data1)
        let { code, msg, data } = result.data
        if (code === 0) {
            dispatch(updateUserInfoSuccess(data))
        } else {
            dispatch(updateUserInfoFailed(msg))
        }
    }
}


// 用户登录持久化
export function getPersistedUserCookies() {
    return async dispatch => {
        let result = await persistedUser()
        let { code, data, msg } = result.data
        if (code === 0) {
            dispatch(updateUserInfoSuccess(data))
            // 调用获取用户聊天列表
            requestUserMsgList(dispatch, data._id)
        } else {
            dispatch(updateUserInfoFailed(msg))
        }
    }
}


// 获取用户列表（大神和老板）
export function getAllUserList(type) {
    return async dispatch => {
        let result = await getUserList(type)
        // console.log(result)
        let { code, data } = result.data
        if (code === 0) {
            dispatch(getUserListSuccess(data))
        } else {
            dispatch(getUserListFailed('获取用户列表失败'))
        }
    }
}

// 退出登录操作
export function doLogout() {
    return dispatch => {
        dispatch(logoutSuccess('退出登录成功！'))
    }
}


//书写一个函数  目的是连接socket
function initIO(dispatch, userId) {
    //判断socket 有没有连接
    if (!io.socket) {
        //连接socket
        io.socket = io('ws://39.98.218.193:5000')
        //获取服务端返回的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            // console.log('客户端接收服务端返回的消息',chatMsg)
            // 只要是消息跟自己有关的
            if (userId === chatMsg.from || userId === chatMsg.to) {
                // 分发实时发送消息动作
                dispatch(receiveMsg(chatMsg, userId))
            }
        })
    }
}

// 发送消息
export function sendMsg({ from, to, content }) {
    return () => {
        initIO()
        // 向服务器发送消息
        io.socket.emit('sendMsg', { from, to, content })
    }
}


// 获取所有用户聊天列表
async function requestUserMsgList(dispatch, userId) {
    initIO(dispatch, userId)
    let responce = await getUserMsgList()
    let { code, data } = responce.data
    // 请求成功
    if (code === 0) {
        let { users, chatMsgs } = data
        dispatch(receiveMsgSucess({ users, chatMsgs, userId }))
    }
}


// 读取用户消息
export function getReadMsg(from, to) {
    return async dispatch => {
        let result = await readMsg(from)
        // 解构 code 和 data：未读消息数
        const { code, data } = result.data
        if (code === 0) {
            // 分发读取消息同步动作
            dispatch(readMsgs({ data, from, to }))
        }
    }
}

export const doUpdateResume = (data) =>({
    type: 'DO_UPDATE_RESUME',
    data
})

// 编辑简历
export function updateResume(users) {
    return async dispatch => {
        let res = await updateUserResume(users)
        let {code, data} = res.data
        if (code === 0) {
            dispatch(doUpdateResume(data))
        }
    }
}

export const updateCompanyAction = (data) => ({
    type: 'UPDATE_COMPANY_ACTION',
    data
})

// 更新公司招聘信息
export function updateCompanyInfo(data1) {
    return async dispatch => {
        let result = await updateCompany(data1)
        let { code, data } = result.data
        if (code === 0) {
            dispatch(updateCompanyAction(data))
        }
    }
}