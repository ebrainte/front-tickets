import React from "react";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";

import {
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    PopoverBody,
    UncontrolledPopover,
    Button,
    Col
} from "reactstrap";


class locationInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }


    async componentDidMount() {
        // const updateTimer = React.useRef(null);
        // updateTimer.current = setTimeout(() => {
        //     this.getLocation(this.props.coords.latitude,this.props.coords.longitude);
        //     updateTimer.current = null;
        //   }, 4000);
        await this.setState({
            address: "Ingresa una direccion"
        });
        this.props.action(this.state);

    }
    toggleChange = async () => {
        console.log(this.state.isChecked)
        this.setState({
            isChecked: !this.state.isChecked,
        });
        console.log(this.state.isChecked)
        if (!this.state.isChecked) this.getLocation(this.props.coords.latitude, this.props.coords.longitude);

    }

    handleChange = async (event) => {
        await this.setState({
            address: event.target.value
        });
        this.props.action(this.state);
        console.log("Estoy cambiando el addressfield");
        console.log(this.state);
    }

    async getLocation(latitude, longitude) {
        // geolocated({
        //     positionOptions: {
        //         enableHighAccuracy: false,
        //     },
        //     userDecisionTimeout: 5000,
        // });
        // geolocated.getLocation();
        Geocode.setApiKey("AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4");
        Geocode.setLanguage("es");
        Geocode.setRegion("ar");
        Geocode.enableDebug();
        await Geocode.fromLatLng(latitude, longitude).then(
            response => {
                const address = response.results[0].formatted_address;
                console.log(address);
                this.setState({ address: address })
                console.log(this.state);
                this.props.action(this.state);
            },
            error => {
                console.error(error);
            }
        );
    }


    render() {
        return (
            <>
                {/* <Container> */}
                    <Input
                        placeholder="Ingresa una direccion"
                        type="text"
                        onFocus={e => this.setState({ searchAltFocused: true })}
                        onBlur={e => this.setState({ searchAltFocused: false })}
                        // onKeyDown={this.updateInput}
                        //onChange={this.updateInput}
                        value={this.state.address}
                        onChange={this.handleChange}
                        id="tooltip765206973"
                    />
                   
                {/* </Container> */}

                {this.props.coords ? (
                    <UncontrolledPopover placement="bottom" target="tooltip765206973">
                    <PopoverBody>
                    <div className="custom-control custom-checkbox mb-3">
                                      <input
                                          className="custom-control-input"
                                          id="uselocation"
                                          type="checkbox"
                                          checked={this.state.isChecked}
                                          onChange={this.toggleChange}
                                      //  onClick={this.getLocation(this.props.coords.latitude,this.props.coords.longitude)}
                                      />
                                      <label className="custom-control-label" htmlFor="uselocation">
                                          Usar mi ubicacion actual
                                   </label>
                                  </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                ) : (
                        <div> </div>
                    )}

            </>
        );

        // return (
        //     <>
        //         <Container>
        //             <Input
        //                 placeholder="Busca un evento por nombre..."
        //                 type="text"
        //                 onFocus={e => this.setState({ searchAltFocused: true })}
        //                 onBlur={e => this.setState({ searchAltFocused: false })}
        //                 // onKeyDown={this.updateInput}
        //                 onChange={this.updateInput}
        //                 value={this.state.address}
        //             />
        //             this.props.coords ? (
        //             <div className="custom-control custom-checkbox mb-3">
        //                 <input
        //                     className="custom-control-input"
        //                     id="customCheck1"
        //                     type="checkbox"
        //                     onChange={this.getLocation(this.props.coords.latitude,this.props.coords.longitude)}
        //                 />
        //                 <label className="custom-control-label" htmlFor="customCheck1">
        //                     Unchecked
        //                 </label>
        //             </div>
        //             ) : (<div>Getting Location</div>)
        //         </Container>


        //     </>
        // );

    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(locationInput);