/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

export default class TransitionGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    transition: PropTypes.oneOf([
      'instant',
      'show-from-bottom',
      'reveal-from-bottom',
      'show-from-right',
      'reveal-from-right',
    ]).isRequired,
  }

  static defaultProps = {
    transition: 'instant',
  }

  render() {
    const { transition, children } = this.props

    return (
      <CSSTransitionGroup
        component="div"
        className="transition-group-container"
        transitionName={`transition-group-${transition}`}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {children}
      </CSSTransitionGroup>
    )
  }
}
