import React from 'react'
import PropTypes from 'prop-types'

const withTransitionRouter = Component =>
  class WithTransitionRouter extends React.Component {
    static contextTypes = {
      transitionRouter: PropTypes.object,
    }

    render() {
      return <Component transitionRouter={this.context.transitionRouter} {...this.props} />
    }
  }

export default withTransitionRouter
