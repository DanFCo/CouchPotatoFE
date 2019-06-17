import React from 'react';
import ShowCard from "../components/ShowCard"
import { connect } from "react-redux"

class WatchList extends React.Component {

  render() {
    return (
      <div>
 {this.props.bookmarks.map(bookmark =>{
   return <ShowCard key={bookmark.id} data={bookmark} history={this.props.history} />
 })}

      </div>
    );
  }

}//---------------end of class-------------------



function mapStateToProps(state){

  return{bookmarks: state.bookmarks}
}







export default connect(mapStateToProps)(WatchList)
