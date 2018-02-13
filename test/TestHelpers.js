import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});


export const getChildContext = (Component, props) => {
  let context;

  class ChildContextGetter extends React.Component {
    static contextTypes = Component.childContextTypes;

    componentWillMount() {
      context = this.context;
    }

    render() {
      return null;
    }
  }

  const wrapper = Enzyme.mount(
    <Component {...props}>
      <ChildContextGetter />
    </Component>,
  );

  return {context, wrapper};
};
