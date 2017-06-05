import React from 'react'
import { matchPath } from 'react-router'

export function onShow(prevState, nextState, replace) {
  if (nextState.location.state && nextState.location.state.showTransition) return

  const child = React.Children
    .toArray(nextState.children)
    .find(child => matchPath(nextState.location.pathname, child.props))

  if (child && child.props.transition) replace({ transition: `show-${child.props.transition}` })
}

export function onDismiss(prevState, nextState, replace) {
  if (prevState.location.state && prevState.location.state.dismissTransition) return

  const child = React.Children
    .toArray(prevState.children)
    .find(child => matchPath(prevState.location.pathname, child.props))

  if (child && child.props.transition) replace({ transition: `reveal-${child.props.transition}` })
}
