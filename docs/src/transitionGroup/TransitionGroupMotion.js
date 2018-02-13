import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion, spring} from 'react-motion';

const slideConfig = {
  stiffness: 390,
  damping: 30,
};

const transitions = {
  'show-from-right': {
    atEnter: {
      opacity: 0,
      offset: 100,
    },
    atLeave: {
      opacity: spring(0, slideConfig),
      offset: spring(-100, slideConfig),
    },
    atActive: {
      opacity: spring(1, slideConfig),
      offset: spring(0, slideConfig),
    },
    mapStyles(styles) {
      return {
        opacity: styles.opacity,
        transform: `translateX(${styles.offset}%)`,
      };
    },
  },
  'reveal-from-right': {
    atEnter: {
      opacity: 0,
      offset: -100,
    },
    atLeave: {
      opacity: spring(0, slideConfig),
      offset: spring(100, slideConfig),
    },
    atActive: {
      opacity: spring(1, slideConfig),
      offset: spring(0, slideConfig),
    },
    mapStyles(styles) {
      return {
        opacity: styles.opacity,
        transform: `translateX(${styles.offset}%)`,
      };
    },
  },
};

export default class TransitionGroupMotion extends Component {
  static propTypes = {
    children: PropTypes.node,
    transition: PropTypes.oneOf([
      'show-from-right',
      'reveal-from-right',
    ]).isRequired,
  };

  willEnter = () => {
    return transitions[this.props.transition].atEnter;
  };

  willLeave = () => {
    return transitions[this.props.transition].atLeave;
  };

  getStyles() {
    if (!this.props.children) {
      return [];
    }

    return [{
      key: this.props.children.props.name,
      data: this.props.children,
      style: transitions[this.props.transition].atActive,
    }];
  }

  render() {
    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={this.getStyles()}
      >
        {interpolatedStyles => (
          <div className="transition-group-container">
            {interpolatedStyles.map(config => {
              const props = {
                style: transitions[this.props.transition]
                  .mapStyles(config.style),
                key: config.key,
              };

              return cloneElement(config.data, props);
            })}
          </div>
        )}
      </TransitionMotion>
    );
  }
}
