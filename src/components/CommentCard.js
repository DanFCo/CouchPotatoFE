import React from 'react';
import { Comment, Icon } from "semantic-ui-react"


class CommentCard extends React.Component {

  render() {

    return (
      <div className="animate-pop-in center1">
        <Comment>
          <Comment.Avatar as='a' src={this.props.data.user.avatar} />
          <Comment.Content>
            <Comment.Author as="a">{this.props.data.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{this.props.data.date_time}</div>
              <div>
                <Icon name='star' />
              </div>
            </Comment.Metadata>
            <Comment.Text>
              {this.props.data.comment}
            </Comment.Text>
          </Comment.Content>
        </Comment>
        </div>
    );
  }

}/////------------end of class---------------

export default CommentCard
