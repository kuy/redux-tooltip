import {
  INIT,
  SET_TEXT, CLEAR_TEXT,
  OPEN_LIST, CLOSE_LIST,
  SET_ITEMS, CLEAR_ITEMS,
  SELECT_ITEM,
  SET_HIGHLIGHT, CLEAR_HIGHLIGHT
} from './actions';

const initial = {
  text: '',
  isOpen: false,
  highlightedIndex: null,
  items: [],
};

function getViewItems(text, props) {
  let { staticItems: items, shouldItemRender, sortItems, sortGroups } = props;
  if (shouldItemRender) {
    items = items.filter(item => shouldItemRender(item, text));
  }
  if (sortGroups) {
    const groups = {};
    items.forEach(item => {
      let group = groups[item.group];
      if (!group) {
        group = groups[item.group] = [];
      }
      group.push(item);
    });

    const groupNames = Object.keys(groups);
    groupNames.sort(sortGroups);

    items = groupNames.map(name => groups[name]).reduce((list, unsorted) => {
      const items = unsorted.slice(0);
      sortItems && items.sort((a, b) => sortItems(a, b, text));
      return list.concat(items);
    }, []);
  } else if (sortItems) {
    items.sort((a, b) => sortItems(a, b, text));
  }
  return items;
}

const handlers = {
  [INIT]: function (state, action) {
    const { text } = state;
    const { props } = action.payload;
    const items = props.staticItems ? getViewItems(text, props) : state.items;
    return { ...state, items };
  },
  [SET_TEXT]: function (state, action) {
    const { text, props } = action.payload;
    const items = props.staticItems ? getViewItems(text, props) : state.items;
    return { ...state, text, items };
  },
  [CLEAR_TEXT]: function (state, action) {
    return { ...state, text: '' };
  },
  [OPEN_LIST]: function (state, action) {
    const { text } = state;
    const { props } = action.payload;
    const items = props.staticItems ? getViewItems(text, props) : state.items;
    return { ...state, isOpen: true, highlightedIndex: null, items };
  },
  [CLOSE_LIST]: function (state, action) {
    return { ...state, isOpen: false, highlightedIndex: null };
  },
  [SET_ITEMS]: function (state, action) {
    return { ...state, items: action.payload };
  },
  [CLEAR_ITEMS]: function (state, action) {
    return { ...state, items: [] };
  },
  [SELECT_ITEM]: function (state, action) {
    const { index, props: { getItemValue } } = action.payload;
    const item = state.items[index];
    return { ...state,
      isOpen: false, highlightedIndex: null, text: getItemValue(item)
    };
  },
  [SET_HIGHLIGHT]: function (state, action) {
    return { ...state, isOpen: true, highlightedIndex: action.payload };
  },
  [CLEAR_HIGHLIGHT]: function (state, action) {
    return { ...state, highlightedIndex: null };
  },
};

export default function reducer(state = initial, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}
