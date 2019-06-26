import React from 'react';
import SoloCouch from "./Header.png"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Responsive } from "semantic-ui-react"


class NavBar extends React.Component {






  componentDidMount(){
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/v1/auto",{
      headers:{
        "Authorization": token
      }
    }).then(response => response.json())
    .then(user =>{
      this.props.setUser(user)
    })
  }

  logOut = () =>{
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

function mapStateToProps(state){
  return{current_user: state.current_user}
}

  function mapDispatchToProps(dispatch){
    return{
      deleteUser:()=>{
        dispatch({type:"DELETE_CURRENT_USER", payload: null})
      },
      setUser: (user) =>{
        dispatch({type:"SET_CURRENT_USER", payload: user})
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
