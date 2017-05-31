/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { withRouter } from 'react-router'
import { TransitionContext } from '../../src'
import TransitionGroup from './transitionGroup/TransitionGroupCSS'
import routes from './routes'
import './transitionGroup/TransitionGroup.scss'
import './normalize.scss'
import './stylesheet.scss'

function onShow(prevState, nextState, replace) {
  if (nextState.location.state && nextState.location.state.showTransition) {
    return
  }

  let transition
  const nextStateTransition = nextState.children.props.route.transition

  if (nextStateTransition) {
    transition = `show-${nextStateTransition}`
  }

  if (transition) {
    replace({ transition })
  }
}

function onDismiss(prevState, nextState, replace) {
  if (prevState.location.state && prevState.location.state.dismissTransition) {
    return
  }

  let transition
  const prevStateTransition = prevState.children.props.route.transition

  if (prevStateTransition) {
    transition = `reveal-${prevStateTransition}`
  }

  if (transition) {
    replace({ transition })
  }
}

const TransitionContextWithRouter = withRouter(TransitionContext)

render(
  <HashRouter>
    <TransitionContextWithRouter
      transitionConfig={{
        TransitionGroup,
        onShow,
        onDismiss,
      }}
    >
      {routes}
    </TransitionContextWithRouter>
  </HashRouter>,
  document.getElementById('main'),
)
