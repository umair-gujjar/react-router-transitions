/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { TransitionContext } from 'react-router-transitions'
import BasicTransitionGroup from 'react-router-transitions/BasicTransitionGroup'
import App from './App'

render(
  <BrowserRouter>
    <TransitionContext transitionConfig={{ TransitionGroup: BasicTransitionGroup }}>
      <App />
    </TransitionContext>
  </BrowserRouter>,
  document.getElementById('main'),
)
