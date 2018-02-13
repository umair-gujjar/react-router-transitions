/* eslint-disable react/jsx-no-bind */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Screen from 'transitionGroup/Screen';
import {withRouter} from 'react-router';

class Home extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  handleClick(route, event) {
    event.preventDefault();

    if (route === 'back') {
      this.props.router.goBack();
    }
  }

  render() {
    return (
      <Screen name="A">
        Forgotten password
        <br />
        <br />
        <a onClick={this.handleClick.bind(this, 'back')}>Back</a>
      </Screen>
    );
  }
}

export default withRouter(Home);
