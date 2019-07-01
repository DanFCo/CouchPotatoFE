import React from 'react';
import ShowCard from "../components/ShowCard"
import { connect } from "react-redux"
import { Card, Responsive } from "semantic-ui-react"

class WatchList extends React.Component {

  render() {

    return (
      <Responsive>
        <h1>Watch List:</h1>
        <div className="animate-pop-in">
          <Card.Group centered itemsPerRow={5}>
            {this.props.bookmarks.map(bookmark =>{

              return <Card raised key={bookmark.id}>
                <ShowCard key={bookmark.id} data={bookmark.show} history={this.props.history} />
              </Card>
            })}
          </Card.Group>
        </div>
      </Responsive>
    );
  }

}//---------------end of class-------------------



function mapStateToProps(state){

  return{bookmarks: state.bookmarks}
}







export default connect(mapStateToProps)(WatchList)
