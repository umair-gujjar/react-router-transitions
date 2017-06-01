/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Route, Switch, withRouter } from 'react-router'
import Home from './Home'
import Login from './Login'
import ForgottenPassword from './ForgottenPassword'
import Search from './Search'
import TransitionSwitch from '../../../src/TransitionSwitch'

export default ({ match }) => (
  <div>
    <h2>Simple demo</h2>
    <TransitionSwitch>
      <Route exact path={`${match.url}/`} component={Home} />
      <Route path={`${match.url}/login`} render={props => <Login {...props} transition="from-right" />} />
      <Route
        path={`${match.url}/forgotten-password`}
        render={props => <ForgottenPassword {...props} transition="from-right" />}
      />
      <Route path={`${match.url}/search`} render={props => <Search {...props} transition="from-bottom" />} />
    </TransitionSwitch>
  </div>
)
