import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import withTransition from './withTransition'

describe('withTransition', () => {
  let props
  let context
  let transitionConfig
  let BaseComponent
  let WrappedComponent

  beforeEach(() => {
    jest.clearAllMocks()
    const route = {}
    const TransitionGroup = ({ children }) => <div className="transition-group">{children}</div>
    TransitionGroup.propTypes = { children: PropTypes.node }

    props = {
      location: {
        key: 'first',
        pathname: '/first',
      },
      route,
      routes: [route],
    }

    context = {
      transitionRouter: {
        getLocationIndex: jest.fn(),
      },
    }

    BaseComponent = () => null
    transitionConfig = {
      TransitionGroup,
      onShow: jest.fn(),
      onDismiss: jest.fn(),
      defaultTransition: { transition: 'instant' },
    }

    WrappedComponent = withTransition(BaseComponent, transitionConfig)
  })

  describe('first render', () => {
    it('should use default transition', () => {
      const wrapper = shallow(<WrappedComponent {...props} />, { context })
      expect(wrapper.prop('location')).toBe(props.location)
      expect(wrapper.prop('route')).toBe(props.route)
      expect(wrapper.prop('routes')).toBe(props.routes)
      expect(wrapper.children().prop('transition')).toBe('instant')
    })
  })

  describe('after show', () => {
    it('should call hook if available', () => {
      const wrapper = shallow(<WrappedComponent {...props} />, { context })
      transitionConfig.onShow.mockImplementation((prevState, nextState, replaceTransition) => {
        replaceTransition({ transition: 'show' })
      })

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      }

      const nextProps = {
        ...props,
        location: nextLocation,
      }

      context.transitionRouter.getLocationIndex.mockImplementation((location) => {
        if (location === props.location) return 0
        if (location === nextLocation) return 1
        return null
      })

      wrapper.setProps(nextProps)

      expect(transitionConfig.onShow).toHaveBeenCalledTimes(1)
      expect(transitionConfig.onShow).toHaveBeenCalled()
      expect(transitionConfig.onShow).toHaveBeenCalledWith(props, nextProps, expect.any(Function))
      expect(wrapper.children().prop('transition')).toBe('show')
    })

    it('should use transition state', () => {
      const wrapper = shallow(<WrappedComponent {...props} />, { context })

      const nextLocation = {
        key: 'second',
        pathname: '/second',
        state: {
          showTransition: {
            transition: 'show-from-state',
          },
        },
      }

      const nextProps = {
        ...props,
        location: nextLocation,
      }

      context.transitionRouter.getLocationIndex.mockImplementation((location) => {
        if (location === props.location) return 1
        if (location === nextLocation) return 2
        return null
      })

      wrapper.setProps(nextProps)

      expect(wrapper.children().prop('transition')).toBe('show-from-state')
    })
  })

  describe('after dismiss', () => {
    it('should call hook if available', () => {
      const wrapper = shallow(<WrappedComponent {...props} />, { context })

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      }

      const nextProps = {
        ...props,
        location: nextLocation,
      }

      transitionConfig.onDismiss.mockImplementation((prevState, nextState, replaceTransition) => {
        replaceTransition({ transition: 'dismiss' })
      })

      context.transitionRouter.getLocationIndex.mockImplementation((location) => {
        if (location === props.location) return 2
        if (location === nextLocation) return 1
        return null
      })

      wrapper.setProps(nextProps)

      expect(transitionConfig.onDismiss).toHaveBeenCalledTimes(1)
      expect(transitionConfig.onDismiss).toHaveBeenCalledWith(props, nextProps, expect.any(Function))

      expect(wrapper.children().prop('transition')).toBe('dismiss')
    })

    it('should use transition state', () => {
      props.location.state = {
        dismissTransition: {
          transition: 'dismiss-from-state',
        },
      }

      const wrapper = shallow(<WrappedComponent {...props} />, { context })

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      }

      const nextProps = {
        ...props,
        location: nextLocation,
      }

      context.transitionRouter.getLocationIndex.mockImplementation((location) => {
        if (location === props.location) return 2
        if (location === nextLocation) return 1
        return null
      })

      wrapper.setProps(nextProps)

      expect(wrapper.children().prop('transition')).toBe('dismiss-from-state')
    })

    it('should use transition state even for multi depth level', () => {
      props.location.state = {
        dismissTransition: {
          transition: 'dismiss-from-state',
        },
      }

      const wrapper = shallow(<WrappedComponent {...props} />, { context })

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      }

      const nextProps = {
        ...props,
        location: nextLocation,
      }

      context.transitionRouter.getLocationIndex.mockImplementation((location) => {
        if (location === props.location) return 3
        if (location === nextLocation) return 1
        return null
      })

      wrapper.setProps(nextProps)

      expect(wrapper.children().prop('transition')).toBe('dismiss-from-state')
    })
  })
})
