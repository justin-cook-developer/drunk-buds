import { connect } from 'react-redux';
import {
  getSingleGroup,
  removeSingleGroup,
  addUserToGroup as _addUserToGroup,
  removeUserFromGroup,
  deleteGroup as _deleteGroup,
} from '../../actions/groups';
import Group from './GroupDumb';

const mapStateToProps = ({ groups, locations, auth }) => {
  return {
    group: groups.singleGroup,
    locations: locations.locations.filter(location =>
      location.groupIds.includes(groups.singleGroup.id)
    ),
    userOwnsGroup: auth.user.id === groups.singleGroup.creatorId,
  };
};

const mapDispatchToProps = (dispatch, { match, history }) => ({
  getGroup(id) {
    dispatch(getSingleGroup(id));
  },
  removeGroup() {
    dispatch(removeSingleGroup());
  },
  removeUser(userId) {
    dispatch(removeUserFromGroup(match.params.id, userId));
  },
  addUserToGroup(user) {
    dispatch(_addUserToGroup(match.params.id, user));
  },
  deleteGroup(id) {
    dispatch(_deleteGroup(id)).then(() => {
      history.push('/groups');
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
