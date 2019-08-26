import { GOT_LOCATION } from '../actions/groups';

const initialState = {
  users: {},
  locations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_LOCATION: {
      const { userId } = action.data;
      
      if (state.users[userId]) {
        const locations = state.locations.map(location =>
          location.userId === userId ? action.data : location
        );
        return { ...state, locations };
      } else {
        const locations = [...state.locations, action.data];
        const users = { ...state.users, userId: true };
        return { ...state, locations, users };
      }
    }
    default:
      return state;
  }
};
