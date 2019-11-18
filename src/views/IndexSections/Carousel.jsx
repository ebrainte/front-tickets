
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      value : [],
      images: [
        {
          src: require("assets/img/theme/img-1-1200x1000.jpg"),
          altText: "",
          caption: "",
          header: ""
        },
        {
          src: require("assets/img/theme/img-2-1200x1000.jpg"),
          altText: "",
          caption: "",
          header: ""
        }
      ]
    };
  }
  
  componentDidMount() {

    fetch('http://localhost:47002/apiTickets/getEvents')
    .then(res => res.json())
    .then((data) => {
      console.log("primera linea");
      var urlList = data.map(function(url){
        return {src : url.imageUrl,
          altText: "",
          caption: "",
          header: ""};
      })
      this.setState({ images : urlList })
    })
  }

  render() {
    
    return (
      <>
      {/* {this.state.images.map((image) =>
        items = {
          src: image.imageUrl,
          altText: "",
          caption: "",
          header: ""
        }
      )} */}
        <section className="section section-shaped">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-white font-weight-light">
                  Quienes somos
                </h1>
                <p className="lead text-white mt-4">
                 Somos una empresa joven de capitales Argentinos.
                </p>
                <Button
                  className="btn-white mt-4"
                  color="default"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alerts?ref=adsr-landing-page"
                >
                  Ver mas
                </Button>
              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={this.state.images} />
                </div>
              </Col>
            </Row>
          </Container>
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
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </>
    );
  }
}

export default Carousel;
