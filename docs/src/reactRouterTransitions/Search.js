/* eslint-disable react/jsx-no-bind */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Screen from 'transitionGroup/Screen';

class Home extends Component {
  static contextTypes = {
    transitionRouter: PropTypes.object,
  };

  handleClick(route, event) {
    event.preventDefault();

    if (route === 'back') {
      this.context.transitionRouter.dismiss('/react-router-transitions');
    }
  }

  render() {
    return (
      <Screen name="B">
        Search
        <br />
        <br />
        <a onClick={this.handleClick.bind(this, 'back')}>Back</a>
      </Screen>
    );
  }
}

export default Home;
