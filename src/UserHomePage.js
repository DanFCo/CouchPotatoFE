import React from 'react';
import HotPotatoes from "./containers/HotPotatoes"
import WatchList from "./containers/WatchList"
import { connect } from "react-redux"
import PotatoCard from "./components/PotatoCard"

class UserHomePage extends React.Component {

  componentDidMount(){
    this.currentUserBookmark()
    this.getHottestPotato()
  }

  currentUserBookmark = () => {
    let user = this.props.current_user

    fetch("http://localhost:3000/api/v1/bookmarks/get",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(user)
    }).then (response =>response.json())
    .then(bookmarks =>{
      this.props.addBookmarks(bookmarks)
    })
  }

getHottestPotato = () =>{
  fetch("http://localhost:3000/api/v1/potatos")
    .then(response => response.json())
    .then(potato =>{
      this.props.setHotPotato(potato)
    })
}


  render() {
    
    return (
      <div>
        <h1>{localStorage.user_name} </h1>
        <img src={localStorage.avatar} alt=""/>
        <h4>HOTTEST POTATO</h4>
{this.props.hottestPotato ?

<PotatoCard history={this.props.history} {...this.props.hottestPotato} hottest={true}/>
:
"NO CURRENT POTATOES"
}
        <WatchList history={this.props.history} />
        <HotPotatoes history={this.props.history} />
      </div>
    );
  }

}//------------------end of class---------------------------------

function mapStateToProps(state){
  return{current_user: state.current_user,
  hottestPotato: state.hottestPotato}
}

function mapDispatchToProps(dispatch){
  return{
    addBookmarks:(bookmarks) =>{
      dispatch({type:"ADD_BOOKMARKS", payload: bookmarks})
    },
    setHotPotato:(potato) =>{
      dispatch({type: "ADD_HOT_POTATO", payload: potato})
    }
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(UserHomePage)
