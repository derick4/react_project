import React, { Component } from 'react'

// 导入路由组件
import Login from './views/login/Login'
import Register from './views/register/Register'
import Main from './views/main/Main'

import { Switch, Route } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    )
  }
}

