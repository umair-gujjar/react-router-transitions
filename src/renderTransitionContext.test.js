import { shallow } from 'enzyme'
import renderTransitionContext from './renderTransitionContext'

describe('renderTransitionContext', () => {
  it('should render a TransitionContext', () => {
    const RouterContext = () => null
    const transitionContext = renderTransitionContext({
      RouterContext,
      otherConfigProp: true,
    })({
      location: {},
      router: {},
    })

    const wrapper = shallow(transitionContext)
    expect(wrapper.instance().props.transitionConfig).toEqual({ otherConfigProp: true })
    expect(wrapper.prop('router')).toEqual({})
    expect(wrapper.prop('location')).toEqual({})
    expect(wrapper.last().props()).toEqual({
      location: {},
      router: {},
    })
  })
})
