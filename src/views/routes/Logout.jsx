import React from "react";

import { Redirect } from "react-router-dom";

class Logout extends React.Component {

  //when the component mounts, this gets executed
  componentDidMount() {
    console.log("deslogueando");
    fetch('http://localhost:3001/logout', {      
        credentials: 'include',
        mode: "cors",})
      .then(res => res)
      .then((data) => {
        console.log(data)
      })
      .catch(console.log)
  }




  render() {
     return (
        <>
            <Redirect to="/" push={true} />;
        </>
        );
      }
    }
    
    export default Logout;