/* eslint-disable react/jsx-no-bind */
import React, {Component} from 'react';
import Screen from 'transitionGroup/Screen';
import TransitionGroup from 'transitionGroup/TransitionGroupCSS';
// import TransitionGroup from 'transitionGroup/TransitionGroupMotion';
import 'transitionGroup/TransitionGroup.scss';

export default class Page extends Component {
  state = {
    screen: 'A',
    transition: 'show-from-right',
  };

  handleClick(screen, transition, event) {
    event.preventDefault();

    this.setState({
      screen,
      transition,
    });
  }

  render() {
    const {
      screen,
      transition,
    } = this.state;

    return (
      <div>
        <ul>
          <li>
            <a onClick={this.handleClick.bind(this, 'A', 'reveal-from-right')}>
              Screen A
            </a>
          </li>
          <li>
            <a onClick={this.handleClick.bind(this, 'B', 'show-from-right')}>
              Screen B
            </a>
          </li>
        </ul>

        <TransitionGroup transition={transition}>
          {screen === 'A'
            ? <Screen name="A" key="A" />
            : <Screen name="B" key="B" />
          }
        </TransitionGroup>

      </div>
    );
  }
}
