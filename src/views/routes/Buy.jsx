import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  Form,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  FormGroup,
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
import GMaps from "components/GMaps.jsx";
import Footer from "components/Footers/Footer.jsx";
import Loader from "components/Loader.jsx";
import Alert from "components/Alert.jsx";

class Event extends React.Component {
  state = {
    eventData: [],
    loginAttributes: [],
    tabs: 1,
    alertVisible: false,
    alertType: String,
    alertMessage: String,
    alertMessageStrong: String
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  async handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    await this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }



  handleClick(event) {
    this.setState({ loading: true })
    event.preventDefault();
    var payload = {
      "withCC": true,
      "creditCardNumber": this.state.creditcardnumber,
      "expiryDate": this.state.expirydate,
      "payments": this.state.payments,
      "fullName": this.state.loginattributes.fullName,
      "email": this.state.loginattributes.email,
      "eventName": this.state.eventData[0].eventName,
      "eventPricing": this.state.eventData[0].eventPricing,
      "eventDate": this.state.eventData[0].eventDate,
    }
    console.log(payload);


    fetch('http://localhost:47002/apiTickets/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((response) => {
      if (response.ok) {
        console.log("DIO OK");
        console.log(response.json());
        this.setState({ loading: false })
        this.setState({ alertVisible: true, alertType: "success", alertMessageStrong: "Gracias por su compra!", alertMessage: "Se ha enviado un email a su casilla con los datos de su compra! Sera redirigido al inicio en 5 segundos" })
        setTimeout(
          function() {
              this.setState({alertVisible: false});
              this.props.history.push('/');
          }
          .bind(this),
          5000
        );
      } else {
        this.setState({ loading: false })
        throw new Error('Error en la carga, intente nuevamente!');
      }

    })
      .then((responseJson) => {
      })
      .catch((error) => {
        console.log(error)
      });


  }

  handleReservationClick(event) {
    this.setState({ loading: true })
    event.preventDefault();
    var payload = {
      "withCC": false,
      "fullName": this.state.loginattributes.fullName,
      "email": this.state.loginattributes.email,
      "eventName": this.state.eventData[0].eventName,
      "eventPricing": this.state.eventData[0].eventPricing,
      "eventDate": this.state.eventData[0].eventDate,
    }
    console.log(payload);


    fetch('http://localhost:47002/apiTickets/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((response) => {
      if (response.ok) {
        console.log(response.json());
        this.setState({ loading: false })
        this.setState({ alertVisible: true, alertType: "success", alertMessageStrong: "Gracias por su reserva!", alertMessage: "Se ha enviado un email a su casilla con los datos de su reserva! Sera redirigido al inicio en 5 segundos" })
        setTimeout(
          function() {
              this.setState({alertVisible: false});
              this.props.history.push('/');
          }
          .bind(this),
          5000
        );
      } else {
        this.setState({ loading: false })
        throw new Error('Error en la carga, intente nuevamente!');
      }

    })
      .then((responseJson) => {
      })
      .catch((error) => {
        console.log(error)
      });
  }



  
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };


  componentDidMount() {
    const { handle } = this.props.match.params
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    console.log("cargo esto");


    fetch('http://back.arielsandor.com:47001/loginstatus', { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        console.log("INFO DEL NAVBAR");
        if (data.loggedin === true) {
          console.log("estoy logueado")

          //bajo la informacion del usuario
          fetch('http://back.arielsandor.com:47001/user', { credentials: 'include' })
            .then(res => res.json())
            .then((data) => {
              this.setState({ loginattributes: data });
              console.log(this.state.loginattributes);
            })
            .catch(console.log)

        };
        if (data.loggedin === false) {
          console.log("no estoy logueado")
        };
        this.setState({ loggedin: data.loggedin });
      })
      .catch(console.log)

    fetch('http://localhost:47002/apiTickets/getEventsbyId', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: handle
      })
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ eventData: data })
      })
    console.log(this.state.eventData);






  }
  render() {
    let loginbutton, reservationbutton;
    if (this.state.loggedin) {
      loginbutton = <Button className="mt-4" color="primary" type="button" onClick={(event) => this.handleClick(event)}> Proceder al Pago </Button>;
      reservationbutton = <Button className="mt-4" color="primary" type="button" onClick={(event) => this.handleReservationClick(event)}> Reserva tu Entrada </Button>;;
    } else {
      loginbutton = "Debes estar logueado para continuar";
      reservationbutton = "Debes estar logueado para continuar";
    }
    return (
      <>
        <TicketsNavbar />
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
              </div>
              Informacion del Evento:
        </section>

          </div>

          <div className="shape shape-style-1 shape-default">
          {this.state.alertVisible && <Alert color={this.state.alertType} text={this.state.alertMessage} textStrong={this.state.alertMessageStrong} />}
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="position-relative"></div>
          <section className="section bg-secondary">


            <Container>
              <div className="nav-wrapper">
                <Nav
                  className="nav-fill flex-column flex-md-row"
                  id="tabs-icons-text"
                  pills
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.tabs === 1}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === 1
                      })}
                      onClick={e => this.toggleNavs(e, "tabs", 1)}
                      href="#pablo"
                      role="tab"
                    >
                      <i className="ni ni-credit-card mr-2" />
                      Tarjeta de Credito
              </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.tabs === 2}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === 2
                      })}
                      onClick={e => this.toggleNavs(e, "tabs", 2)}
                      href="#pablo"
                      role="tab"
                    >
                      <i className="ni ni-money-coins mr-2" />
                      Reserva (Pago en Efectivo)
              </NavLink>
                  </NavItem>

                </Nav>
              </div>
              <Card className="shadow">
                <CardBody>
                  <TabContent activeTab={"tabs" + this.state.tabs}>


                    {/* CONTENIDO DEL TAB 1 (PAGO CON TARJETA DE CREDITO) */}


                    <TabPane tabId="tabs1">
                      <p className="description">

                        <Row className="justify-content-center">
                          <Col lg="12">
                            <Card className="bg-secondary shadow border-0">

                              <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                  <small>Ingrese los siguientes datos para el pago con tarjeta de Credito:</small>
                                </div>
                                <form>
                                  <Form role="form">
                                    <FormGroup>
                                      <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <i className="ni ni-hat-3" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder='Nombre (Como figura en la tarjeta)' type="text" name="ccname" onChange={this.handleChange} />
                                      </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                      <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <i className="ni ni-credit-card" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Numero de la TC" type="text" name="creditcardnumber" onChange={this.handleChange} />
                                      </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                      <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <i className="ni ni-credit-card" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Fecha de Vencimiento (Formato MM/AA)" type="text" name="expirydate" onChange={this.handleChange} />
                                      </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                      <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <i className="ni ni-bold-right" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Tipo" type="select" name="payments" onChange={this.handleChange}>
                                          <option>Cantidad de Cuotas</option>
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          <option>4</option>
                                          <option>5</option>
                                          <option>6</option>
                                          <option>7</option>
                                          <option>8</option>
                                          <option>9</option>
                                          <option>10</option>
                                          <option>11</option>
                                          <option>12</option>
                                        </Input>
                                      </InputGroup>
                                    </FormGroup>



                                    <div className="text-center">
                                      {loginbutton}
                                    </div>
                                    {this.state.loading && <Loader type="linear" />}
                                  </Form>
                                </form>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>















                      </p>

                    </TabPane>
                    <TabPane tabId="tabs2">

                      {/* CONTENIDO DEL TAB 2 (PAGO EN EFECTIVO) */}

                      <div className="text-center">
                        {reservationbutton}
                      </div>
                      {this.state.loading && <Loader type="linear" />}

                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Container>

            {this.state.eventData.map((eventData) => (
              <Container>
                <Row className="row-grid align-items-center">
                  <Col md="6">
                    <Card className="bg-default shadow border-0">
                      <CardImg
                        alt="..."
                        src={eventData.imageUrl}
                        top
                      />
                      <blockquote className="card-blockquote">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-bg"
                          preserveAspectRatio="none"
                          viewBox="0 0 583 95"
                        >
                          <polygon
                            className="fill-default"
                            points="0,52 583,95 0,95"
                          />
                          <polygon
                            className="fill-default"
                            opacity=".2"
                            points="0,42 583,95 683,0 0,95"
                          />
                        </svg>
                        <h4 className="display-3 font-weight-bold text-white">
                          {eventData.eventName}
                        </h4>
                        <p className="lead text-italic text-white">
                          Calificacion: {eventData.starAverage}<br></br>
                          Precio: {eventData.eventPricing}
                        </p>
                      </blockquote>
                    </Card>
                  </Col>
                  <Col md="6">
                    <div className="pl-md-5">
                      <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                        <i className="ni ni-check-bold" />
                      </div>
                      <h3>Informacion</h3>
                      <p className="lead">
                        {eventData.eventDescription}
                      </p>
                      <a>

                      </a>
                    </div>
                  </Col>
                </Row>
              </Container>
            ))}
          </section>
          <section className="section section-lg" md="6">
            {this.state.eventData.map((eventData) => (
              <Container>
                <Row className="row-grid align-items-center">
                  <Col className="order-md-2" md="6">
                    <GMaps latitude={eventData.geo[0]} longitude={eventData.geo[1]} name={eventData.eventLocation} />
                  </Col>
                  <Col className="order-md-1" md="6">
                    <div className="pr-md-5">
                      <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                        <i className="ni ni-settings-gear-65" />
                      </div>
                      <h3>Donde es?</h3>
                      <p>
                        {eventData.eventLocation} <br></br>
                        {eventData.eventAddress}
                      </p>
                      <ul className="list-unstyled mt-5">
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            <div>
                              <Badge
                                className="badge-circle mr-3"
                                color="success"
                              >
                                <i className="ni ni-satisfied" />
                              </Badge>
                            </div>
                            <div>
                              <h6 className="mb-0">
                                Fecha: {eventData.eventDate}
                              </h6>
                            </div>

                          </div>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Container>
            ))}
          </section>
        </main>

        <Footer />
      </>
    );
  }
}

export default Event;