import { Route, Switch } from 'react-router'
import React from 'react'
import Main from './Main'
import TransitionGroupPage from './transitionGroup/Page'
import ReactRouterTransitionsPage from './reactRouterTransitions/Page'

export default (
  <div>
    <Route exact path="/" component={Main} />
    <Route path="/transition-group" component={TransitionGroupPage} />
    <Route path="/react-router-transitions" component={ReactRouterTransitionsPage} />
  </div>
)
