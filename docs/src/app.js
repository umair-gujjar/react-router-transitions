import React from 'react';
import {render} from 'react-dom';
import {hashHistory, RouterContext, Router} from 'react-router';
import {renderTransitionContext} from 'react-router-transitions';
import TransitionGroup from 'transitionGroup/TransitionGroupCSS';
import 'transitionGroup/TransitionGroup.scss';

import routes from 'routes';
import 'normalize.scss';
import 'stylesheet.scss';

function onShow(prevState, nextState, replace) {
  if (nextState.location.state && nextState.location.state.showTransition) {
    return;
  }

  let transition;
  const nextStateTransition = nextState.children.props.route.transition;

  if (nextStateTransition) {
    transition = `show-${nextStateTransition}`;
  }

  if (transition) {
    replace({transition});
  }
}

function onDismiss(prevState, nextState, replace) {
  if (prevState.location.state && prevState.location.state.dismissTransition) {
    return;
  }

  let transition;
  const prevStateTransition = prevState.children.props.route.transition;

  if (prevStateTransition) {
    transition = `reveal-${prevStateTransition}`;
  }

  if (transition) {
    replace({transition});
  }
}

render(
  <Router
    history={hashHistory}
    render={renderTransitionContext({
      RouterContext,
      TransitionGroup,
      onShow,
      onDismiss,
    })}
  >
    {routes}
  </Router>
, document.getElementById('main'));
