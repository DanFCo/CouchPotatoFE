import React from 'react';
import SoloCouch from "./Header.png"
import { Link } from "react-router-dom"
import { connect } from "react-redux"


class NavBar extends React.Component {



  logOut = () =>{
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_name")
    localStorage.removeItem("avatar")
    this.props.deleteUser()
    this.props.history.push('/')
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

  }//--------------------end of class--------------------------------



  function mapDispatchToProps(dispatch){
    return{
      deleteUser:()=>{
        dispatch({type:"DELETE_CURRENT_USER", payload: null})
      }
    }
  }

  export default connect(null, mapDispatchToProps)(NavBar)
