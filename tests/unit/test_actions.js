import assert from 'power-assert';
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
            'redux-tooltip/delay': 1500,
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
            'redux-tooltip/delay': 1500,
          }
        });
      });
    });
  });
});
