import { connect } from 'react-redux';
import { getGroups as _getGroups } from '../../actions/groups';
import Groups from './GroupsDumb';

const mapStateToProps = ({ groups }) => {
  return { groups: groups.groups };
};

const mapDispatchToProps = dispatch => ({
  getGroups() {
    dispatch(_getGroups());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
