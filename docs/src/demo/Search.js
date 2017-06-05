/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { withTransitionRouter, TransitionSwitch } from 'react-router-transitions'
import { Route } from 'react-router'
import styled from 'styled-components'
import Screen from './Screen'
import TitleBar from './TitleBar'
import Button from './Button'

const Banner = styled.div`
  background-color: ${props => props.color};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Red = () => <Banner color="red" />
const Green = () => <Banner color="green" />

const SearchContent = styled.div`
  height: 100px;
  position: relative;
  display: flex;
  overflow: hidden;
`

const Search = ({ match, transitionRouter }) =>
  <Screen>
    <TitleBar>Search</TitleBar>
    <SearchContent>
      <TransitionSwitch>
        <Route exact path={`${match.url}`} component={Red} transition="from-right" />
        <Route path={`${match.url}/green`} component={Green} transition="from-right" />
      </TransitionSwitch>
    </SearchContent>
    <Button onClick={() => transitionRouter.show('/search')}>Red</Button>
    <Button onClick={() => transitionRouter.show('/search/green')}>Green</Button>
    <Button onClick={() => transitionRouter.dismiss('/')}>Back</Button>
  </Screen>

export default withTransitionRouter(Search)
