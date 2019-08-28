import { connect } from 'react-redux';
import {
  getSingleGroup,
  removeSingleGroup,
  addUserToGroup as _addUserToGroup,
} from '../../actions/groups';
import Group from './GroupDumb';

const mapStateToProps = ({ groups, locations }) => ({
  group: groups.singleGroup,
  locations: locations.locations.filter(location =>
    location.groupIds.includes(groups.singleGroup.id)
  ),
});

const mapDispatchToProps = (dispatch, { match }) => ({
  getGroup(id) {
    dispatch(getSingleGroup(id));
  },
  removeGroup() {
    dispatch(removeSingleGroup());
  },
  addUserToGroup(user) {
    dispatch(_addUserToGroup(match.params.id, user));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
