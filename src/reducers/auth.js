import { GOT_USER, REMOVED_USER, END_ME } from '../actions/auth';

const initialState = {
  user: {},
  gettingMe: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER: {
      return { ...state, user: action.user, gettingMe: false };
    }
    case REMOVED_USER: {
      return { ...state, user: {} };
    }
    case END_ME: {
      return { ...state, gettingMe: false };
    }
    default:
      return state;
  }
};
