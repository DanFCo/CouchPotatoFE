import React from 'react';
import Potato from "../potato.jpg"
import { connect } from "react-redux"


class PotatoCard extends React.Component {



  state={
    clicked: false,
    receivingUser: "",
    note: ""
  }

  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }



  clickHandler = (show) =>{
    this.props.setSelectShow(show)
    this.props.history.push(`/show/${this.props.show_id}`)
  }


  hotPotato = (event) =>{
    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/potatos/${this.props.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        id: this.props.id,
        show_id: this.props.show_id,
        user: this.state.receivingUser,
        note: this.state.note
      })
    }).then(response => response.json())
    .then(data=>{
      if (data.errors){
        alert(data.errors)
      }else {
        this.props.removePotato(data)
        alert("Hot Potato Has Been Passed")
      }
    })
  }

  potatoClick = () =>{
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }))
  }
  deletePotato = () =>{
    this.props.removePotato(this.props)
    fetch(`http://localhost:3000/api/v1/potatos/${this.props.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(this.props.id)
    }).then (response =>response.json())
    .then(data =>{
      alert(data.message)
    })

  }


  render() {
    
    return (
      <div>
        <img onClick={()=>this.clickHandler(this.props.show)} src={Potato} alt=""/>

        {this.props.hottest ?
          null
        :
          <div>
            <h5>{this.props.note}</h5>
            <button onClick={this.deletePotato}>Remove</button>
            <button onClick={this.potatoClick}>Hot Potato</button>
            {this.state.clicked ?
                <form onSubmit={this.hotPotato}>
                  <br/>
                  <input onChange={this.changeHandler} name="receivingUser" type="text" placeholder="User Name of Person" required="required"/>
                  <br/>
                  <textarea onChange={this.changeHandler} name="note" form="usrform" placeholder="Write Them a Note!" required="required"/>
                  <br/>
                  <input type="submit"/>
                  <br/>
                </form>
            :
              null
            }
          </div>
          }
        </div>
      );
    }

  }//-------------END OF CLASS------------------------

  export default connect(mapStateToProps,mapDispatchToProps)(PotatoCard)

  function mapStateToProps(state, props){

    return{hottestPotato: state.hottestPotato}
  }

  function mapDispatchToProps(dispatch){
    return{
      setSelectShow:(show)=>{
        dispatch({type: "ADD_SELECT_SHOW", payload: show})
      },
      removePotato:(potato)=>{
        dispatch({type:"REMOVE_POTATO", payload: potato})
      }
    }
  }
