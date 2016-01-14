import assert from 'power-assert';
import * as utils from '../../src/utils';

describe('utils', () => {
  describe('.opposite', () => {
    it('returns an opposite direction', () => {
      assert(utils.opposite('top') === 'bottom');
      assert(utils.opposite('right') === 'left');
      assert(utils.opposite('bottom') === 'top');
      assert(utils.opposite('left') === 'right');
    });

    it('throws an exception', () => {
      assert.throws(() => utils.opposite(), Error);
      assert.throws(() => utils.opposite(''), Error);
      assert.throws(() => utils.opposite(123), Error);
    });
  });

  describe('.intersection', () => {
    it("doesn't modify input data");

    context('with valid areas', () => {
      it('returns an intersection', () => {
        const a1 = { top: 0, left: 0, height: 100, width: 50 };
        const a2 = { top: 10, left: 20, height: 60, width: 80 };
        assert.deepStrictEqual(utils.intersection(a1, a2), {
          top: 10, left: 20, right: 50, bottom: 70,
          height: 60, width: 30
        });
      });
    });

    context('with same areas', () => {
      it('returns an intersection', () => {
        const area = { top: 0, left: 0, height: 100, width: 50 };
        assert.deepStrictEqual(utils.intersection(area, area), {
          top: 0, left: 0, right: 50, bottom: 100,
          height: 100, width: 50
        });
      });
    });

    context('with an area that contains an other one', () => {
      it('returns an intersection', () => {
        const a1 = { top: 0, left: 0, height: 100, width: 100 };
        const a2 = { top: 25, left: 25, height: 50, width: 50 };
        assert.deepStrictEqual(utils.intersection(a1, a2), {
          top: 25, left: 25, right: 75, bottom: 75,
          height: 50, width: 50
        });

        const a3 = { top: 50, left: 50, height: 50, width: 50 };
        assert.deepStrictEqual(utils.intersection(a1, a3), {
          top: 50, left: 50, right: 100, bottom: 100,
          height: 50, width: 50
        });
      });
    });

    context('with adjacent areas', () => {
      it('returns an intersection', () => {
        const a1 = { top: -20, left: 0, height: 20, width: 40 };
        const a2 = { top: 0, left: 0, height: 20, width: 40 };
        assert.deepStrictEqual(utils.intersection(a1, a2), {
          top: 0, left: 0, right: 40, bottom: 0,
          height: 0, width: 40
        });

        const a3 = { top: -20, left: 40, height: 20, width: 20 };
        assert.deepStrictEqual(utils.intersection(a1, a3), {
          top: -20, left: 40, right: 40, bottom: 0,
          height: 20, width: 0
        });
      });
    });

    context('with areas which are located in negative coordinate', () => {
      it('returns an intersection', () => {
        const a1 = { top: -100, left: -80, height: 50, width: 20 };
        const a2 = { top: -120, left: -100, height: 40, width: 60 };
        assert.deepStrictEqual(utils.intersection(a1, a2), {
          top: -100, left: -80, right: -60, bottom: -80,
          height: 20, width: 20
        });

        const a3 = { top: -80, left: -100, height: 10, width: 60 };
        assert.deepStrictEqual(utils.intersection(a1, a3), {
          top: -80, left: -80, right: -60, bottom: -70,
          height: 10, width: 20
        });
      });
    });
  });

  describe('.strip', () => {
    it("doesn't modify input data");

    context('with an area contains unit string', () => {
      it('returns a stripped area', () => {
        const area = { top: '50px', left: '48.8px' };
        assert.deepStrictEqual(utils.strip(area), { top: 50, left: 48.8 });
      });
    });

    context('with a stripped area', () => {
      it('returns a stripped area', () => {
        const area = { top: '50px', left: '48.8px' };
        const stripped = utils.strip(area);
        assert.deepStrictEqual(utils.strip(stripped), { top: 50, left: 48.8 });
      });
    });
  });

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
