/* eslint-disable react/jsx-no-bind */
import React, {Component, PropTypes} from 'react';
import Screen from 'transitionGroup/Screen';

class Home extends Component {
  static contextTypes = {
    transitionRouter: PropTypes.object,
  };

  handleClick(route, event) {
    event.preventDefault();
    this.context.transitionRouter.show(route);
  }

  render() {
    return (
      <Screen name="A">
        Home
        <br />
        <br />
        <a onClick={this.handleClick.bind(this, '/react-router-transitions/login')}>Login</a>
        <a onClick={this.handleClick.bind(this, '/react-router-transitions/search')}>Search</a>
      </Screen>
    );
  }
}

export default Home;
