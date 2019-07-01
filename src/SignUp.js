import React from 'react';
import { connect } from "react-redux"


class SignUp extends React.Component {


  state={
    username: "",
    password: "",
    passwordConfirmation: ""
  }



  setCurrentUser = (user) =>{

    localStorage.setItem("avatar",user.user.avatar)
    localStorage.setItem("token",user.jwt)
    this.props.setUser(user)
  }

  submitHandler = (event) => {
    event.preventDefault()
    if(this.state.password === this.state.passwordConfirmation){
      fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password,
            avatar: `https://api.adorable.io/avatars/285/${this.state.username}`
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.errors){
          alert(data.errors)
        } else{
          this.setCurrentUser(data)
          this.props.routerProps.history.push('/user')
        }
      })

    } else {
      alert("Passwords do not match, try again!")
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return (
      <div className="animate-pop-in">


        <form onSubmit={this.submitHandler}>
          <fieldset>
            <legend><h4> Fill Out Information Below! </h4></legend>
            <label>Username: </label>
            <input onChange={this.changeHandler} name="username" type="text" placeholder="username" minLength="3" required="required"/>
            <br/>
            <label>Password: </label>
            <input onChange={this.changeHandler} name="password" type="password" minLength="4" required="required"/>
            <br/>
            <label>Confirm Password:</label>
            <input onChange={this.changeHandler} name="passwordConfirmation" type="password" minLength="4" required="required"/>
            <br/>
            <input name="submit" type="submit"/>
          </fieldset>
        </form>
      </div>
    );
  }

}// <-------------------------------------end of class

export default connect(null, mapDispatchToProps)(SignUp)


function mapDispatchToProps(dispatch){
  return{
    setUser: (data)=>{
      dispatch({type:"SET_CURRENT_USER", payload: data.user})
    }
  }
}
