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

A tooltip component. Please wrap a content which should be shown in a tooltip.

+ `show` [`Boolean`]
+ `place` [`String`]
+ `content` [`String`]
+ `el` ['DOM element']
+ `name` [`String`]
+ `onHover` ['Function']
+ `onLeave` ['Function']

### `Origin`

An origin component. Please wrap an element which triggers the action of showing a tooltip.
In most cases, you may use this component without any options.
For advanced usage, you can override the default handlers; `onMouseEnter` and `onMouseLeave`.

### `reducer`

A Redux reducer must be combined with yours.

### `middleware`

Please apply this middleware if you want to use 'delay' feature.

### `actions`

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

### Run test

This executes both unit and integration tests:

```
npm test
```

#### Unit test

```
npm run test:unit
```

#### Integration test

We're currently use Google Chrome for testing environment.
Following command will launch Chrome browser and run test suite.

```
npm run test:feature
```

### TODO

+ Options to change offsets
+ Supports auto placement
+ Supports custom themes
+ Introduce ESLint
+ API documentation using ESDoc

### Memo

+ When using delay feature, `onHover` and `onLeave` handlers should be called on triggered.

## Changelog

See the [Releases](https://github.com/kuy/redux-tooltip/releases) page on GitHub.

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
