import {
  Route,
  IndexRoute,
} from 'react-router';
import React from 'react';

import Main from 'Main';
import TransitionGroupPage from 'transitionGroup/Page';
import reactRouterTransitionsPage from 'reactRouterTransitions/Page';
import reactRouterTransitionsHome from 'reactRouterTransitions/Home';
import reactRouterTransitionsLogin from 'reactRouterTransitions/Login';
import reactRouterTransitionsForgottenPassword from 'reactRouterTransitions/ForgottenPassword';
import reactRouterTransitionsSearch from 'reactRouterTransitions/Search';
import {withTransition} from 'react-router-transitions';

export default (
  <Route path="/">
    <Route path="transition-group" component={TransitionGroupPage} />
    <IndexRoute component={Main} />
    <Route
      path="react-router-transitions"
      component={withTransition(reactRouterTransitionsPage)}
    >
      <IndexRoute component={reactRouterTransitionsHome} />
      <Route
        path="login"
        component={reactRouterTransitionsLogin}
        transition="from-right"
      />
      <Route
        path="forgotten-password"
        component={reactRouterTransitionsForgottenPassword}
        transition="from-right"
      />
      <Route
        path="search"
        component={reactRouterTransitionsSearch}
        transition="from-bottom"
      />
    </Route>
  </Route>
);
