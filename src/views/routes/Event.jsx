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
import CardsFooter from "components/Footers/CardsFooter.jsx";
import GMaps from "components/GMaps.jsx";

// index page sections
import Download from "../IndexSections/Download.jsx";


class Event extends React.Component {
  state = {
    eventData: []
  };


  componentDidMount() {
    const { handle } = this.props.match.params
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    console.log("cargo esto");

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
        

      </>
    );
  }
}

export default Event;