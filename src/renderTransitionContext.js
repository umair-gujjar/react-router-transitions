import React from 'react';
import TransitionContext from './TransitionContext';
import warning from 'warning';

const renderTransitionContext = contextConfig => props => {
  warning(false, 'Using renderTransitionContext has been deprecated, use useTransitions instead.');

  const {RouterContext, ...transitionConfig} = contextConfig;
  return (
    <TransitionContext {...{transitionConfig, ...props}}>
      <RouterContext {...props} />
    </TransitionContext>
  );
};


export default renderTransitionContext;
