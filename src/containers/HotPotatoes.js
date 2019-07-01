import React,{ Fragment } from 'react';
import PotatoCard from "../components/PotatoCard"
import { connect } from "react-redux"
import { Responsive, Card } from "semantic-ui-react"

class HotPotatoes extends React.Component {

  render() {
    return (
      <Responsive>
        <Fragment>
          {this.props.potatoes.length !== 0 ?
            <div>
              <h1>You've Been Passed Hot Potatoes:</h1>
              <Card.Group itemsPerRow={5} centered>
                {this.props.potatoes.map(potato =>{
                  return  <Card raised>
                    <PotatoCard key={potato.id} history={this.props.history} {...potato} hottest={false}/>
                  </Card>
                })}
              </Card.Group>
            </div>
            :
            null
          }
        </Fragment>
      </Responsive>
    );
  }

}//----------------END OF CLASS------------

function mapStateToProps(state){

  return{potatoes: state.potatoes}
}








export default connect(mapStateToProps)(HotPotatoes)
