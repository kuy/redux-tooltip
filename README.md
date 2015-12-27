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
If you hover on `Origin` component, `Tooltip` will be shown.

### 1. Put a shared `Tooltip` component to [Container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.lek6bm8mf) with contents

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

### 2. Put an origin (target) element in Container or Presentatinal component.

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

### 3. Combine `redux-tooltip` reducer with yours.

```
import { reducer as tooltip } from 'redux-tooltip';

// ...

export default combineReducers(
  { your, reducers, ..., tooltip }
);
```

That's it!

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

+ Supports multiple tooltips
