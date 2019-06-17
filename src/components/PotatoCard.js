import React from 'react';
import Potato from "../potato.jpg"
import { connect } from "react-redux"


class PotatoCard extends React.Component {



clickHandler = (show) =>{
this.props.setSelectShow(show)
  this.props.history.push(`/show/${this.props.show_id}`)
}


hotPotato = (show) =>{
  console.log("HOT HOT HOT",show)
}








  render() {

    return (
      <div>
       <img onClick={()=>this.clickHandler(this.props.show)} src={Potato} alt=""/>
        <h5>{this.props.note}</h5>
        <button>Remove</button>
        <button onClick={()=>this.hotPotato(this.props.show)}>Hot Potato</button>
      </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(PotatoCard)

function mapStateToProps(state){
  return{}
}

function mapDispatchToProps(dispatch){
  return{
    setSelectShow:(show)=>{
      dispatch({type: "ADD_SELECT_SHOW", payload: show})
    }
  }
}
