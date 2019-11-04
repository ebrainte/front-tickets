import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";


function LoggedInMenu(props){

  const username = props.profileData.username;
  console.log(props);
  return (  
  <UncontrolledDropdown nav>
    <DropdownToggle nav>
      <i className="ni ni-circle-08" />
      <span className="nav-link-inner--text">Bienvenido, {username}</span>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem to="/profile-page" tag={Link}>
        Ver Perfil
      </DropdownItem>
      <DropdownItem to="/logout" tag={Link}>
        Cerrar Sesion
      </DropdownItem>
    </DropdownMenu>
    </UncontrolledDropdown>
    
    )


}

function LoggedOutMenu(){

  return (
    <UncontrolledDropdown nav>
    <DropdownToggle nav>
      <i className="ni ni-circle-08" />
      <span className="nav-link-inner--text">Inicia Sesion o Registrate</span>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem to="/login-page" tag={Link}>
        Iniciar Sesion
      </DropdownItem>
      <DropdownItem to="/register-page" tag={Link}>
        Registrarse
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
 
  
  )}

function ProfileMenu(props){

  const isLoggedIn = props.isLoggedIn;
  const profileData = props.profileData;
  if (isLoggedIn) {
    return <LoggedInMenu profileData={profileData}/>;
  }
  return <LoggedOutMenu />;
}


class TicketsNavbar extends React.Component {

  state = {
    loginattributes: [],
    loggedin: false
  }


  componentDidMount() {
    fetch('http://localhost:3001/loginstatus', {credentials: 'include'})
    .then(res => res.json())
    .then((data) => {
      console.log("INFO DEL NAVBAR");
      if(data.loggedin === true){
        console.log("estoy logueado")

        //bajo la informacion del usuario
        fetch('http://localhost:3001/user', {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
          this.setState({ loginattributes: data});
          console.log(this.state.loginattributes);
        })
        .catch(console.log)

      };
      if(data.loggedin === false){
        console.log("no estoy logueado")
      };
      this.setState({ loggedin: data.loggedin });
    })
    .catch(console.log)

    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Descubri</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="/ofertas"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            {/* <i className="ni ni-spaceship" /> */}
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Ofertas
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                            Los mejores descuentos en tickets de cine, teatro y musica.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            {/* <i className="ni ni-palette" /> */}
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              CINES
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              No tenes planes para el finde? Mirate una peli.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            {/* <i className="ni ni-ui-04" /> */}
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              TEATROS
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Todo el teatro para vos.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            {/* <i className="ni ni-ui-04" /> */}
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              MUSICA
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Las mejores bandas nacionales e internacionales.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Examples</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/landing-page" tag={Link}>
                        Landing
                      </DropdownItem>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Profile
                      </DropdownItem>
                      <DropdownItem to="/login-page" tag={Link}>
                        Login
                      </DropdownItem>
                      <DropdownItem to="/register-page" tag={Link}>
                        Register
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                
                
                <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                  {/* Chequeo si estoy logueado o no, y muestro un menu distinto */}
                  <ProfileMenu isLoggedIn={this.state.loggedin} profileData={this.state.loginattributes}/>

                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>

                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.facebook.com/creativetim"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Like us on Facebook
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.instagram.com/creativetimofficial"
                      id="tooltip356693867"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Follow us on Instagram
                    </UncontrolledTooltip>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default TicketsNavbar;
