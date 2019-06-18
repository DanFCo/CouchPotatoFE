import React from 'react';
import { connect } from "react-redux"




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
      console.log(this.props)
      return (
        <div>
          {this.state.clicked
            ?
            <div onClick={this.clickHandler}>
              <h1>{this.props.data.name}</h1>
              <img src={this.props.data.thumbnail} alt={this.props.data.name}/>
            </div>
            :
            <div>
              <div onClick={this.clickHandler}>

              </div>

              <div>


                <div onClick={this.clickHandler}>
                  <h2>{this.props.data.name}</h2>
                  <img src={this.props.data.poster} alt={this.props.data.name} width="400" height="500"/>
                  <h5>{this.props.data.summary}</h5>
                </div>

{!this.props.bookmarks.find(bk=>bk.name === this.props.data.name) ?
  <button className="userButton" onClick={() => this.bookmarkButton(this.props.data)}>Favorite<span role="img">📺 </span></button>
:
<button onClick={this.removeBookmark}>REMOVE FROM WATCHLIST</button>
}
                <button className="userButton" onClick={() => this.pageButton(this.props.data)}>TV SHOW PAGE</button>

              </div>
            </div>
          }
        </div>
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
