import { connect } from 'react-redux';

import Nav from './NavDumb';
import { toggleNav as _toggleNav } from '../../actions/ui';

const mapStateToProps = ({ ui }) => ({
  navOpen: ui.navOpen,
});

const mapDispatchToProps = dispatch => ({
  toggleNav() {
    dispatch(_toggleNav());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
