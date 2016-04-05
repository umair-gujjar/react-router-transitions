# react-router-transitions
[![Build Status](https://travis-ci.org/doctolib/react-router-transitions.svg?branch=master)](https://travis-ci.org/doctolib/react-router-transitions)
[![Dependency Status](https://david-dm.org/doctolib/react-router-transitions.svg?theme=shields.io)](https://david-dm.org/doctolib/react-router-transitions)
[![devDependency Status](https://david-dm.org/doctolib/react-router-transitions/dev-status.svg?theme=shields.io)](https://david-dm.org/doctolib/react-router-transitions#info=devDependencies)

React router transitions enable transitions support in react-router, it supports history and supports
all kind of animations.

The main goal of this module is to be able to handle history and link it to the correct animation. It's a requirement especially on mobile to provide a great user experience.

## Install

```
npm install react-router-transitions
```

## Getting started

### Set up routes

To enable transitions in your application, you must set up the transition context at the root
of your application using `renderTransitionContext`.

Then you can enable transitions at several levels of your application using `withTransition`.

```js
import React from 'react';
import RouterContext from 'react-router/lib/RouterContext';
import {renderTransitionContext, withTransition} from 'react-router-transitions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import App from './App';
import Home from './Home';
import AboutUs from './AboutUs';

export default () => (
  <Router
    history={browserHistory}
    render={renderTransitionContext({
      RouterContext,
      TransitionGroup: ReactCSSTransitionGroup,
      defaultTransition: {
        transitionName: 'fade',
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      }
    })}
  >
    <Route path="/" component={withTransition(App)}>
      <Route path="home" component={Home} />
      <Route path="about-us" component={AboutUs} />
    </Route>
  </Router>
);
```

### Navigate into your application

If you are familiar with react-router, you probably already used methods like `router.push` or `router.replace`. Starting now, you will not have to use them.

You have to think your navigation with a view logic. To handle that, a new property is now accessible in the context `transitionRouter` that exposes three methods.

#### transitionRouter.show(location)

Go to a location using a `show` animation. You have to use this method each time you go to a new view.

It adds a new entry in the history to give to the user the ability to use back button.

Internally it uses the method `router.push`.

#### transitionRouter.dismiss(location)

Go to a location using a `dismiss` animation. You have to use this method when you want to simulate a "close" or a "go back" to hide a view.

It doesn't add a new entry in the history.

Internally it uses the method `router.goBack` if we have an history, else it uses `transitionRouter.swap` with a `dismiss` action.

#### swap(location, [transitionAction])

Go to a location using the default transition or the transition specified. You have to use this method if you want to change route without affecting the history (ex: tabs, accordion..).

It doesn't add new entry in the history.

Internally it merge the new location with the current one and use `router.replace`. The transitionAction is added to the location state if specified.

#### Specify transitions

You can specify transition associated to a view directly in the location state. You have to specify two transitions configuration: `showTransition` and `dismissTransition`.

If you specified these properties in the state they will the transition used to `show` or `dismiss` the view.

#### Example

```js
import React from 'react';

export default class Home extends React.Component {
  static contextTypes = {
    transitionRouter: React.PropTypes.object  
  };

  onClickAboutUs(event) {
    event.preventDefault();
    this.context.transitionRouter.show({
      pathname: '/about-us',
      state: {
        showTransition: {
          transitionName: 'show-from-top',
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 300
        },
        dismissTransition: {
          transitionName: 'dismiss-from-top',
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 300
        }
      }
    });
  }

  render() {
    return (
      <div className="home">
        <a href="/about-us" onClick={this.onClickAboutUs}>
          About us
        </a>
      </div>
    );
  }
}
```

## API

### renderTransitionContext(options)

Options available are :

- `RouterContext`: Usually the router context component of react-router.
- `TransitionGroup`: The transition group component used to make transition. You can use all type of transition group, [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) is the default choice. Transition specified in `showTransition`, `dismissTransition` or `defaultTransition` are the properties used to render your TransitionGroup.
- `defaultTransition`: The default transition applied on component. The default transition is applied
when no transition is specified or when we can't determine the type of transition to apply.
- `onShow`: Hook function called after a SHOW action has beed requested.
- `onDismiss`: Hook function called after a DISMISS action has beed requested.
- `getComponentKey`: Function used to generate component key. Default to complete route path.

This method has to be called in the render method of the Router component.

```js
<Router
  history={browserHistory}
  render={renderTransitionContext({
    RouterContext,
    TransitionGroup: ReactCSSTransitionGroup,
    defaultTransition: {
      transitionName: 'fade',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300
    }
  })}
/>
```

### withTransition(Component, config)

Enable transitions on the component.

The config provided is merged with the config provided into `renderTransitionContext`.

In a simple application, this high order component has to be applied at the root level.

```js
<Route path="/" component={withTransition(App)}>
  <Route path="home" component={Home} />
  <Route path="about-us" component={AboutUs} />
</Route>
```

## Advanced usage

### Use hooks to determine transition automatically

You can use hooks to determine transition automatically without having to specify it in every "show" or "dismiss".

**Example:**

```js
<Router
  history={browserHistory}
  render={renderTransitionContext({
    RouterContext,
    TransitionGroup: ReactCSSTransitionGroup,
    onShow(prevState, nextState, replaceTransition) {
      return {
        transitionName: `show-${nextState.children.props.route.transition}`,
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      };
    },
    onDismiss(prevState, nextState, replaceTransition) {
      return {
        transitionName: `dismiss-${prevState.children.props.route.transition}`,
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      };
    },
    defaultTransition: {
      transitionName: 'fade',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300
    }
  })}
>
  <Route path="/" component={withTransition(App)}>
    <Route path="home" component={Home} transition="from-right" />
    <Route path="about-us" component={AboutUs} transition="from-top" />
  </Route>
</Router>
```

### Create a custom component key

If animation is not played one of the reason could be that your key is not different from the key of the last location. To fix that you can create a custom component by specifying `getComponentKey` in the configuration.

**Example:**

```js
<Route path="home" component={withTransition(Home, {
  getComponentKey(child, props) {
    return 'custom-home-key';
  }
})}
```

### Use with custom history

React router transitions works with every built in [react-router](https://github.com/reactjs/react-router) and available in [history](https://github.com/mjackson/history).

The only requirement to use this module with a custom history is to set an "action" and a "key" property in location. You can refer to [history](https://github.com/mjackson/history) to see example.

## License

MIT
