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
import ModalG from "../IndexSections/ModalG.jsx"
import { Link } from "react-router-dom";
import InputSearch from "../IndexSections/InputSearch.jsx"

// index page sections
import Download from "../IndexSections/Download.jsx";


class Search extends React.Component {
  state = {
    eventData: [],
    searchValue: this.props.match.params.eventname,
    searchAddress: this.props.match.params.address,
    inputstate: [],
    inputvalue: []
  };

  //Esto es para pasar el evento del hijo al padre
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  handler(inputValue) {
    this.setState({
      inputstate: "redirect",
      inputvalue: inputValue
    })
    console.log("Im on search and this is the search value: " + this.state.searchValue);
  }


  componentDidMount() {
    console.log("cargo esto");
    const { eventname } = this.props.match.params
    console.log(eventname);
    const { address } = this.state.searchAddress;
    console.log(address);
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    console.log("cargo esto");

    fetch('http://localhost:47002/apiTickets/getEventsbyName', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: eventname,
        address: this.state.searchAddress
      })
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ eventData: data })
      })
    console.log(this.state.eventData);
  }
  render() {
    // if (this.state.inputstate === "redirect") {
    //   console.log("i must leave here with this value:" + this.state.inputvalue);
    //   this.props.history.push('/search/' + this.state.inputvalue)
    // }
    return (
      <>
        <TicketsNavbar />
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
              </div>
              Resultados de la busqueda: {this.state.searchValue} con direccion: {this.state.searchAddress}
              {/* <InputSearch action={this.handler} /> */}
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
          <section className="section pb-0 section-components">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">

                    {this.state.eventData.map((rec) => (

                      <Col lg="4">
                        <Card className="card-lift--hover shadow border-0">
                          <CardBody className="py-5">
                            <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                              <i className="ni ni-check-bold" />
                            </div>
                            <h6 className="text-success text-uppercase">
                              {rec.eventName}
                            </h6>
                            <p className="description mt-3 box">
                              {rec.eventDescription}
                            </p>
                            <p className="description mt-3 box">
                              A {rec.distance} de distancia
                            </p>
                            <div>
                              <Badge color="success" pill className="mr-1">
                                {rec.eventType}
                              </Badge>
                            </div>
                            <ModalG buttonName="Ver mas" title={rec.eventName} body={rec.eventDescription} />
                            <Link to={"/event/" + rec._id} text="pirulito" ><Button
                              className="mt-4"
                              color="success"
                              href=""
                            // onClick={e => e.preventDefault()}
                            >
                              Comprar
                              </Button></Link>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section bg-secondary">
          </section>
        </main>

      </>
    );
  }
}

export default Search;