/* eslint-disable react/jsx-no-bind */
import React, {Component, PropTypes} from 'react';
import Screen from 'transitionGroup/Screen';

class Home extends Component {
  static contextTypes = {
    transitionRouter: PropTypes.object,
  };

  handleClick(route, event) {
    event.preventDefault();

    if (route === 'back') {
      this.context.transitionRouter.dismiss('/react-router-transitions');
    } else {
      this.context.transitionRouter.show(route);
    }
  }

  render() {
    return (
      <Screen name="B">
        Login
        <br />
        <br />
        <a onClick={this.handleClick.bind(this, 'back')}>Back</a>
        <a onClick={this.handleClick.bind(this, '/react-router-transitions/forgotten-password')}>Forgotten Password</a>
      </Screen>
    );
  }
}

export default Home;
