import ajax from './ajax'

// 注册接口
export const registerRequest = (username, password, type) => ajax('/register', {username, password, type}, 'POST')

// 登录接口
export const loginRequest = (username, password) => ajax('/login', {username, password}, 'POST')

// 完善用户信息
export const updateUser = (user) => ajax('/update', user, 'POST')

// 登录注册数据持久化
export const persistedUser = () => ajax('/user', 'GET')

// 获取用户列表userlist
export const getUserList = (type) => ajax('/userlist', { type },'GET')

// 获取所有用户消息列表
export const getUserMsgList = () => ajax('/msglist', "GET")

// 将未读消息转为已读
export const readMsg = (from) => ajax('/readmsg', { from }, "POST")

// 编辑用户简历
export const updateUserResume = (user) => ajax('/resume', user, 'POST')

// 更新公司招聘信息
export const updateCompany = (data) => ajax('/company', data, "POST")