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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/css/indexstyles.css";

import Index from "views/Index.jsx";
import Event from "views/routes/Event.jsx";
import Search from "views/routes/Search.jsx";
import Login from "views/routes/Login.jsx";
import Logout from "views/routes/Logout.jsx";
import Profile from "views/routes/Profile.jsx";
import Register from "views/routes/Register.jsx";
import AddEvent from "views/routes/AddEvent.jsx";
import Type from "views/routes/Type.jsx";
import Cart from "views/routes/Cart.jsx";
import Buy from "views/routes/Buy.jsx"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <Route path="/event/:handle" exact render={props => <Event {...props} />} />
      {/* <Route path="/search/:eventid/:address" exact render={props => <Search {...props} />} /> */}
      <Route path="/search/:eventname/:address" component={Search} />

      
      <Route path="/type/:handle" exact render={props => <Type {...props} />} />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route path="/logout" exact render={props => <Logout {...props} />} />
      <Route path="/profile-page" exact render={props => <Profile {...props} />} />
      <Route path="/register-page" exact render={props => <Register {...props} />} />
      <Route path="/addevent" exact render={props => <AddEvent {...props} />} />
      <Route path="/cart" exact render={props => <Cart {...props} />} />
      <Route path="/buy/:handle" exact render={props => <Buy {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
