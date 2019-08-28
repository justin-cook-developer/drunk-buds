import {
  GOT_GROUPS,
  GOT_SINGLE_GROUP,
  REMOVED_GROUP,
  REMOVED_SINGLE_GROUP,
} from '../actions/groups';

const initialState = {
  groups: [],
  singleGroup: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_GROUPS: {
      const groups = action.groups;
      return { ...state, groups };
    }
    case GOT_SINGLE_GROUP: {
      const singleGroup = action.group;
      return { ...state, singleGroup };
    }
    case REMOVED_GROUP: {
      const groups = state.groups.filter(group => group.id !== action.id);
      return { ...state, groups };
    }
    case REMOVED_SINGLE_GROUP: {
      return { ...state, singleGroup: {} };
    }
    default:
      return state;
  }
};
