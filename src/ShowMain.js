import React from 'react';
import Comment from "./components/Comment"
import { connect } from "react-redux"


class ShowMain extends React.Component {

state={
  comment:""
}

componentDidMount(){
  let show = this.props.show
  fetch("http://localhost:3000/api/v1/comments/get",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify(show)
  }).then (response =>response.json())
  .then(comments =>{
    this.props.addComments(comments)
  })

}




submitHandler=(event)=>{
  event.preventDefault()
  fetch("http://localhost:3000/api/v1/comments/new",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        show: this.props.show.id,
        user: this.props.currentUser.id,
      comment: this.state.comment})
      }).then (response =>response.json())
      .then(comment =>{
        this.props.grabComment(comment)

      })

}



changeHandler=(event)=>{

  this.setState({
    [event.target.name]: event.target.value
  })
}





  render() {
    return (
      <div>
<h1>{this.props.show.name}</h1>
<br/>
<img src={this.props.show.poster} alt={this.props.show.name} height="550" width="450"/>
<br/>
<h3>Genre:</h3>{this.props.show.genre}
<br/>
<h3>Runtime:</h3> {this.props.show.runtime}
<br/>
  <h3>Network:</h3> {this.props.show.network}
  <br/>
    <h3>Web Channel:</h3> {this.props.show.webchannel}
    <br/>
<h3>Summary:</h3>{this.props.show.summary}
<br/>
<a href={this.props.show.website} target="blank">OFFICIAL WEBSITE</a>
<br/>

<button>Potato</button>


<br/>


<form onSubmit={this.submitHandler}>
<textarea onChange={this.changeHandler} rows="4" cols="50" name="comment" form="usrform" placeholder="Type Comment Here!"/>
<br/>
 <input type="submit"/>
</form>



{this.props.comments.map(comment =>{

return  <Comment key={comment.id} data={comment} />
})}

      </div>
    );
  }

}//---------------------end of class-------------

function mapStateToProps(state){


return{show: state.selectShow, comments: state.comments,
   currentUser: state.current_user,
   comments: state.comments
 }
}

function mapDispatchToProps(dispatch){
  return{
    grabComment:(comment)=>{
      dispatch({type:"ADD_COMMENT", payload: comment})
    },
    addComments:(comments)=>{
      dispatch({type:"ADD_COMMENTS",payload:comments})
    }
  }
}






export default connect(mapStateToProps,mapDispatchToProps)(ShowMain)
