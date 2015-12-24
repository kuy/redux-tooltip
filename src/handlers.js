import { show, hide } from './actions';

export default function handlers(dispatch) {
  return {
    onMouseOver: function (e) {
      dispatch(show(e.target));
    },
    onMouseOut: function () {
      dispatch(hide());
    },
  };
}
