/* eslint react/no-multi-comp:  0 */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import * as PrefixHooks from './PrefixHooks'
import { createLocation, mergeLocations } from './LocationUtils'
import { PUSH, REPLACE } from './HistoryActions'
import { DISMISS } from './TransitionActions'

/**
 * TransitionContext used to share global methods accross
 * all the application.
 * This context is designed to be rendered just before the RouterContext.
 */
class TransitionContext extends React.Component {
  static propTypes = {
    transitionConfig: PropTypes.shape({
      defaultTransition: PropTypes.object,
      TransitionGroup: PropTypes.func,
      onShow: PropTypes.func,
      onDismiss: PropTypes.func,
      getComponentKey: PropTypes.func,
    }).isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    transitionRouter: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      transitionRouter: {
        config: {
          ...PrefixHooks,
          ...this.props.transitionConfig,
        },
        dismiss: this.dismiss.bind(this),
        show: this.show.bind(this),
        swap: this.swap.bind(this),
        getLocationIndex: this.getLocationIndex.bind(this),
      },
    }
  }

  componentWillMount() {
    // Keep an history of all keys to be able to determine if we go forward
    // or backward in the history
    this.locationHistory = [this.props.location]
  }

  componentWillReceiveProps(nextProps) {
    const { location: nextLocation, history: nextHistory } = nextProps
    const locationIndex = this.getLocationIndex()

    if (nextHistory.action === PUSH) {
      this.locationHistory = [...this.locationHistory.slice(0, locationIndex + 1), nextLocation]
    } else if (nextHistory.action === REPLACE) {
      this.locationHistory[locationIndex] = nextLocation
    }
  }

  /**
   * Dismiss current location.
   * By default it's a goBack, we use the location only if we don't have
   * any history.
   *
   * @param {object} location
   */
  dismiss(location) {
    location = createLocation(location)
    const goBackDepth = this.locationHistory.reverse().findIndex(({ pathname }) => pathname === location.pathname)
    if (goBackDepth > 0) {
      this.props.history.go(-goBackDepth)
    } else {
      setTimeout(() => this.swap(location, DISMISS), 0)
    }
  }

  /**
   * Show a location.
   * It's basically a simple push.
   *
   * @param {object} location
   */
  show(location) {
    this.props.history.push(location)
  }

  /**
   * Swap to a location.
   * Location are merged and the current location is replaced by the new one.
   *
   * @param {object} location
   * @param {string} transitionAction
   */
  swap(location, transitionAction) {
    location = createLocation(location)
    location = mergeLocations(this.props.location, location)

    if (transitionAction) {
      location.state = {
        ...location.state,
        transitionAction,
      }
    }

    delete location.key

    this.props.history.replace(location)
  }

  /**
   * Returns the index of a location.
   * By default it will return the index of the current location.
   *
   * @param {object} [location=this.props.location]
   */
  getLocationIndex(location = this.props.location) {
    return this.locationHistory.findIndex(({ key }) => key === location.key)
  }

  render() {
    return this.props.children
  }
}

export default withRouter(TransitionContext)
