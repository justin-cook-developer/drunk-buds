import { connect } from 'react-redux';

import { gotUser as _gotUser } from '../../actions/auth';
import UpdateUser from './UpdateUserDumb';

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  gotUser(user) {
    dispatch(_gotUser(user));
    history.push('/profile');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUser);
