/* eslint-disable react/jsx-no-bind */
import React, {
  PropTypes,
  Component,
} from 'react';

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
