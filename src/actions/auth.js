import socket from '../socket';

export const GOT_USER = 'GOT_USER';
export const REMOVED_USER = 'REMOVED_USER';
export const END_ME = 'END_ME';

export const gotUser = user => {
  socket.emit('gotSelf', user);
  return {
    type: GOT_USER,
    user,
  };
};

const removedUser = () => ({
  type: REMOVED_USER,
});

const endMe = () => ({ type: END_ME });

export const getMe = () => async (dispatch, _, axios) => {
  try {
    const { data: user } = await axios.get('/auth/me');
    if (user) {
      dispatch(gotUser(user));
    } else {
      dispatch(endMe());
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch, _, axios) => {
  try {
    await axios.delete('/auth/logout');
    dispatch(removedUser());
  } catch (error) {
    console.error(error);
  }
};
