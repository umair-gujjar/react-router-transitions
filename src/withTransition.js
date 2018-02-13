import React, {
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import {getRoutePath} from './RouterUtils';
import {SHOW, DISMISS} from './TransitionActions';
import {areTransitionsEnabled} from './activeState';

const defaultGetComponentKey = (child, {routes}) => {
  return getRoutePath(child.props.route, routes);
};

export default (Component, transitionConfig) => (
  class Transition extends React.Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
      children: PropTypes.node,
    };

    static contextTypes = {
      transitionRouter: PropTypes.object.isRequired,
    };

    componentWillMount() {
      this.config = {
        ...this.context.transitionRouter.config,
        ...transitionConfig,
      };
      this.state = {
        transition: this.config.defaultTransition,
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        transition: this.getTransition(this.props, nextProps),
      });
    }

    /**
     * Determine transition to apply.
     *
     * @param {object} props
     * @param {object} nextProps
     * @returns {object}
     */
    getTransition(props, nextProps) {
      if (!areTransitionsEnabled()) {
        return {transition: 'instant'};
      }

      const transitionType = this.getTransitionType(props.location, nextProps.location);
      switch (transitionType) {
        case SHOW:
          return this.getShowTransition(props, nextProps);
        case DISMISS:
          return this.getDismissTransition(props, nextProps);
        default:
          return this.config.defaultTransition;
      }
    }

    /**
     * Get show transition.
     * Retrieve transition from hook or from location state.
     *
     * @param {object} props
     * @param {object} nextProps
     */
    getShowTransition(props, nextProps) {
      const transition = this.callHook('onShow', props, nextProps);

      return transition
        || this.extractStateFromLocation(nextProps.location).showTransition;
    }

    /**
     * Get dismiss transition.
     * Retrieve transition from hook or from location state.
     *
     * @param {object} props
     * @param {object} nextProps
     */
    getDismissTransition(props, nextProps) {
      const transition = this.callHook('onDismiss', props, nextProps);

      return transition
        || this.extractStateFromLocation(props.location).dismissTransition;
    }

    /**
     * Call hook.
     *
     * @param {string} name
     * @param {object} props
     * @param {object} nextProps
     */
    callHook(name, props, nextProps) {
      let replaceTransition;

      function replace(transition) {
        replaceTransition = transition;
      }

      // Call hook if it's defined.
      if (this.config[name])
        this.config[name].call(this, props, nextProps, replace);

      return replaceTransition;
    }

    /**
     * Determine transition type to apply from current and nextLocation.
     *
     * @param {object} location
     * @param {object} nextLocation
     * @returns {string|null}
     */
    getTransitionType(location, nextLocation) {
      const {getLocationIndex} = this.context.transitionRouter;
      const locationIndex = getLocationIndex(location);
      const nextLocationIndex = getLocationIndex(nextLocation);

      // Custom action
      if (nextLocation.state && (
        nextLocation.state.transitionAction === SHOW
          || nextLocation.state.transitionAction === DISMISS
      )) {
        return nextLocation.state.transitionAction;
      }

      // Push
      if (locationIndex >= 0 && nextLocationIndex === locationIndex + 1) {
        return SHOW;
      }

      // Go back or explicit dismiss (first action on refresh)
      if (locationIndex >= 0 && nextLocationIndex <= locationIndex - 1) {
        return DISMISS;
      }

      return null;
    }

    /**
     * Extract state from location.
     *
     * @param {object} location
     * @returns {object}
     */
    extractStateFromLocation(location) {
      const {defaultTransition} = this.config;
      const {
        showTransition = defaultTransition,
        dismissTransition = defaultTransition,
      } = location.state || {};
      return {dismissTransition, showTransition};
    }

    render() {
      const {
        children,
        ...props
      } = this.props;

      const {
        TransitionGroup,
        getComponentKey = defaultGetComponentKey,
      } = this.config;

      return (
        <Component {...props}>
          <TransitionGroup {...this.state.transition}>
            {Children.map(children, child => (
              isValidElement(child)
                ? cloneElement(child, {key: getComponentKey(child, this.props)})
                : null
              ),
            )}
          </TransitionGroup>
        </Component>
      );
    }
  }
);
