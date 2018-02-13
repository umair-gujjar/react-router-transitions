import React from 'react';
import PropTypes from 'prop-types';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import withTransition from './withTransition';
import {disableTransitions, enableTransitions} from './activeState';

chai
  .use(dirtyChai)
  .use(sinonChai);

describe('withTransition', () => {
  let props, context, transitionConfig, BaseComponent, WrappedComponent;

  beforeEach(() => {
    const route = {};

    const TransitionGroup = ({children}) => <div className="transition-group">{children}</div>;

    TransitionGroup.propTypes = {children: PropTypes.node};

    props = {
      location: {
        key: 'first',
        pathname: '/first',
      },
      route,
      routes: [route],
    };

    context = {
      transitionRouter: {
        getLocationIndex: sinon.stub(),
      },
    };

    BaseComponent = () => null;
    transitionConfig = {
      TransitionGroup,
      onShow: sinon.stub(),
      onDismiss: sinon.stub(),
      defaultTransition: {transition: 'my-default'},
    };

    WrappedComponent = withTransition(BaseComponent, transitionConfig);
  });

  describe('first render', () => {
    it('should use default transition', () => {
      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});
      expect(
        wrapper.props(),
        'component should get parent properties',
      ).to.have.property('location', props.location);

      expect(
        wrapper.props(),
        'component should get parent properties',
      ).to.have.property('route', props.route);

      expect(
        wrapper.props(),
        'component should get parent properties',
      ).to.have.property('routes', props.routes);

      expect(
        wrapper.children().props(),
        'transition group should get default transition',
      ).to.have.property('transition', 'my-default');
    });
  });

  describe('with state disabled', () => {
    beforeEach(() => {
      disableTransitions();
    });
    afterEach(() => {
      enableTransitions();
    });
    it('should render the transition group with instant transition', () => {
      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});
      const nextLocation = {key: 'second', pathname: '/second'};
      const nextProps = {...props, location: nextLocation};
      wrapper.setProps(nextProps);
      expect(wrapper.children().props()).to.have.property('transition', 'instant');
    });
  });

  describe('after show', () => {
    it('should call hook if available', () => {
      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});

      transitionConfig.onShow.callsArgWith(2, {
        transition: 'show',
      });

      context.transitionRouter.getLocationIndex.withArgs(props.location).returns(0);

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      };

      const nextProps = {
        ...props,
        location: nextLocation,
      };

      context.transitionRouter.getLocationIndex.withArgs(nextLocation).returns(1);

      wrapper.setProps(nextProps);

      expect(
        transitionConfig.onShow,
        'onShow hook should be called once',
      ).to.be.calledOnce();

      expect(
        transitionConfig.onShow,
        'onShow hook should be called with instance as this',
      ).to.be.calledOn(wrapper.instance());

      expect(
        transitionConfig.onShow,
        'onShow hook should be called with props',
      ).to.be.calledWith(props, nextProps);

      expect(
        wrapper.children().props(),
        'transition group should get "show" transition',
      ).to.have.property('transition', 'show');
    });

    it('should use transition state', () => {
      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});

      context.transitionRouter.getLocationIndex.withArgs(props.location).returns(1);

      const nextLocation = {
        key: 'second',
        pathname: '/second',
        state: {
          showTransition: {
            transition: 'show-from-state',
          },
        },
      };

      const nextProps = {
        ...props,
        location: nextLocation,
      };

      context.transitionRouter.getLocationIndex.withArgs(nextLocation).returns(2);

      wrapper.setProps(nextProps);

      expect(
        wrapper.children().props(),
        'transition group should get "show-from-state" transition',
      ).to.have.property('transition', 'show-from-state');
    });
  });

  describe('after dismiss', () => {
    it('should call hook if available', () => {
      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});

      transitionConfig.onDismiss.callsArgWith(2, {
        transition: 'dismiss',
      });

      context.transitionRouter.getLocationIndex.withArgs(props.location).returns(1);

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      };

      const nextProps = {
        ...props,
        location: nextLocation,
      };

      context.transitionRouter.getLocationIndex.withArgs(nextLocation).returns(0);

      wrapper.setProps(nextProps);

      expect(
        transitionConfig.onDismiss,
        'onDismiss hook should be called once',
      ).to.be.calledOnce();

      expect(
        transitionConfig.onDismiss,
        'onDismiss hook should be called with instance as this',
      ).to.be.calledOn(wrapper.instance());

      expect(
        transitionConfig.onDismiss,
        'onDismiss hook should be called with props',
      ).to.be.calledWith(props, nextProps);

      expect(
        wrapper.children().props(),
        'transition group should get "dismiss" transition',
      ).to.have.property('transition', 'dismiss');
    });

    it('should use transition state', () => {
      props.location.state = {
        dismissTransition: {
          transition: 'dismiss-from-state',
        },
      };

      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});

      context.transitionRouter.getLocationIndex.withArgs(props.location).returns(2);

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      };

      const nextProps = {
        ...props,
        location: nextLocation,
      };

      context.transitionRouter.getLocationIndex.withArgs(nextLocation).returns(1);

      wrapper.setProps(nextProps);

      expect(
        wrapper.children().props(),
        'transition group should get "dismiss-from-state" transition',
      ).to.have.property('transition', 'dismiss-from-state');
    });

    it('should use transition state even for multi depth level', () => {
      props.location.state = {
        dismissTransition: {
          transition: 'dismiss-from-state',
        },
      };

      const wrapper = Enzyme.shallow(<WrappedComponent {...props} />, {context});

      context.transitionRouter.getLocationIndex.withArgs(props.location).returns(3);

      const nextLocation = {
        key: 'second',
        pathname: '/second',
      };

      const nextProps = {
        ...props,
        location: nextLocation,
      };

      context.transitionRouter.getLocationIndex.withArgs(nextLocation).returns(1);

      wrapper.setProps(nextProps);

      expect(
        wrapper.children().props(),
        'transition group should get "dismiss-from-state" transition',
      ).to.have.property('transition', 'dismiss-from-state');
    });
  });
});
