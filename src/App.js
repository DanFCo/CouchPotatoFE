import React from 'react';

import './App.css';
import NavBar from "./NavBar"
import ShowMain from "./ShowMain"
import Search from "./Search"
import UserHomePage from "./UserHomePage"
import { Route, Switch } from 'react-router-dom'
import Splash from "./Splash"

class App extends React.Component {


  state={
    username: "",
    password:"",
    current_user: null
  }




  setCurrentUser = (user) =>{
    localStorage.setItem("user_id",user.user.id)
    localStorage.setItem("user_name",user.user.username)
    localStorage.setItem("avatar",user.user.avatar)
    this.setState({
      current_user: user
    })
  }


  deleteCurrentUser = () =>{
    this.setState({
      current_user: null
    })
  }



  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }




  submitHandler = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
    .then(data =>{
      if(data.errors){
        alert(data.errors)
      }else{
        this.setCurrentUser(data)
        this.props.history.push('/user')
      }
    })
  }


  render(){
    return (
      <div className="a">
        {
        localStorage.user_id
          ?
          <React.Fragment>
          <NavBar deleteCurrentUser={this.deleteCurrentUser} />
          <Switch>
            <Route exact path="/show/:id" component={ShowMain} />
            <Route exact path="/search" component={Search} />
          <Route exact path="/user" component={UserHomePage} />
         </Switch>
         </React.Fragment>
          :
          <Splash submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          routerProps={this.props} />
      }






  </div>
)
}
}

export default App;
