# NOTICE: UNDERDEVELOPMENT

# redux-tooltip

A tooltip react component for Redux.

## Usage

In your [Container Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.lek6bm8mf),
add a shared `Tooltip` component with a content of tooltip.

```
import { Tooltip } from 'redux-tooltip';

class App extends React.Component {
  render() {
    return (
      // ...
      <Tooltip>
        Hello Tooltip!
      </Tooltip>
      // ...
    );
  }
}
```

Put an origin (target) element in Container or Presentatinal Component.

```
import { Origin } from 'redux-tooltip';

class Page extends React.Component {
  render() {
    return (
      Please hover <Origin>here</Origin>.
    );
  }
}
```

Combine redux-tooltip's reducer with yours.

```
import { reducer as tooltip } from 'redux-tooltip';

// ...

export default combineReducers(
  { yours, tooltip }
);
```

## Examples

Please check out `examples` directory.

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
+ Passing tooltip styles as 'style' props
