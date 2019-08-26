import { connect } from 'react-redux';

import ProfilePage from './profilePageDumb';

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps)(ProfilePage);
