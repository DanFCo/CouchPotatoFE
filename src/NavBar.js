import React from 'react';
import SoloCouch from "./Header.png"
import { Link } from "react-router-dom"



class NavBar extends React.Component {



logOut = () =>{
  localStorage.removeItem("user_id")
  localStorage.removeItem("user_name")
  localStorage.removeItem("avatar")
  this.props.deleteCurrentUser()
}



  render() {
    return (
      <div className="buttons">
      <div className="NavBar">
      <Link to="/user">
        <button className="NavButton">
        <img src={localStorage.avatar} alt="" height="50" width="50"/> <h2>{localStorage.user_name}</h2></button>
      </Link>
      <Link to="/search">
      <button className="NavButton">SEARCH</button>
      </Link>
      <img src={SoloCouch} alt=""/>
      <button className="NavButton" onClick={this.logOut}>LOGOUT</button>

      </div>
      </div>
    );
  }

}

export default NavBar
