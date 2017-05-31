/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './Home'
import Login from './Login'
import ForgottenPassword from './ForgottenPassword'
import Search from './Search'

export default () => (
  <div>
    <h2>Simple demo</h2>
    <Switch>
      <Route exact path="" component={Home} />
      <Route path="login" component={Login} transition="from-right" />
      <Route path="forgotten-password" component={ForgottenPassword} transition="from-right" />
      <Route path="search" component={Search} transition="from-bottom" />
    </Switch>
  </div>
)
