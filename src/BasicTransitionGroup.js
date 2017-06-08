/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'

const zIndexBottom = 10
const zIndexTop = 20
const duration = 500 // iOS
const timingFunction = 'cubic-bezier(.36, .66, .04, 1)' // iOS

const viewShowFromLeftEnter = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const viewShowFromLeftLeave = keyframes`
  to {
    transform: translate3d(25%, 0, 0);
    opacity: .75;
  }
`

// From right
const viewShowFromRightEnter = keyframes`
  from {
    transform: translate3d(99%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const viewShowFromRightLeave = keyframes`
  to {
    transform: translate3d(-25%, 0, 0);
    opacity: .75;
  }
`

const viewShowFromTopEnter = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const viewShowFromBottomEnter = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const viewRevealFromLeftLeave = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
`

const viewRevealFromLeftEnter = keyframes`
  from {
    transform: translate3d(25%, 0, 0);

    opacity: .75;
  }

  to {
    transform: translate3d(0, 0, 0);

    opacity: 1;
  }
`

const viewRevealFromRightLeave = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
`

const viewRevealFromRightEnter = keyframes`
  from {
    transform: translate3d(-25%, 0, 0);

    opacity: .75;
  }

  to {
    transform: translate3d(0, 0, 0);

    opacity: 1;
  }
`

const viewRevealFromTopLeave = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, -100%, 0);
  }
`

const viewRevealFromBottomLeave = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, 100%, 0);
  }
`

const StyledCssTransitionGroup = styled(CSSTransitionGroup)`
  display: flex;
  overflow: hidden;
  flex: 1 0 0;

  .transition-group {
    z-index: ${zIndexTop};
    transform: translateZ(0);
    animation-fill-mode: forwards;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .transition-group-instant-leave {
    z-index: ${zIndexBottom};
  }

  .transition-group-show-from-bottom-leave,
  .transition-group-show-from-left-leave,
  .transition-group-show-from-right-leave,
  .transition-group-show-from-top-leave {
    z-index: ${zIndexBottom};
    pointer-events: none;
  }

  .transition-group-show-from-top-enter,
  .transition-group-show-from-right-enter,
  .transition-group-show-from-bottom-enter,
  .transition-group-show-from-left-enter {
    z-index: ${zIndexTop};
    visibility: hidden;
    pointer-events: none;
  }

  .transition-group-show-from-top-enter-active,
  .transition-group-show-from-right-enter-active,
  .transition-group-show-from-bottom-enter-active,
  .transition-group-show-from-left-enter-active {
    visibility: visible;
  }

  .transition-group-show-from-top-enter-active {
    animation-name: ${viewShowFromTopEnter};
  }

  .transition-group-show-from-right-enter-active {
    animation-name: ${viewShowFromRightEnter};
  }

  .transition-group-show-from-bottom-enter-active {
    animation-name: ${viewShowFromBottomEnter};
  }

  .transition-group-show-from-left-enter-active {
    animation-name: ${viewShowFromLeftEnter};
  }

  .transition-group-show-from-left-leave {
    animation-name: ${viewShowFromLeftLeave};
  }

  .transition-group-show-from-right-leave {
    animation-name: ${viewShowFromRightLeave};
  }

  .transition-group-show-from-top-enter-active,
  .transition-group-show-from-bottom-enter-active,
  .transition-group-show-from-left-enter-active,
  .transition-group-show-from-right-enter-active,
  .transition-group-show-from-left-leave,
  .transition-group-show-from-right-leave {
    animation-duration: ${duration}ms;
    animation-timing-function: ${timingFunction};
  }

  .transition-group-reveal-from-bottom-leave,
  .transition-group-reveal-from-left-leave,
  .transition-group-reveal-from-right-leave,
  .transition-group-reveal-from-top-leave {
    z-index: ${zIndexTop};
    pointer-events: none;
    user-select: none;
  }

  .transition-group-reveal-from-top-enter,
  .transition-group-reveal-from-right-enter,
  .transition-group-reveal-from-bottom-enter,
  .transition-group-reveal-from-left-enter {
    z-index: ${zIndexBottom};
    visibility: hidden;
    pointer-events: none;
  }

  .transition-group-reveal-from-top-enter-active,
  .transition-group-reveal-from-right-enter-active,
  .transition-group-reveal-from-bottom-enter-active,
  .transition-group-reveal-from-left-enter-active {
    visibility: visible;
  }

  .transition-group-reveal-from-top-leave {
    animation-name: ${viewRevealFromTopLeave};
  }

  .transition-group-reveal-from-right-leave {
    animation-name: ${viewRevealFromRightLeave};
  }

  .transition-group-reveal-from-bottom-leave {
    animation-name: ${viewRevealFromBottomLeave};
  }

  .transition-group-reveal-from-left-leave {
    animation-name: ${viewRevealFromLeftLeave};
  }

  .transition-group-reveal-from-left-enter-active {
    animation-name: ${viewRevealFromLeftEnter};
  }

  .transition-group-reveal-from-right-enter-active {
    animation-name: ${viewRevealFromRightEnter};
  }

  .transition-group-reveal-from-top-leave,
  .transition-group-reveal-from-right-leave,
  .transition-group-reveal-from-bottom-leave,
  .transition-group-reveal-from-left-leave,
  .transition-group-reveal-from-left-enter-active,
  .transition-group-reveal-from-right-enter-active {
    animation-duration: ${duration}ms;
    animation-timing-function: ${timingFunction};
  }
`

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
    return (
      <StyledCssTransitionGroup
        component="div"
        transitionName={`transition-group-${this.props.transition}`}
        transitionEnterTimeout={duration - 10}
        transitionLeaveTimeout={duration - 10}
      >
        {this.props.children}
      </StyledCssTransitionGroup>
    )
  }
}
