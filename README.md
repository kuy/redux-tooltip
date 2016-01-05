[![NPM Package][npm_img]][npm_site]
[![Travis][ci_img]][ci_site]
[![Dependency Status][david_img]][david_site]

# redux-tooltip

A tooltip [React](https://facebook.github.io/react/) component for [Redux](https://github.com/rackt/redux).

## Installation

```
npm install --save redux-tooltip
```

## Examples

Please check out [examples](https://github.com/kuy/redux-tooltip/tree/master/examples) directory.

## Getting Started

`redux-tooltip` provides a Redux reducer and two React components; `Tooltip` and `Origin`.
The reducer handles actions dispatched from UI components and changes Redux's state tree.
Since both components are already connected to Redux store (this also means they can call `store.dispatch()`),
the `Tooltip` component receives changes of props and updates itself.

The recommended setup is that a single (shared) `Tooltip` component and multiple `Origin` components.
If you hover on the origin element, the tooltip will be shown.

#### 1. Put a shared `Tooltip` component to [Container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.lek6bm8mf)

```
import { Tooltip } from 'redux-tooltip';

class App extends React.Component {
  render() {
    return (
      <div>
        <Page />
        <Tooltip>
          Hello Tooltip!
        </Tooltip>
      </div>
    );
  }
}
```

#### 2. Wrap your content with an `Origin` component in Container or Presentatinal component

```
import { Origin } from 'redux-tooltip';

class Page extends React.Component {
  render() {
    return (
      <p>
        Please hover <Origin>here</Origin>.
      </p>
    );
  }
}
```

#### 3. Combine `redux-tooltip` reducer with yours

```
import { reducer as tooltip } from 'redux-tooltip';

// ...

export default combineReducers(
  { your, reducers, ..., tooltip }
);
```

That's it!

## API

### `Tooltip`

A tooltip component.

+ `show` [`Boolean`]
+ `el` ['DOM element']
+ `onHover` ['Function']
+ `onLeave` ['Function']

### `Origin`

A origin component. This has default handlers of `onMouseEnter` and `onMouseLeave`
which dispatches actions to show/hide tooltip.

### reducer

A Redux reducer must be combined with yours.

### middleware

Please apply this middleware if you want to use 'delay' feature.

### actions

WIP

## Development

### Setup

```
npm install
npm run build
```

### Start dev server for example

```
npm start
```

Open `http://localhost:8080/webpack-dev-server/` for auto-reloading.
If you want to debug with React Dev Tools, `http://localhost:8080/` will be preferred.

### TODO

+ Supports auto placement
+ Adds option to specify delay in `Origin` component
+ Supports custom themes
+ Introduce ESLint

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

[npm_img]: https://img.shields.io/npm/v/redux-tooltip.svg
[npm_site]: https://www.npmjs.org/package/redux-tooltip
[ci_img]: https://img.shields.io/travis/kuy/redux-tooltip/master.svg?style=flat-square
[ci_site]: https://travis-ci.org/rackt/reselect
[david_img]: https://img.shields.io/david/kuy/redux-tooltip.svg
[david_site]: https://david-dm.org/kuy/redux-tooltip
