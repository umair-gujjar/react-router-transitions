import React from 'react';
import TransitionContext from './TransitionContext';

export default contextConfig => props => {
  const {RouterContext, ...transitionConfig} = contextConfig;
  return (
    <TransitionContext {...{transitionConfig, ...props}}>
      <RouterContext {...props} />
    </TransitionContext>
  );
};
