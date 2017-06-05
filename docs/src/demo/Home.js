/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { withTransitionRouter } from 'react-router-transitions'
import TitleBar from './TitleBar'
import Button from './Button'
import Screen from './Screen'

const Home = ({ transitionRouter }) =>
  <Screen>
    <TitleBar>Home</TitleBar>
    <Button onClick={() => transitionRouter.show('/login')}>Login</Button>
    <Button onClick={() => transitionRouter.show('/search')}>Search</Button>
  </Screen>

export default withTransitionRouter(Home)
