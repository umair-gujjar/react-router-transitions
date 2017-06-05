/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { withTransitionRouter } from 'react-router-transitions'
import Screen from './Screen'
import TitleBar from './TitleBar'
import Button from './Button'

const Search = ({ transitionRouter }) =>
  <Screen>
    <TitleBar>Search</TitleBar>
    <Button onClick={() => transitionRouter.dismiss('/')}>Back</Button>
  </Screen>

export default withTransitionRouter(Search)
