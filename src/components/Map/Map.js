import { connect } from 'react-redux';

import Map from './MapDumb';

const mapStateToProps = ({ groups }) => ({
  locations: groups.locations,
});

export default connect(mapStateToProps)(Map);
