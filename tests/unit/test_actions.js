import assert from 'assert';
import * as actions from '../../src/actions';

describe('actions', () => {
  describe('.delay', () => {
    context('with action contains no meta data', () => {
      const action = {
        type: 'WOO',
        payload: {
          value: 123
        },
      };

      it('appends meta data for delay feature', () => {
        assert.deepStrictEqual(actions.delay(action), {
          type: 'WOO',
          payload: {
            value: 123
          },
          meta: {
            'redux-tooltip/delay': {
              duration: 1500,
              callback: undefined,
            },
          }
        });
      });

      it('overwrites default duration', () => {
        assert.deepStrictEqual(actions.delay(action, { duration: 500 }), {
          type: 'WOO',
          payload: {
            value: 123
          },
          meta: {
            'redux-tooltip/delay': {
              duration: 500,
              callback: undefined,
            },
          }
        });
      });

      it('overwrites default duration', () => {
        const fn = () => {};
        assert.deepStrictEqual(actions.delay(action, { callback: fn }), {
          type: 'WOO',
          payload: {
            value: 123
          },
          meta: {
            'redux-tooltip/delay': {
              duration: 1500,
              callback: fn,
            },
          }
        });
      });
    });

    context('with action contains other meta data', () => {
      const action = {
        type: 'RUBY',
        payload: {
          on: 'rails',
        },
        meta: {
          gem: 'bundler',
        }
      };

      it('does not modify other meta data', () => {
        assert.deepStrictEqual(actions.delay(action), {
          type: 'WOO',
          payload: {
            value: 123
          },
          type: 'RUBY',
          payload: {
            on: 'rails',
          },
          meta: {
            gem: 'bundler',
            'redux-tooltip/delay': {
              duration: 1500,
              callback: undefined,
            },
          }
        });
      });
    });
  });
});
