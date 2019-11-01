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
  Col
} from "reactstrap";

class Inputs extends React.Component {
  state = {};

  

constructor(props){
  super(props);
  
  this.state = {
  }
  
  this.updateInput = this.updateInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
  
  
  updateInput(event){
    this.setState({username : event.target.value});
    console.log(this.state.username);
    if(event.keyCode === 13) { 
      // this.props.push(`${this.state.where}/${this.state.what}`)
    }
  }
  // handleKeyDown(event) {
  //   if(event.keyCode === 13) { 
  //       this.setState({username : event.target.value});
  //       console.log(this.state);
  //   }
  // }
  
  
  handleSubmit(){
  console.log('Your input value is: ' + this.state)
  //Send state to the server code
  }



  render() {
    return (
      <>
        <section className="section pb-0 section-components">
          <div className="py-5 bg-secondary">
            <Container>
              <div className="mb-3">
                <small className="text-uppercase font-weight-bold">
                  Busca los mejores eventos:
                </small>
              </div>
              <Row>
                <Col lg="11" md="11" sm="11">
                <FormGroup
                    className={classnames({
                      focused: this.state.searchAltFocused
                    })} onSubmit={this.handleSubmit}
                  >
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
                        onKeyDown={this.updateInput}
                        onChange={this.updateInput}
                        
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </>
    );
    
  }}

export default Inputs;
