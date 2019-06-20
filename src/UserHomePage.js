import React, { Fragment } from 'react';
import HotPotatoes from "./containers/HotPotatoes"
import WatchList from "./containers/WatchList"
import { connect } from "react-redux"
import PotatoCard from "./components/PotatoCard"
import { Card, Icon } from "semantic-ui-react"

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


  extra = () =>{
    const number = this.props.bookmarks.length
    return (<a>
      <Icon name='user' />
      {number} Shows In Watch List
    </a>)
  }


  render() {

    return (
      <Fragment>
        <div className="animate-pop-in header">
<Card.Group centered itemsPerRow={4}>
          <Card
            raised
            image={localStorage.avatar}
            header={localStorage.user_name}
            meta={Date()}
            extra={this.extra()}
            />
        <Fragment>
          {this.props.hottestPotato ?
<Card>
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
    }
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(UserHomePage)
