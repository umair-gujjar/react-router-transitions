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

    if (route === 'back') {
      this.context.transitionRouter.dismiss('/react-router-transitions')
    } else {
      this.context.transitionRouter.show(route)
    }
  }

  render() {
    return (
      <Screen name="B">
        Login
        <br />
        <br />
        <a role="button" tabIndex="0" onClick={this.handleClick.bind(this, 'back')}>Back</a>
        <a
          role="button"
          tabIndex="0"
          onClick={this.handleClick.bind(this, '/react-router-transitions/forgotten-password')}
        >
          Forgotten Password
        </a>
      </Screen>
    )
  }
}

export default Home
