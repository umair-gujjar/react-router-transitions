import React from 'react';
import TransitionContext from './TransitionContext';

const useTransitions = options => ({
  renderRouterContext: (child, props) => (
    <TransitionContext
      transitionConfig={options}
      {...props}
    >
      {child}
    </TransitionContext>
  ),
});

export default useTransitions;
