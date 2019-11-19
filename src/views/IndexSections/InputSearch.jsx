/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import Location from "components/Location.jsx"
import { Link } from "react-router-dom";

// reactstrap components
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Button,
  Col
} from "reactstrap";

class InputSearch extends React.Component {
  state = {};



  constructor(props) {
    super(props);

    this.state = {
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  updateInput(event) {
    this.setState({ searchvalue: event.target.value });
    console.log(this.state.searchvalue);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state);
    console.log('Your input value is: ' + this.state.searchvalue);
    //Send state to the server code
  }



  render() {
    return (
      <>
        <section className="section pb-0 section-components">
          <div className="py-5 bg-secondary">
            <Container>
              <Row>
                <div className="mb-3">
                  <small className="text-uppercase font-weight-bold">
                    Busca los mejores eventos:
                </small>
                </div>
              </Row>
              <Row>
                <Col lg="12" md="12" sm="12">
                  <form>
                    <FormGroup
                      className={classnames({
                        focused: this.state.searchAltFocused
                      })} role="form"
                    >
                      <Container>
                        <Row>
                          <Col lg="4" md="4" sm="4">
                            <Location ></Location>
                          </Col>
                          <Col lg="8" md="8" sm="8">
                            <InputGroup className="input-group-alternative mb-4">

                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Busca un evento por nombre..."
                                type="text"
                                onFocus={e => this.setState({ searchAltFocused: true })}
                                onBlur={e => this.setState({ searchAltFocused: false })}
                                // onKeyDown={this.updateInput}
                                onChange={this.updateInput}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                      </Container>
                      <Button className="btn-1 ml-1" color="danger" type="button" type="submit" onClick={e => this.handleSubmit(e)} value="Search" >Buscar</Button>
                    </FormGroup>
                  </form>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </>
    );

  }
}

export default InputSearch;
