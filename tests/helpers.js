import TestUtils from 'react-addons-test-utils';
import { CSSStyleDeclaration } from 'cssstyle';
import equal from 'deep-equal';

export function scryComponents(tree, cls, props = {}) {
  const components = TestUtils.scryRenderedComponentsWithType(tree, cls);
  return components.filter(comp => {
    return Object.keys(props).map(key => {
      if (typeof props[key] === 'undefined') {
        return !!comp.props[key];
      } else {
        return equal(comp.props[key], props[key]);
      }
    }).reduce((prev, val) => prev && val, true);
  });
}

export function firstComponent(tree, cls, props = {}) {
  const all = scryComponents(tree, cls, props);
  if (0 < all.length) {
    return all[0];
  }
  throw new Error(`No matched components: ${cls.displayName} with ${JSON.stringify(props)}`);
}

const parser = new CSSStyleDeclaration();
export function getStyleValue(element, propName) {
  parser.cssText = element.getAttribute('style');
  return parser.getPropertyValue(propName);
}

export function getComputedStyleValue(element, propName) {
  const style = getComputedStyle(element);
  return style.getPropertyValue(propName);
}
