import TestUtils from 'react-addons-test-utils';

export function scryComponents(tree, cls, props = {}) {
  const components = TestUtils.scryRenderedComponentsWithType(tree, cls);
  return components.filter(comp => {
    return Object.keys(props).map(key => {
      return comp.props[key] === props[key];
    }).reduce((prev, val) => prev && val, true);
  });
}

export function firstComponent(tree, cls, props = {}) {
  const all = scryComponents(tree, cls, props);
  if (0 < all.length) {
    return all[0];
  }
  throw new Error(`No matched components: ${cls} with ${props}`);
}
