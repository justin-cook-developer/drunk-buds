import { connect } from 'react-redux';
import Home from './HomeDumb';

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.user.id,
});

export default connect(
  mapStateToProps,
  null
)(Home);
