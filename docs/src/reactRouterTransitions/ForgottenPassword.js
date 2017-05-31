/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Screen from '../transitionGroup/Screen'

class Home extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  handleClick(route, event) {
    event.preventDefault()

    if (route === 'back') {
      this.props.router.goBack()
    }
  }

  render() {
    return (
      <Screen name="A">
        Forgotten password
        <br />
        <br />
        <a onClick={this.handleClick.bind(this, 'back')} role="button" tabIndex="0">Back</a>
      </Screen>
    )
  }
}

export default withRouter(Home)
