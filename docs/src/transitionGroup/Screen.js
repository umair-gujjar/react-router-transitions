import React, {Component, PropTypes} from 'react';

const styles = {
  root: {
    color: '#fff',
    padding: 15,
  },
  A: {
    backgroundColor: '#FEA900',
  },
  B: {
    backgroundColor: '#B3DC4A',
  },
};

export default class Screen extends Component {
  static propTypes = {
    style: PropTypes.object,
    name: PropTypes.oneOf([
      'A',
      'B',
    ]),
    children: PropTypes.node,
  };

  render() {
    const {
      style: styleProps,
      name,
      children,
    } = this.props;

    const style = Object.assign({}, styleProps, styles.root, styles[name]);

    return (
      <div className="transition-group" style={style}>
        {children ? children : `Screen ${name}`}
      </div>
    );
  }
}
