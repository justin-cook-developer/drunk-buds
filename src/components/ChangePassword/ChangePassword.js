import { connect } from 'react-redux';

import ChangePassword from './ChangePasswordDumb';

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(ChangePassword);
