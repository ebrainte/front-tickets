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

class Register extends React.Component {
  state = {};
  
  
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      username: '',
      password: '',
      password2: '',
      cellphone: '',
      address: ''
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state);
  }
  

  handleClick(event) {

    // {
// 	"fullName": "ariel",
// 	"email": "ariel@sandor.com",
// 	"username": "arielsandor",
// 	"password": "password01",
// 	"password2": "password01",
// 	"cellphone": "1145651123",
// 	"isRestaurant": "false",
// 	"address": "pirulo 1234"
// }


    event.preventDefault();
    var payload = {
      "fullName": this.state.fullName,
      "email": this.state.email,
      "username": this.state.username,
      "password": this.state.password,
      "password2": this.state.password2,
      "cellphone": this.state.cellphone,
      "address": this.state.address
    }
    console.log(payload);

    
    fetch('http://back.arielsandor.com:47001/register', {
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
                   
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Para registrarte tenes que ingresar los siguientes datos:</small>
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
                              <Input placeholder="Nombre Completo" type="text" name="fullName" onChange={this.handleChange} />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Email" type="email" name="email" onChange={this.handleChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Nombre de Usuario" type="text" name="username" onChange={this.handleChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Contraseña" type="password" autoComplete="off" name="password" onChange={this.handleChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Vuelva a escribir la contraseña" type="password" autoComplete="off" name="password2" onChange={this.handleChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Numero de telefono" type="text" name="cellphone" onChange={this.handleChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Direccion (Ej: Lima 775, Buenos Aires, Argentina)" type="text" name="address" onChange={this.handleChange}/>
                            </InputGroup>
                          </FormGroup>
                         
                          <Row className="my-4">
                            <Col xs="12">
                              <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                  className="custom-control-input"
                                  id="customCheckRegister"
                                  type="checkbox"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheckRegister"
                                >
                                  <span>
                                   Acepto los terminos y condiciones
                                  </span>
                                </label>
                              </div>
                            </Col>
                          </Row>
                          <div className="text-center">
                            <Button
                              className="mt-4"
                              color="primary"
                              type="button"
                              onClick={(event) => this.handleClick(event)}
                            >
                              Crear cuenta
                            </Button>
                          </div>
                        </Form>
                      </form>
                    </CardBody>
                  </Card>
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

export default Register;
