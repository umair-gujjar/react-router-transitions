import React from 'react'
import TransitionContext from './TransitionContext'

const renderTransitionContext = contextConfig => (props) => {
  const { RouterContext, ...transitionConfig } = contextConfig
  return (
    <TransitionContext {...{ transitionConfig, ...props }}>
      <RouterContext {...props} />
    </TransitionContext>
  )
}

export default renderTransitionContext
