import React, {PropTypes, Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TransitionGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    transition: PropTypes.oneOf([
      'instant',
      'show-from-bottom',
      'reveal-from-bottom',
      'show-from-right',
      'reveal-from-right',
    ]).isRequired,
  };

  static defaultProps = {
    transition: 'instant',
  };

  render() {
    const {
      transition,
      children,
    } = this.props;

    return (
      <ReactCSSTransitionGroup
        component="div"
        className="transition-group-container"
        transitionName={`transition-group-${transition}`}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {children}
      </ReactCSSTransitionGroup>
    );
  }
}
