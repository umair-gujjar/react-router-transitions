/* eslint-disable react/jsx-no-bind */
import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        <h2>Simple demo</h2>
        {children}
      </div>
    );
  }
}
