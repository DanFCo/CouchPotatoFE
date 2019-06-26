import React, { Component } from 'react';
import Header from "./couchpotato.png"
import MainPic from "./couch_sofa.png"
import SignUp from "./SignUp"


class Splash extends Component {



state={
  clicked: false
}


formHandler = () =>{
  this.setState(prevState => ({
  clicked: !prevState.clicked
}))
}


  render() {
    return (
      <div>

      <img src={Header} alt=""/>
      <form onSubmit={this.props.submitHandler}>

      Name: <input onChange={this.props.changeHandler} name="username" type="text" placeholder="username" minLength="3" required="required"/>
      <br/>
      Password: <input onChange={this.props.changeHandler} name="password" type="password" minLength="4" required="required"/>
      <br/>
      <input name="submit" type="submit" value="LOGIN"/>
      </form>

    <button onClick={this.formHandler}>SIGN UP</button>

      <br/>
      {this.state.clicked ? <SignUp routerProps={this.props.routerProps} /> : null}
      <img src={MainPic} alt="" className="bg"/>
      </div>
    );
  }

}

export default Splash;
