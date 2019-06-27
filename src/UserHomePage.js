import React, { Fragment } from 'react';
import HotPotatoes from "./containers/HotPotatoes"
import WatchList from "./containers/WatchList"
import { connect } from "react-redux"
import PotatoCard from "./components/PotatoCard"
import ShowCard from "./components/ShowCard"
import { Card, Icon } from "semantic-ui-react"


class UserHomePage extends React.Component {

  componentDidMount(){
    this.getHottestPotato()
    this.getMostBookmarked()
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
  .then(show =>{
    this.props.setMostWatched(show)

  })
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
if (this.props.current_user){
    return (
      <Fragment>

        <div className="animate-pop-in header">
<Card.Group centered itemsPerRow={4}>
          <Card
            raised
            image={this.props.current_user.avatar}
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

        <Card centered className="most">

          <div>
            <h3>MOST ADDED TO WATCH LIST:</h3>
          </div>
          {this.props.mostWatched ?

<ShowCard key={this.props.mostWatched.name} data={this.props.mostWatched} history={this.props.history} />
:
"NO CURRENT POPULAR SHOW"
}

</Card>
          </Card.Group>
        </div>
        <div>
          <HotPotatoes history={this.props.history} />
          <WatchList history={this.props.history} />
        </div>

      </Fragment>


    );
  }else{
    return(<div>
    NOPE</div>)
  }
  }

}//------------------end of class---------------------------------

function mapStateToProps(state){

  return{current_user: state.current_user,
    hottestPotato: state.hottestPotato,
    bookmarks: state.bookmarks,
    mostWatched: state.mostWatched
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
    },
    setMostWatched:(show) =>{
      dispatch({type: "ADD_MOST_WATCHED", payload: show})
    }
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(UserHomePage)
