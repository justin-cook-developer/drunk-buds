export const GOT_GROUPS = 'GOT_GROUPS';
export const GOT_GROUP = 'GOT_GROUP';
export const GOT_SINGLE_GROUP = 'GOT_SINGLE_GROUP';
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP';
export const REMOVED_GROUP = 'REMOVED_GROUP';
export const REMOVED_SINGLE_GROUP = 'REMOVED_SINGLE_GROUP';
export const REMOVE_USER_FROM_GROUP = 'REMOVE_USER_FROM_GROUP';
export const DELETED_GROUP = 'DELETED_GROUP';

const gotGroups = groups => ({
  type: GOT_GROUPS,
  groups,
});

export const gotGroup = group => ({
  type: GOT_GROUP,
  group,
});

const removedGroup = id => ({
  type: REMOVED_GROUP,
  id,
});

const gotSingleGroup = group => ({
  type: GOT_SINGLE_GROUP,
  group,
});

const addedUserToGroup = user => ({
  type: ADD_USER_TO_GROUP,
  user,
});

const removedUserFromGroup = userId => ({
  type: REMOVE_USER_FROM_GROUP,
  userId,
});

const deletedGroup = () => ({
  type: DELETED_GROUP,
});

export const removeSingleGroup = () => ({ type: REMOVED_SINGLE_GROUP });

export const getGroups = () => async (dispatch, _, axios) => {
  try {
    const { data: groups } = await axios.get('/api/groups');
    dispatch(gotGroups(groups));
  } catch (error) {
    console.error(error);
  }
};

export const removeGroup = id => async (dispatch, _, axios) => {
  try {
    await axios.delete(`/api/groups/${id}`);
    dispatch(removedGroup(id));
  } catch (error) {
    console.error(error);
  }
};

export const getSingleGroup = id => async (dispatch, _, axios) => {
  try {
    const { data: group } = await axios.get(`/api/groups/${id}`);
    dispatch(gotSingleGroup(group));
  } catch (error) {
    console.error(error);
  }
};

export const addUserToGroup = (groupId, user) => async (dispatch, _, axios) => {
  try {
    await axios.post(`/api/groups/${groupId}/users/${user.id}`);
    dispatch(addedUserToGroup(user));
  } catch (error) {
    console.error(error);
  }
};

export const removeUserFromGroup = (groupId, userId) => async (
  dispatch,
  _,
  axios
) => {
  try {
    await axios.delete(`/api/groups/${groupId}/users/${userId}`);
    dispatch(removedUserFromGroup(userId));
  } catch (error) {
    console.error(error);
  }
};

export const deleteGroup = groupId => async (dispatch, _, axios) => {
  try {
    await axios.delete(`/api/groups/${groupId}`);
    dispatch(deletedGroup());
  } catch (error) {
    console.error(error);
  }
};
