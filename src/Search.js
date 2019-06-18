import React from 'react';
import ShowCard from "./components/ShowCard"
import { connect } from "react-redux"


class Search extends React.Component {

state={
  term:""
}



  componentDidMount(){
    fetch("http://localhost:3000/api/v1/shows")
      .then(response => response.json())
      .then(shows =>{
        this.props.addShows(shows)
      })
  }

changeHandler = (event) =>{
  this.setState({
    [event.target.name]: event.target.value
  })
}


clickHandler = () =>{
  fetch("http://localhost:3000/api/v1/shows/search",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      search: this.state.term
    })
  }).then (response =>response.json())
  .then(shows =>{
    // console.log(shows)
    this.props.addShows(shows)
  })
}


  render() {

    return (
      <div>
      <div className="search-container">
    <input onChange={this.changeHandler} type="text" name="term"/>
    <button onClick={this.clickHandler}>SEARCH🔎</button>
</div>
<div className="grid-container">

{this.props.shows.map(show=>{
  return <div className="grid-item" key={show.id}><ShowCard key={show.id} data={show} history={this.props.history} /></div>
})}
</div>

      </div>
    );
  }

}//-------------------end of class-----------------

function mapStateToProps(state){
console.log(state)
  return{shows: state.shows}
}

function mapDispatchToProps(dispatch){
  return{
    addShows: (shows)=>{
      dispatch({type:"ADD_SHOWS",payload: shows})
    }
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(Search)
