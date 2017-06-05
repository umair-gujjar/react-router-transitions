/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components'
import { TransitionSwitch } from 'react-router-transitions'
import { Route } from 'react-router'
import Home from './demo/Home'
import Login from './demo/Login'
import ForgottenPassword from './demo/ForgottenPassword'
import Search from './demo/Search'

const Container = styled.div`
  width: 375px;
  height: 667px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
`

const Demo = () =>
  <Container>
    <TransitionSwitch>
      <Route exact path="/" component={Home} />
      <Route path="/login" transition="from-right" component={Login} />
      <Route path="/forgotten-password" transition="from-right" component={ForgottenPassword} />
      <Route path="/search" transition="from-bottom" component={Search} />
    </TransitionSwitch>
  </Container>

export default Demo
