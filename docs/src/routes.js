import { Route, Switch } from 'react-router'
import React from 'react'

import Main from './Main'
import TransitionGroupPage from './transitionGroup/Page'
import reactRouterTransitionsPage from './reactRouterTransitions/Page'
import { withTransition } from '../../src'

const BaseRoute = () => (
  <Switch>
    <Route path="transition-group" component={TransitionGroupPage} />
    <Route exact path="" component={Main} />
    <Route path="react-router-transitions" component={withTransition(reactRouterTransitionsPage)} />
  </Switch>
)

export default <Route path="/" component={BaseRoute} />
