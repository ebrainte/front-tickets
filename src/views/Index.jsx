import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import TicketsNavbar from "components/Navbars/TicketsNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import { Link } from "react-router-dom";

// index page sections
import Hero from "./IndexSections/Hero.jsx";
import InputSearch from "./IndexSections/InputSearch.jsx";
import Carousel from "./IndexSections/Carousel.jsx";
import ModalG from "./IndexSections/ModalG.jsx"

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
  Col
} from "reactstrap";


class Index extends React.Component {


  //ive added inputstate to the state, so i can change the status after render()
  state = {
    recommendations: [],
    inputstate: [],
    inputvalue: []
  }

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
    console.log("Im on index and this is the search value: " + inputValue.searchvalue);
  }

  //when the component Index mounts, this gets executed
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    fetch('http://localhost:47002/apiTickets/getEvents')
      .then(res => res.json())
      .then((data) => {
        this.setState({ recommendations: data })
        console.log(this.state.recommendations)
      })
      .catch(console.log)
  }




  render() {
    //thats the only way i found to enter here
    if (this.state.inputstate === "redirect") {
      console.log("i must leave here with this value:" + this.state.inputvalue.searchvalue);
      this.props.history.push('/search/' + this.state.inputvalue.searchvalue)
    }
    return (



      <>

        <TicketsNavbar />
        <main ref="main">

          <Hero />
          <InputSearch action={this.handler} />


          <div>
            <section className="section pb-0 section-components">
              <Container>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <Row className="row-grid">

                      {this.state.recommendations.map((rec) => (
                        <Col lg="4">

                          <Card className="card-lift--hover shadow border-0">
                            <CardBody className="py-5">                              
                              <h6 className="text-primary text-uppercase">
                                {rec.eventName}
                              </h6>
                              <CardImg alt="" src={rec.imageUrl} height={"160px"}/>
                              <p className="description mt-3 box">
                                {rec.eventDescription}
                              </p>
                              <div>
                                <Badge color="primary" pill className="mr-1">
                                  {rec.eventType}
                                </Badge>
                              </div>
                              <ModalG buttonName="Ver mas" title={rec.eventName} date={rec.eventDate} body={rec.eventDescription} location={rec.eventLocation} />
                              <Link to={"/event/" + rec._id} text="pirulito" ><Button
                                className="mt-4"
                                color="primary"
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
          </div>
          <Carousel />
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
