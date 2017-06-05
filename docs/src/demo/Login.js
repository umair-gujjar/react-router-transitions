import React from 'react'
import { withTransitionRouter } from 'react-router-transitions'
import Screen from './Screen'
import TitleBar from './TitleBar'
import Button from './Button'

const Login = ({ transitionRouter }) =>
  <Screen>
    <TitleBar>Login</TitleBar>
    <Button onClick={() => transitionRouter.show('/forgotten-password')}>Forgotten password?</Button>
    <Button onClick={() => transitionRouter.dismiss('/')}>Back</Button>
  </Screen>

export default withTransitionRouter(Login)
