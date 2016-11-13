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

  describe('.prefix', () => {
    it('returns a prefixed action type', () => {
      const type = actions.prefix('HOGE');
      assert(type === 'redux-tooltip/HOGE');
    });
  });

  describe('.createAction', () => {
    it('creates an action creator', () => {
      const creator = actions.createAction('HOGE');
      assert(typeof creator === 'function');
      assert.deepStrictEqual(creator(123), { type: 'HOGE', payload: 123 });
      assert.deepStrictEqual(creator({ nyan: 'cat' }), { type: 'HOGE', payload: { nyan: 'cat' } });
    });
  });
});
