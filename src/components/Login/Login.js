import { connect } from 'react-redux';

import { gotUser as _gotUser } from '../../actions/auth';
import Login from './LoginDumb';

const mapDispatchToProps = (dispatch, { history }) => ({
  gotUser(user) {
    dispatch(_gotUser(user)).then(() => {
      history.push('/groups');
    });
  },
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
