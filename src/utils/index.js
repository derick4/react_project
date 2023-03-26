/**
 * 
 * 该模块来控制注册成功后跳转到信息完善路由
 * type===dashen: 跳转到大神信息完善模块
 * type===laoban: 跳转到老板信息完善模块
 * 
 */
export function getRedirectPath(type) {
    let path;
    if (type === 'dashen') {
        path = '/dasheninfo'
    } else if (type === 'laoban') {
        path = '/laobaninfo'
    }
    return path
}