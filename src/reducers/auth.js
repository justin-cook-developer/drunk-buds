import { GOT_USER, REMOVED_USER } from '../actions/auth';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER: {
      return { ...state, user: action.user };
    }
    case REMOVED_USER: {
      return { ...state, user: {} };
    }
    default:
      return state;
  }
};
