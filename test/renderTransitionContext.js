import {shallow} from 'enzyme';
import {expect} from 'chai';
import renderTransitionContext from '../src/renderTransitionContext';

describe('renderTransitionContext', () => {
  it('should render a TransitionContext', () => {
    const RouterContext = () => null;
    const transitionContext = renderTransitionContext({
      RouterContext,
      otherConfigProp: true,
    })({
      location: {},
      router: {},
    });

    const wrapper = shallow(transitionContext);

    expect(
      wrapper.instance().props,
      'TransitionContext should be rendered with prop "transitionConfig"'
    )
      .to.have.property('transitionConfig')
      .that.eql({
        otherConfigProp: true,
      });

    expect(
      wrapper.instance().props,
      'TransitionContext should be rendered with prop "router"'
    )
    .to.have.property('router');

    expect(
      wrapper.instance().props,
      'TransitionContext should be rendered with prop "location"'
    )
      .to.have.property('location');

    expect(
      wrapper.last().props(),
      'RouterContext should be rendered with props'
    ).to.eql({
      location: {},
      router: {},
    });
  });
});
