import jsdom from 'mocha-jsdom';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {getChildContext} from './TestHelpers';
import TransitionContext from '../src/TransitionContext';
import {PUSH} from '../src/HistoryActions';
import {DISMISS} from '../src/TransitionActions';

chai.use(sinonChai);

describe('TransitionContext', () => {
  let props;

  jsdom();

  beforeEach(() => {
    props = {
      location: {
        key: 'initial-location',
        state: {
          first: true
        }
      },
      router: {
        goBack: sinon.spy(),
        push: sinon.spy(),
        replace: sinon.spy()
      },
      transitionConfig: {
        defaultTransition: {
          transition: 'custom'
        }
      }
    };
  });

  describe('#config', () => {
    it('should be exposed in context', () => {
      props.transitionConfig = {foo: 'bar'};
      const {
        context: {
          transitionRouter: {
            config
          }
        }
      } = getChildContext(TransitionContext, props);
      expect(config, 'context.transitionRouter.config should be equal to props.config')
        .to.eql({foo: 'bar'});
    });
  });

  describe('#getLocationIndex', () => {
    describe('without location', () => {
      it('should return 0', () => {
        const {
          context: {
            transitionRouter: {
              getLocationIndex
            }
          }
        } = getChildContext(TransitionContext, props);
        expect(getLocationIndex(), 'context.transitionRouter.getLocationIndex() should return 0')
          .to.equal(0);
      });
    });

    describe('with an unknown location', () => {
      it('should return -1', () => {
        const {
          context: {
            transitionRouter: {
              getLocationIndex
            }
          }
        } = getChildContext(TransitionContext, props);
        expect(getLocationIndex({}), 'context.transitionRouter.getLocationIndex() should return -1')
          .to.equal(-1);
      });
    });

    describe('with an history of locations', () => {
      it('should return location position in history', () => {
        const {
          wrapper,
          context: {
            transitionRouter: {
              getLocationIndex
            }
          }
        } = getChildContext(TransitionContext, props);

        const secondLocation = {
          key: 'second-location',
          action: PUSH
        };

        const thirdLocation = {
          key: 'third-location',
          action: PUSH
        };

        wrapper.setProps({
          ...props,
          location: secondLocation
        });

        wrapper.setProps({
          ...props,
          location: thirdLocation
        });

        expect(
          getLocationIndex(secondLocation),
          `context.transitionRouter.getLocationIndex(secondLocation)
            should return secondLocation index (1)`
        )
          .to.equal(1);

        expect(
          getLocationIndex(thirdLocation),
          `context.transitionRouter.getLocationIndex(thirdLocation
            should return thirdLocation index (2)`
        )
          .to.equal(2);

        expect(
          getLocationIndex(),
          `context.transitionRouter.getLocationIndex()
            should last location index (2)`
        )
          .to.equal(2);
      });
    });
  });

  describe('#dismiss', () => {
    describe('with an history of location', () => {
      it('should call router.goBack()', () => {
        const {
          wrapper,
          context: {
            transitionRouter: {
              dismiss
            }
          }
        } = getChildContext(TransitionContext, props);

        const secondLocation = {
          key: 'second-location',
          action: PUSH
        };

        wrapper.setProps({
          ...props,
          location: secondLocation
        });

        dismiss();

        expect(props.router.goBack, 'props.router.goBack should be called once')
          .to.be.calledOnce;
      });
    });

    describe('without an history of location', () => {
      it('should swap location with action DISMISS', () => {
        const {
          context: {
            transitionRouter: {
              dismiss
            }
          }
        } = getChildContext(TransitionContext, props);

        dismiss();

        expect(props.router.replace, 'props.router.replace should be called once')
          .to.be.calledOnce;
        expect(props.router.replace, 'props.router.replace should be called with merged location')
          .to.be.calledWith({
            state: {
              first: true,
              transitionAction: DISMISS
            }
          });
      });
    });
  });

  describe('#show', () => {
    it('should call router.push()', () => {
      const {
        context: {
          transitionRouter: {
            show
          }
        }
      } = getChildContext(TransitionContext, props);

      show('/new/location');

      expect(props.router.push, 'props.router.push should be called once')
        .to.be.calledOnce;
      expect(props.router.push, 'props.router.push should be called with location')
        .to.be.calledWith('/new/location');
    });
  });

  describe('#swap', () => {
    it('should merge and replace current location', () => {
      const {
        context: {
          transitionRouter: {
            swap
          }
        }
      } = getChildContext(TransitionContext, props);

      swap('/new/location');

      expect(props.router.replace, 'props.router.replace should be called once')
        .to.be.calledOnce;
      expect(props.router.replace, 'props.router.replace should be called with merged location')
        .to.be.calledWith({
          pathname: '/new/location',
          state: {
            first: true
          }
        });
    });
  });
});
