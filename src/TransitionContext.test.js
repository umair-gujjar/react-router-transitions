import chai, {expect, assert} from 'chai';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import {jsdom} from 'jsdom';
import {getChildContext} from '../test/TestHelpers';
import TransitionContext from './TransitionContext';
import {PUSH} from './HistoryActions';
import {DISMISS} from './TransitionActions';

/**
 * Bootstrap the DOM environment in node
 */

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

chai
  .use(dirtyChai)
  .use(sinonChai);

describe('TransitionContext', () => {
  let props;

  beforeEach(() => {
    props = {
      location: {
        key: 'initial-location',
        state: {
          first: true,
        },
      },
      router: {
        go: spy(),
        push: spy(),
        replace: spy(),
      },
      transitionConfig: {
        defaultTransition: {
          transition: 'custom',
        },
      },
    };
  });

  describe('#config', () => {
    it('should be exposed in context', () => {
      props.transitionConfig = {foo: 'bar'};
      const {
        context: {
          transitionRouter: {
            config,
          },
        },
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
              getLocationIndex,
            },
          },
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
              getLocationIndex,
            },
          },
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
              getLocationIndex,
            },
          },
        } = getChildContext(TransitionContext, props);

        const secondLocation = {
          key: 'second-location',
          action: PUSH,
        };

        const thirdLocation = {
          key: 'third-location',
          action: PUSH,
        };

        wrapper.setProps({
          ...props,
          location: secondLocation,
        });

        wrapper.setProps({
          ...props,
          location: thirdLocation,
        });

        expect(
          getLocationIndex(secondLocation),
          `context.transitionRouter.getLocationIndex(secondLocation)
            should return secondLocation index (1)`,
        )
          .to.equal(1);

        expect(
          getLocationIndex(thirdLocation),
          `context.transitionRouter.getLocationIndex(thirdLocation
            should return thirdLocation index (2)`,
        )
          .to.equal(2);

        expect(
          getLocationIndex(),
          `context.transitionRouter.getLocationIndex()
            should last location index (2)`,
        )
          .to.equal(2);
      });
    });
  });

  describe('#dismiss', () => {
    describe('with an history of location', () => {
      it('should call router.go()', () => {
        const {
          wrapper,
          context: {
            transitionRouter: {
              dismiss,
            },
          },
        } = getChildContext(TransitionContext, props);

        const secondLocation = {
          key: 'second-location',
          action: PUSH,
        };

        wrapper.setProps({
          ...props,
          location: secondLocation,
        });

        dismiss();

        expect(props.router.go, 'props.router.go should be called once').to.be.calledOnce();
        assert.strictEqual(props.router.go.args[0][0], -1);
        assert.strictEqual(props.router.replace.callCount, 0, 'props.router.replace should not be called');
      });
    });

    describe('without an history of location', () => {
      it('should swap location with action DISMISS', done => {
        const {
          context: {
            transitionRouter: {
              dismiss,
            },
          },
        } = getChildContext(TransitionContext, props);

        dismiss();

        setTimeout(() => {
          expect(props.router.replace, 'props.router.replace should be called once').to.be.calledOnce();
          expect(props.router.replace, 'props.router.replace should be called with merged location')
            .to.be.calledWith({
              state: {
                first: true,
                transitionAction: DISMISS,
              },
            });
          assert.strictEqual(props.router.go.callCount, 0, 'props.router.go should not be called');
          done();
        }, 0);
      });
    });

    describe('depth option', () => {
      it('should call router.go() and swap location with action DISMISS', done => {
        const {
          wrapper,
          context: {
            transitionRouter: {
              dismiss,
            },
          },
        } = getChildContext(TransitionContext, props);

        const secondLocation = {
          key: 'second-location',
          action: PUSH,
        };

        wrapper.setProps({
          ...props,
          location: secondLocation,
        });

        dismiss('/', {
          depth: 2,
        });

        expect(props.router.go, 'props.router.go should be called once').to.be.calledOnce();
        assert.strictEqual(props.router.go.args[0][0], -1);

        setTimeout(() => {
          expect(props.router.replace, 'props.router.replace should be called once')
            .to.be.calledOnce();
          expect(props.router.replace, 'props.router.replace should be called with merged location')
            .to.be.calledWith({
              action: PUSH,
              pathname: '/',
              state: {
                transitionAction: DISMISS,
              },
            });
          done();
        }, 0);
      });
    });
  });

  describe('#show', () => {
    it('should call router.push()', () => {
      const {
        context: {
          transitionRouter: {
            show,
          },
        },
      } = getChildContext(TransitionContext, props);

      show('/new/location');

      expect(props.router.push, 'props.router.push should be called once')
        .to.be.calledOnce();
      expect(props.router.push, 'props.router.push should be called with location')
        .to.be.calledWith('/new/location');
    });
  });

  describe('#swap', () => {
    it('should merge and replace current location', () => {
      const {
        context: {
          transitionRouter: {
            swap,
          },
        },
      } = getChildContext(TransitionContext, props);

      swap('/new/location');

      expect(props.router.replace, 'props.router.replace should be called once')
        .to.be.calledOnce();
      expect(props.router.replace, 'props.router.replace should be called with merged location')
        .to.be.calledWith({
          pathname: '/new/location',
          state: {
            first: true,
          },
        });
    });
  });
});
