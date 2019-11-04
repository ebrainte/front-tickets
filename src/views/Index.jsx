import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import TicketsNavbar from "components/Navbars/TicketsNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";
import { Link } from "react-router-dom";

// index page sections
import Hero from "./IndexSections/Hero.jsx";
import Buttons from "./IndexSections/Buttons.jsx";
import InputSearch from "./IndexSections/InputSearch.jsx";
import CustomControls from "./IndexSections/CustomControls.jsx";
import Menus from "./IndexSections/Menus.jsx";
import Navbars from "./IndexSections/Navbars.jsx";
import Tabs from "./IndexSections/Tabs.jsx";
import Progress from "./IndexSections/Progress.jsx";
import Pagination from "./IndexSections/Pagination.jsx";
import Pills from "./IndexSections/Pills.jsx";
import Labels from "./IndexSections/Labels.jsx";
import Alerts from "./IndexSections/Alerts.jsx";
import Typography from "./IndexSections/Typography.jsx";
import Modals from "./IndexSections/Modals.jsx";
import Datepicker from "./IndexSections/Datepicker.jsx";
import TooltipPopover from "./IndexSections/TooltipPopover.jsx";
import Carousel from "./IndexSections/Carousel.jsx";
import Icons from "./IndexSections/Icons.jsx";
import Login from "./routes/Login.jsx";
import Download from "./IndexSections/Download.jsx";
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
    console.log("Im on index and this is the search value: " + inputValue);
  }

  //when the component Index mounts, this gets executed
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    fetch('http://localhost:8080/apiTickets/getEvents')
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
      console.log("i must leave here with this value:" + this.state.inputvalue);
      this.props.history.push('/search/' + this.state.inputvalue)
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
                              <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                <i className="ni ni-check-bold" />
                              </div>
                              <h6 className="text-success text-uppercase">
                                {rec.eventName}
                              </h6>
                              <p className="description mt-3 box">
                                {rec.eventDescription}
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
          </div>
          <div className="py-12 bg-secondary">
            <TooltipPopover />
          </div >
          <Carousel />
          <Buttons />
          <section className="section">
            <Container>
              <CustomControls />
              <Menus />
            </Container>
          </section>
          <Navbars />
          <section className="section section-components">
            <Container>
              <Tabs />
              <Row className="row-grid justify-content-between align-items-center mt-lg">
                <Progress />
                <Pagination />
              </Row>
              <Row className="row-grid justify-content-between">
                <Pills />
                <Labels />
              </Row>
              <Alerts />
              <Typography />
              <Modals />
              <Datepicker />

            </Container>
          </section>

          <Icons />
          <Login />
          <Download />
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Index;
