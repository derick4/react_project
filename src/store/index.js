// 应用中间件函数
import { createStore, applyMiddleware } from 'redux'
// redux 调试工具
import {composeWithDevTools } from 'redux-devtools-extension'
// 异步插件
import thunk from 'redux-thunk'

import reducers from './reducers'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store