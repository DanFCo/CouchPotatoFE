import React from 'react';
import { connect } from "react-redux"
import { Responsive, Button, Icon } from "semantic-ui-react"



class ShowCard extends React.Component {


    state={
      clicked:true
    }


    clickHandler = () =>{
      this.setState(prevState=>({
        clicked: !prevState.clicked
      }))
    }


pageButton=(show)=>{
this.props.addSelectShow(show)
this.props.history.push(`/show/${show.id}`)
}


removeBookmark = () =>{
let show = this.props.bookmarks.find(bk=>bk.name === this.props.data.name)
this.props.removeSelectBookmark(show)

  fetch(`http://localhost:3000/api/v1/bookmarks/${this.props.id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          user: this.props.current_user.id,
          show: show.id
        })
      }).then (response =>response.json())
      .then(data =>{
    alert(data.message)
      })

}



    bookmarkButton = (show) =>{

    fetch("http://localhost:3000/api/v1/bookmarks/new",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        show: show.id,
        user: this.props.current_user.id})
      }).then (response =>response.json())
      .then(bookmark=>{
        this.props.addBookmark(bookmark)
      })

    }



    render(){

      return (
        <Responsive>
        <div className="animate-pop-in">
          {this.state.clicked
            ?
            <div onClick={this.clickHandler}>
              <h3>{this.props.data.name}</h3>
              <img src={this.props.data.thumbnail} alt={this.props.data.name} height="275" width="200"/>
            </div>
            :
            <div>
              <div onClick={this.clickHandler}>

              </div>

              <div>


                <div onClick={this.clickHandler}>
                  <h2>{this.props.data.name}</h2>
{
                // <img src={this.props.data.poster} alt={this.props.data.name} width="400" height="500"/>
}
                  <h5>{this.props.data.summary}</h5>
                </div>

{!this.props.bookmarks.find(bk=>bk.name === this.props.data.name) ?
  <Button positive className="userButton" onClick={() => this.bookmarkButton(this.props.data)}> <Icon name="thumbs up"/>Add To Watch List</Button>
:
<Button negative onClick={this.removeBookmark}><Icon name="thumbs down"/>REMOVE FROM WATCHLIST</Button>
}
                <Button color="blue" className="userButton" onClick={() => this.pageButton(this.props.data)}>TV SHOW PAGE</Button>

              </div>
            </div>
          }
        </div>
        </Responsive>
      );
    }

}//----------------this is the end of the component---------------------------


function mapStateToProps(state){

  return{current_user: state.current_user, bookmarks: state.bookmarks}
}

function mapDispatchToProps(dispatch){
  return{addBookmark: (bookmark)=>{
    dispatch({type:"ADD_BOOKMARK",payload: bookmark})
  }, addSelectShow:(show) =>{
    dispatch({type:"ADD_SELECT_SHOW",payload: show})
  },
  removeSelectBookmark: (show) =>{
    dispatch({type: "REMOVE_BOOKMARK", payload: show})
  }
}
}



export default connect(mapStateToProps,mapDispatchToProps)(ShowCard)
