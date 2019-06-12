import React from 'react';
import HotPotatoes from "./containers/HotPotatoes"
import WatchList from "./containers/WatchList"
import { connect } from "react-redux"

class UserHomePage extends React.Component {

componentDidMount(){
  this.currentUserBookmark()
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




  render() {
    return (
      <div>
      <h1>{localStorage.user_name} </h1>
      <img src={localStorage.avatar} alt=""/>

 <WatchList />
 <HotPotatoes />
      </div>
    );
  }

}//------------------end of class---------------------------------

function mapStateToProps(state){

return{current_user: state.current_user}
}

function mapDispatchToProps(dispatch){
  return{
    addBookmarks:(bookmarks) =>{
      dispatch({type:"ADD_BOOKMARKS", payload: bookmarks})
    }

  }
}





export default connect(mapStateToProps,mapDispatchToProps)(UserHomePage)
