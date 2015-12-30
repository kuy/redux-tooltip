import assert from 'power-assert';
import * as utils from '../src/utils';

describe('utils', () => {
  describe('.resolve', () => {
    context('with action contains no names', () => {
      const action = {
        type: 'OOPS',
        payload: {
          value: 99
        },
      };

      it('returns a default name', () => {
        assert.deepStrictEqual(utils.resolve(action), ['default']);
      });
    });

    context('with action contains single name', () => {
      const action = {
        type: 'FOO',
        payload: {
          name: 'bar',
        },
      };

      it('returns a list of names', () => {
        assert.deepStrictEqual(utils.resolve(action), ['bar']);
      });
    });

    context('with action contains multiple names', () => {
      const action = {
        type: 'COLOR',
        payload: {
          name: ['red', 'green', 'blue'],
        },
      };

      it('returns a list of names', () => {
        assert.deepStrictEqual(utils.resolve(action), ['red', 'green', 'blue']);
      });
    });

    context('with props contains no names', () => {
      const props = {
        place: 'top',
      };

      it('returns a default name', () => {
        assert.deepStrictEqual(utils.resolve(props), ['default']);
      });
    });

    context('with props contains single name', () => {
      const props = {
        name: 'bar',
      };

      it('returns a list of names', () => {
        assert.deepStrictEqual(utils.resolve(props), ['bar']);
      });
    });

    context('with props contains multiple names', () => {
      const props = {
        name: ['red', 'green', 'blue'],
      };

      it('returns a list of names', () => {
        assert.deepStrictEqual(utils.resolve(props), ['red', 'green', 'blue']);
      });
    });
  });
});
