/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import Screen from '../transitionGroup/Screen'

class Home extends React.Component {
  static contextTypes = {
    transitionRouter: PropTypes.object,
  }

  handleClick(route, event) {
    event.preventDefault()
    this.context.transitionRouter.show(route)
  }

  render() {
    return (
      <Screen name="A">
        Home
        <br />
        <br />
        <a role="button" tabIndex="0" onClick={this.handleClick.bind(this, '/react-router-transitions/login')}>Login</a>
        <a role="button" tabIndex="0" onClick={this.handleClick.bind(this, '/react-router-transitions/search')}>
          Search
        </a>
      </Screen>
    )
  }
}

export default Home
