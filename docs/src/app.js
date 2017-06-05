/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Demo from './Demo'

/* eslint-disable no-unused-expressions */
injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`
/* eslint-enable no-unused-expressions */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.header`
  margin: 0;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #008DE0, #00B1EC);
  align-self: stretch;
  margin-bottom: 20px;
`

const H1 = styled.h1`
  font-size: 20px;
  margin: 0;
`

const Main = () =>
  <Container>
    <Header>
      <H1>
        React router transitions
      </H1>
    </Header>
    <Demo />
  </Container>

export default Main
