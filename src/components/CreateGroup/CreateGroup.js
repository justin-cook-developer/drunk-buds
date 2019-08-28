import { connect } from 'react-redux';
import { gotGroup as _gotGroup } from '../../actions/groups';
import CreateGroup from './CreateGroupDumb';

const mapDispatchToProps = dispatch => ({
  gotGroup(group) {
    dispatch(_gotGroup(group));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(CreateGroup);
