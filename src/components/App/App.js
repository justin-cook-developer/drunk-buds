import { connect } from 'react-redux';

import App from './AppDumb';
import { getMe as _getMe } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  getMe() {
    dispatch(_getMe());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(App);
