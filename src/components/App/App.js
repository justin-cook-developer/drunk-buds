import { connect } from 'react-redux';

import App from './AppDumb';
import { getMe as _getMe } from '../../actions/auth';
import { gotLocation as _gotLocation } from '../../actions/locations';

const mapStateToProps = ({ auth }) => ({
  gettingMe: auth.gettingMe,
});

const mapDispatchToProps = dispatch => ({
  getMe() {
    dispatch(_getMe());
  },
  gotLocation(data) {
    dispatch(_gotLocation(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
