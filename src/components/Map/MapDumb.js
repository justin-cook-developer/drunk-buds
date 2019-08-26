import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 35.282753,
      lng: -120.659615,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBQ-HT4WtN_kbEwLCUYfiwdlnJeyT50_E4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.locations.map(location => (
            <AnyReactComponent
              key={location.userId}
              lat={location.lat}
              lng={location.long}
              text={location.userId}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
