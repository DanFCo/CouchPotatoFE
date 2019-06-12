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
                {
                  // <img src={this.props.show.img_url} alt={this.props.show.name} width="500" height="600"/>
                }
              </div>
              {
                //--------------------------VVVthe div to go ontop of the pictureVVV--------------
              }
              <div>


                <div onClick={this.clickHandler}>
                  <h2>{this.props.data.name}</h2>
                  <img src={this.props.data.poster} alt={this.props.data.name} width="400" height="500"/>
                  <h5>{this.props.data.summary}</h5>
                </div>


                <button className="userButton" onClick={() => this.bookmarkButton(this.props.data)}>Favorite<span role="img">📺 </span></button>
                <button className="userButton" onClick={() => this.pageButton(this.props.data)}>TV SHOW PAGE</button>

              </div>
            </div>
          }
        </div>
      );
    }

}//----------------this is the end of the component---------------------------


function mapStateToProps(state){
  return{current_user: state.current_user}
}

function mapDispatchToProps(dispatch){
  return{addBookmark: (bookmark)=>{
    dispatch({type:"ADD_BOOKMARK",payload: bookmark})
  }, addSelectShow:(show) =>{
    dispatch({type:"ADD_SELECT_SHOW",payload: show})
  }
}
}



export default connect(mapStateToProps,mapDispatchToProps)(ShowCard)
