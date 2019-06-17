import React from 'react';
import PotatoCard from "../components/PotatoCard"
import { connect } from "react-redux"

class HotPotatoes extends React.Component {

  render() {
    return (
      <div>
{this.props.potatoes.map(potato =>{

return  <PotatoCard key={potato.id} history={this.props.history} {...potato} />

})}
      </div>
    );
  }

}//----------------END OF CLASS------------

function mapStateToProps(state){

return{potatoes: state.current_user.potatoes}
}








export default connect(mapStateToProps)(HotPotatoes)
