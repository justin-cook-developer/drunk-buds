import { connect } from 'react-redux';

import Nav from './NavDumb';
import { toggleNav as _toggleNav } from '../../actions/ui';
import { logout as _logout } from '../../actions/auth';

const mapStateToProps = ({ ui, auth }) => ({
  navOpen: ui.navOpen,
  loggedIn: auth.user.id,
});

const mapDispatchToProps = dispatch => ({
  toggleNav() {
    dispatch(_toggleNav());
  },
  logout() {
    dispatch(_logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
