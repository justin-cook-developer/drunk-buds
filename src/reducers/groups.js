import {
  GOT_GROUPS,
  GOT_GROUP,
  GOT_SINGLE_GROUP,
  REMOVED_GROUP,
  REMOVED_SINGLE_GROUP,
  ADD_USER_TO_GROUP,
  REMOVE_USER_FROM_GROUP,
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
    case GOT_GROUP: {
      const groups = [...state.groups, action.group];
      return { ...state, groups };
    }
    case ADD_USER_TO_GROUP: {
      const singleGroup = {
        ...state.singleGroup,
        users: [...state.singleGroup.users, action.user],
      };
      return { ...state, singleGroup };
    }
    case REMOVE_USER_FROM_GROUP: {
      console.log('irerucerrrr', action.userId);

      const singleGroup = {
        ...state.singleGroup,
        users: state.singleGroup.users.filter(
          user => user.id !== action.userId
        ),
      };
      return { ...state, singleGroup };
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
