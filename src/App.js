import React from 'react';
import './App.css';
import NavBar from "./NavBar"
import ShowMain from "./ShowMain"
import SearchPage from "./SearchPage"
import UserHomePage from "./UserHomePage"
import { Route, Switch } from 'react-router-dom'
import Splash from "./Splash"
import { connect } from "react-redux"


class App extends React.Component {


  state={
    username: "",
    password:""

  }



componentDidMount(){
  const token = localStorage.getItem("token")
  fetch("http://localhost:3000/api/v1/auto",{
    headers:{
      "Authorization": token
    }
  }).then(response => response.json())
  .then(user =>{
    debugger
    this.props.setUser(user)
  })
}



  setCurrentUser = (data) =>{
    localStorage.setItem("avatar", data.user.avatar)
    localStorage.setItem("token",data.jwt)
    this.props.setUser(data)

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
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
    .then(data =>{
      if(data.errors){
        alert(data.errors)
      }else{
        this.getPotatoes(data)
        this.setCurrentUser(data)
        this.props.history.push('/user')
      }
    })
  }

  getPotatoes = (user) =>{
    fetch('http://localhost:3000/api/v1/potatos/find_pots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
    .then(potatos =>{
      this.props.setPotatoes(potatos)
    })
  }


  render(){

    return (

      <div className="a">
        {
        localStorage.token
          ?
          <React.Fragment>
          <NavBar history={this.props.history} />
          <Switch>
            <Route exact path="/show/:id" component={ShowMain} />
            <Route exact path="/search" render={(routerProps) => <SearchPage {...routerProps} />}/>
          <Route exact path="/user" component={(routerProps) => <UserHomePage {...routerProps} />}/>
          <Route exact path="/" component={Splash} />
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
}//--------------------------------------------------end of class

function mapStateToProps(state){

  return{}
}

function mapDispatchToProps(dispatch){
  return{
    setUser: (data)=>{
      dispatch({type:"SET_CURRENT_USER", payload: data.user})
    },
    setPotatoes:(potatoes)=>{
      dispatch({type:"ADD_POTATOES", payload: potatoes})
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
