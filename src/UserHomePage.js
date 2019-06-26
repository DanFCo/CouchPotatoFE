import React, { Fragment } from 'react';
import HotPotatoes from "./containers/HotPotatoes"
import WatchList from "./containers/WatchList"
import { connect } from "react-redux"
import PotatoCard from "./components/PotatoCard"
import { Card, Icon } from "semantic-ui-react"

class UserHomePage extends React.Component {

  componentDidMount(){
    this.refreshHandler()
    this.currentUserBookmark()
    this.getHottestPotato()
    this.getMostBookmarked()
  }


refreshHandler = () =>{
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

getMostBookmarked = () =>{
  fetch("http://localhost:3000/api/v1/most")
  .then(response => response.json())
  .then(console.log)
}



  extra = () =>{
    const number = this.props.bookmarks.length
    return (<a>
      <Icon name='bookmark' />
      {number} Shows In Watch List
    </a>)
  }


  render() {
console.log(this.props)
    return (
      <Fragment>
        <div className="animate-pop-in header">
<Card.Group centered itemsPerRow={4}>
          <Card
            raised
            image={localStorage.avatar}
            header={this.props.current_user.username}
            meta={Date()}
            extra={this.extra()}
            />
        <Fragment>
          {this.props.hottestPotato ?
            <Card className="eat">
              <PotatoCard history={this.props.history} {...this.props.hottestPotato} hottest={true}/>
            </Card>
            :
            "NO CURRENT POTATOES"
          }
        </Fragment>
          </Card.Group>
        </div>
        <div>
          <HotPotatoes history={this.props.history} />
          <WatchList history={this.props.history} />
        </div>
      </Fragment>
    );
  }

}//------------------end of class---------------------------------

function mapStateToProps(state){
  return{current_user: state.current_user,
    hottestPotato: state.hottestPotato,
    bookmarks: state.bookmarks
  }
}

function mapDispatchToProps(dispatch){
  return{
    addBookmarks:(bookmarks) =>{
      dispatch({type:"ADD_BOOKMARKS", payload: bookmarks})
    },
    setHotPotato:(potato) =>{
      dispatch({type: "ADD_HOT_POTATO", payload: potato})
    },
    setUser:(user) =>{
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(UserHomePage)
