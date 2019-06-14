import React from 'react';


class Comment extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
<div>
<h5>{this.props.data.user.username}</h5>
<img src={this.props.data.user.avatar} alt="" height="30" width="30" />
{this.props.data.date_time}
<div>
</div>
{this.props.data.comment}
</div>
      </div>
    );
  }

}/////------------end of class---------------

export default Comment
