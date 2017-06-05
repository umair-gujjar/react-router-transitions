import { getChildContext } from '../test/TestHelpers'
import TransitionContext from './TransitionContext'
import { PUSH } from './HistoryActions'
import { DISMISS } from './TransitionActions'

describe('TransitionContext', () => {
  let props

  beforeEach(() => {
    props = {
      location: {
        key: 'initial-location',
        state: {
          first: true,
        },
      },
      router: {
        go: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      },
      transitionConfig: {
        defaultTransition: {
          transition: 'custom',
        },
      },
    }
  })

  describe('#config', () => {
    it('should be exposed in context', () => {
      props.transitionConfig = { foo: 'bar' }
      const { context: { transitionRouter: { config } } } = getChildContext(TransitionContext, props)
      expect(config).toEqual({ foo: 'bar' })
    })
  })

  describe('#getLocationIndex', () => {
    describe('without location', () => {
      it('should return 0', () => {
        const { context: { transitionRouter: { getLocationIndex } } } = getChildContext(TransitionContext, props)
        expect(getLocationIndex()).toBe(0)
      })
    })

    describe('with an unknown location', () => {
      it('should return -1', () => {
        const { context: { transitionRouter: { getLocationIndex } } } = getChildContext(TransitionContext, props)
        expect(getLocationIndex({})).toBe(-1)
      })
    })

    describe('with an history of locations', () => {
      it('should return location position in history', () => {
        const { wrapper, context: { transitionRouter: { getLocationIndex } } } = getChildContext(TransitionContext, props)

        const secondLocation = {
          key: 'second-location',
          action: PUSH,
        }

        const thirdLocation = {
          key: 'third-location',
          action: PUSH,
        }

        wrapper.setProps({
          ...props,
          location: secondLocation,
        })

        wrapper.setProps({
          ...props,
          location: thirdLocation,
        })

        expect(getLocationIndex(secondLocation)).toBe(1)
        expect(getLocationIndex(thirdLocation)).toBe(2)
        expect(getLocationIndex()).toBe(2)
      })
    })
  })

  describe('#dismiss', () => {
    describe('with an history of location', () => {
      it('should call router.go()', () => {
        const { wrapper, context: { transitionRouter: { dismiss } } } = getChildContext(TransitionContext, props)

        const secondLocation = {
          key: 'second-location',
          action: PUSH,
        }

        wrapper.setProps({
          ...props,
          location: secondLocation,
        })

        dismiss()

        expect(props.router.go).toHaveBeenCalledTimes(1)
        expect(props.router.go).toHaveBeenCalledWith(-1)
        expect(props.router.replace).not.toHaveBeenCalled()
      })
    })

    describe('without an history of location', () => {
      it('should swap location with action DISMISS', async () => {
        const { context: { transitionRouter: { dismiss } } } = getChildContext(TransitionContext, props)

        dismiss()

        await new Promise(resolve => setTimeout(resolve))

        expect(props.router.replace).toHaveBeenCalledTimes(1)
        expect(props.router.replace).toHaveBeenCalledWith({
          state: {
            first: true,
            transitionAction: DISMISS,
          },
        })
        expect(props.router.go).not.toHaveBeenCalled()
      })
    })

    describe('depth option', () => {
      it('should call router.go() and swap location with action DISMISS', async () => {
        const { wrapper, context: { transitionRouter: { dismiss } } } = getChildContext(TransitionContext, props)

        const secondLocation = {
          key: 'second-location',
          action: PUSH,
        }

        wrapper.setProps({
          ...props,
          location: secondLocation,
        })

        dismiss('/', {
          depth: 2,
        })

        expect(props.router.go).toHaveBeenCalledTimes(1)
        expect(props.router.go).toHaveBeenCalledWith(-1)

        await new Promise(resolve => setTimeout(resolve))

        expect(props.router.replace).toHaveBeenCalledTimes(1)
        expect(props.router.replace).toHaveBeenCalledWith({
          action: PUSH,
          pathname: '/',
          state: {
            transitionAction: DISMISS,
          },
        })
      })
    })
  })

  describe('#show', () => {
    it('should call router.push()', () => {
      const { context: { transitionRouter: { show } } } = getChildContext(TransitionContext, props)

      show('/new/location')

      expect(props.router.push).toHaveBeenCalledTimes(1)
      expect(props.router.push).toHaveBeenCalledWith('/new/location')
    })
  })

  describe('#swap', () => {
    it('should merge and replace current location', () => {
      const { context: { transitionRouter: { swap } } } = getChildContext(TransitionContext, props)

      swap('/new/location')

      expect(props.router.replace).toHaveBeenCalledTimes(1)
      expect(props.router.replace).toHaveBeenCalledWith({
        pathname: '/new/location',
        state: {
          first: true,
        },
      })
    })
  })
})
