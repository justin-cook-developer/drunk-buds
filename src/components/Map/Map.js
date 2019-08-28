import { connect } from 'react-redux';

import Map from './MapDumb';

const mapStateToProps = ({ locations }) => ({
  locations: locations.locations,
});

export default connect(mapStateToProps)(Map);
