import assert from 'assert';
import sinon from 'sinon';
import reducer from '../../src/reducer';
import * as actions from '../../src/actions';

describe('reducer', () => {
  let warn;
  beforeEach(() => {
    warn = sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore();
  });

  it("warns with 'el' prop", () => {
    reducer(undefined, actions.show({ el: 'abc' }));
    assert(warn.calledOnce);
    assert(warn.firstCall.args[0] === "DEPRECATED: Use 'origin' instead of 'el' in props for Tooltip component or 'show' action.");
  });

  it("doesn't warn with 'origin' prop", () => {
    reducer(undefined, actions.show({ origin: 'abc' }));
    assert(warn.callCount === 0);
  });

  it("ignores non-related actions which contains 'el' prop in payload", () => {
    reducer(undefined, { type: 'NON_RELATED_ACTION', payload: { el: 'abc' } });
    assert(warn.callCount === 0);
  });
});
