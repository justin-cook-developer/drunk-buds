export const GOT_USER = 'GOT_USER';
export const REMOVED_USER = 'REMOVED_USER';

export const gotUser = user => ({
  type: GOT_USER,
  user,
});

const removedUser = () => ({
  type: REMOVED_USER,
});

export const getMe = () => async (dispatch, _, axios) => {
  try {
    const { data: user } = await axios.get('/auth/me');
    if (user) {
      dispatch(gotUser(user));
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
