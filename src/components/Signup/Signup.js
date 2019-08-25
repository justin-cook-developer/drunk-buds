import { connect } from 'react-redux';

import { gotUser as _gotUser } from '../../actions/auth';
import Signup from './SignupDumb';

const mapDispatchToProps = (dispatch, { history }) => ({
  gotUser(user) {
    dispatch(_gotUser(user));
    history.push('/groups');
  },
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);
