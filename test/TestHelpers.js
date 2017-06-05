import React from 'react'
import { mount } from 'enzyme'

export const getChildContext = (Component, props) => {
  let context

  class ChildContextGetter extends React.Component {
    static contextTypes = Component.childContextTypes

    componentWillMount() {
      context = this.context
    }

    render() {
      return null
    }
  }

  const wrapper = mount(
    <Component {...props}>
      <ChildContextGetter />
    </Component>,
  )

  return { context, wrapper }
}
