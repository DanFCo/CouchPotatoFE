import React from 'react';
import SoloCouch from "./Header.png"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Responsive } from "semantic-ui-react"


class NavBar extends React.Component {



  logOut = () =>{
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_name")
    localStorage.removeItem("avatar")
    localStorage.removeItem("token")
    this.props.deleteUser()
    this.props.history.push('/')
  }



  render() {

    return (
      <Responsive>

        <div className="NavBar">
          <div className="avatar-button">
          <Link to="/user">
            <button>
              <img src={localStorage.avatar} alt="" height="50" width="50"/></button>
            </Link>
            <Link to="/search">
              <Button color="black" className="NavButton">Channel Surf</Button>
            </Link>
            </div>
            <img src={SoloCouch} alt=""/>
            <Button color="black" className="NavButton" onClick={this.logOut}>LOGOUT</Button>

          </div>

        </Responsive>
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
