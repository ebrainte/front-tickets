import React from "react";

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

class Login extends React.Component {
  state = {};
  
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginok: String
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleUsernameChange(event) {
    console.log(event.target);
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }


  handlePasswordChange(event) {
    console.log(event);
    this.setState({password: event.target.value});
    console.log(this.state.password);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }

  handleClick(event) {
    event.preventDefault();
    var payload = {
      "username": this.state.username,
      "password": this.state.password
    }

    console.log(payload);

    
    fetch('http://back.arielsandor.com:47001/login', {
      method: 'POST',
      credentials: 'include',
      mode: "cors",
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }).then((response) => {
      if (response.ok) {
        this.setState({loginok: "Bienvenido!"});
        console.log(response.json());
      } else {
        this.setState({loginok: "Usuario o clave incorrecta, intente nuevamente!"});
        throw new Error('Usuario o clave incorrecta, intente nuevamente!');
      }
    })
    .then((responseJson) => {
      // Do something with the response
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <TicketsNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Inicia sesion con:</small>
                      </div>
                      <div className="btn-wrapper text-center">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("assets/img/icons/common/facebook.png")}
                            />
                          </span>
                          <span className="btn-inner--text">Facebook</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>O inicia con tu usuario y contraseña:</small>
                      </div>
                      <form>
                        <Form role="form">
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Nombre de Usuario" value={this.state.username} onChange={this.handleUsernameChange} />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Contraseña"
                                type="password"
                                autoComplete="off"
                                value={this.state.password} onChange={this.handlePasswordChange}
                              />
                            </InputGroup>
                          </FormGroup>
                            {this.state.loginok}
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              type="submit"
                              onClick={(event) => this.handleClick(event)}
                            >
                              Iniciar sesion
                            </Button>
                          </div>
                        </Form>
                      </form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col className="text-right" xs="12">
                      <a
                        className="text-light"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Registrate!</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Login;
