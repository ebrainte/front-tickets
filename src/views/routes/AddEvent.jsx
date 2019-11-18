import React from "react";
import ReactDatetime from "react-datetime";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";


// core components
import TicketsNavbar from "components/Navbars/TicketsNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import Loader from "components/Loader.jsx";

import ModalG from "../IndexSections/ModalG.jsx"
import { Link } from "react-router-dom";
import InputSearch from "../IndexSections/InputSearch.jsx"


class AddEvent extends React.Component {
    state = {};


    constructor(props) {
        super(props);
        this.state = {
            eventDate: '',
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    onDateChange = eventDate => this.setState({ eventDate })

    handleClick(event) {
        this.setState({ loading: true })
        // "eventName": "Mana",
        // "eventDate": "2019-11-28",
        // "eventType": "Musica",
        // "eventLocation": "Teatro Gran Rex",
        // "eventAddress": "Avenida Corrientes 1528, Buenos Aires, Argentina",
        // "eventDescription": "Concierto de Mana",
        // "eventPricing": 2630,
        // "imageUrl": "https://i2.wp.com/contextodiario.com/wp-content/uploads/2018/09/mana-.jpg?w=800&ssl=1",
        // "starAverage": 4.5

        event.preventDefault();
        var payload = {
            "eventName": this.state.eventName,
            "eventDate": this.state.eventDate,
            "eventType": this.state.eventType,
            "eventLocation": this.state.eventLocation,
            "eventAddress": this.state.eventAddress,
            "eventDescription": this.state.eventDescription,
            "eventPricing": this.state.eventPricing,
            "imageUrl": this.state.imageUrl,
        }
        console.log(payload);


        fetch('http://localhost:47002/apiTickets/insertEvent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then((response) => {
            if (response.ok) {
                console.log(response.json());
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false })
                throw new Error('Error en la carga, intente nuevamente!');
            }

        })
            .then((responseJson) => {
                // Do something with the response
            })
            .catch((error) => {
                console.log(error)
            });
    }



    render() {
        return (
            <>
                <TicketsNavbar />
                <main className="profile-page" ref="main">
                    <section className="section-profile-cover section-shaped my-0">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default alpha-4">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="fill-white"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300 bg-secondary shadow border-0">

                                <Container>
                                    <Row className="justify-content-center">
                                        <Col lg="12">

                                            <CardBody className="px-lg-5 py-lg-5">
                                                <div className="text-center text-muted mb-4">
                                                    <small>Crear un nuevo evento:</small>
                                                </div>
                                                <form>
                                                    <Form role="form">
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-bold-right" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Nombre del Evento" type="text" name="eventName" onChange={this.handleChange} required={true}/>
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-bold-right" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Tipo" type="select" name="eventType" onChange={this.handleChange}>
                                                                    <option>Teatro</option>
                                                                    <option>Musica</option>
                                                                    <option>Cine</option>
                                                                </Input>
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup className="focused">
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-calendar-grid-58" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <ReactDatetime
                                                                    inputProps={{
                                                                        placeholder: "Fecha"
                                                                    }}
                                                                    dateFormat="DD/MM/YYYY"
                                                                    timeFormat="HH:mm:ss"
                                                                    onChange={this.onDateChange}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-building" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Ubicacion (Ej: Teatro Gran Rex)" type="text" name="eventLocation" onChange={this.handleChange} />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-world" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Direccion (Ej: Lima 775, Buenos Aires, Argentina)" type="text" name="eventAddress" onChange={this.handleChange} />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-collection" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Descripcion" type="textarea" rows="3" name="eventDescription" onChange={this.handleChange} />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-cart" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Precio" type="text" name="eventPricing" onChange={this.handleChange} />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-image" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="URL de la Imagen" type="text" name="imageUrl" onChange={this.handleChange} />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        {this.state.loading && <Loader type="linear" />}
                                                        <div className="text-center">
                                                            <Button
                                                                className="mt-4"
                                                                color="primary"
                                                                type="button"
                                                                onClick={(event) => this.handleClick(event)}
                                                            >
                                                                Crear Evento
                                                                </Button>
                                                        </div>
                                                    </Form>
                                                </form>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </Container>

                            </Card>
                        </Container>
                    </section>
                </main>
                <SimpleFooter />
            </>
        );
    }
}

export default AddEvent;