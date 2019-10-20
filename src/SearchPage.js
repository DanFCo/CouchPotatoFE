import React from 'react'
import ShowCard from "./components/ShowCard"
import { connect } from "react-redux"
import { Button, Responsive, Card, Icon } from 'semantic-ui-react'


class SearchPage extends React.Component{

  state={
    term:""
  }





  componentDidMount(){
    this.fetchShows()
  }


  fetchShows = ()=>{
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
        "Accepts": "application/json",
      },
      body: JSON.stringify({
        search: this.state.term
      })
    }).then (response =>response.json())
    .then(shows =>{
      if (shows.length === 0){
        alert("Sorry, No Shows By That Name, Try a Less Specific Search")
      }else{

        this.props.addShows(shows)

      }

    })
  }






  render() {
console.log(this.props)
    return (
      <Responsive>
        <div>
          <div className="sticky">


            <input onChange={this.changeHandler} name="term" />
            <br/>
            <Button.Group>
              <Button onClick={this.clickHandler} color="red"><Icon name="search"/>Search</Button>
              <Button.Or />
              <Button onClick={this.fetchShows}><Icon name="server"/>Archive</Button>

            </Button.Group>
          </div>

          <div className="card-container">
            <Card.Group itemsPerRow={3}>
              {this.props.shows.map(show =>{

                return  <Card raised key={show.id}>
                  <ShowCard key={show.id} data={show} history={this.props.history} />
                </Card>
              })}
            </Card.Group>
          </div>

        </div>
      </Responsive>
    );
  }

}//-------------------end of class-----------------

function mapStateToProps(state){

  return{shows: state.shows}
}

function mapDispatchToProps(dispatch){
  return{
    addShows: (shows)=>{
      dispatch({type:"ADD_SHOWS",payload: shows})
    }
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(SearchPage)
