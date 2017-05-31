/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import Screen from '../transitionGroup/Screen'

class Home extends React.Component {
  static contextTypes = {
    transitionRouter: PropTypes.object,
  }

  handleClick = (route, event) => {
    event.preventDefault()
    this.context.transitionRouter.dismiss('/react-router-transitions')
  }

  render() {
    return (
      <Screen name="B">
        Search
        <br />
        <br />
        <a role="button" tabIndex="0" onClick={this.handleClick}>Back</a>
      </Screen>
    )
  }
}

export default Home
