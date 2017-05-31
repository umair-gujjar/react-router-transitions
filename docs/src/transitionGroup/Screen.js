import React from 'react'
import PropTypes from 'prop-types'

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
}

export default class Screen extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    name: PropTypes.oneOf(['A', 'B']),
    children: PropTypes.node,
  }

  render() {
    const { style: styleProps, name, children } = this.props
    const style = Object.assign({}, styleProps, styles.root, styles[name])

    return (
      <div className="transition-group" style={style}>
        {children || `Screen ${name}`}
      </div>
    )
  }
}
