import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>UBICACION</div>;

class GMaps extends Component {


    // constructor(props) {
    //     super(props);
    // }

    constructor(props){
        super(props)
        this.center = {
          lat: this.props.latitude,
          lng: this.props.longitude
        }
        this.zoom = 15;
      }




    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC4Ol4VqdcR8C_uzqJUSNV_57IWZlSKtcw" }}
                    defaultCenter={this.center}
                    defaultZoom={this.zoom}
                >
                    <AnyReactComponent
                        lat={this.props.latitude}
                        lng={this.props.longitude}
                        text={this.props.name}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GMaps;