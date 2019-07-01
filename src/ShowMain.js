import React, { Fragment } from 'react';
import CommentCard from "./components/CommentCard"
import { connect } from "react-redux"
import { Button, Icon, Comment, Header, Item, Responsive, Grid } from "semantic-ui-react"

class ShowMain extends React.Component {

  state={
    comment:"",
    clicked: false,
    receivingUser:"",
    note:""
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



    bookmarkButton = () =>{

      fetch("http://localhost:3000/api/v1/bookmarks/new",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          show: this.props.show.id,
          user: this.props.currentUser.id})
        }).then (response =>response.json())
        .then(bookmark=>{
          this.props.addBookmark(bookmark)
        })

      }




      potatoSubmit = (event) =>{
        event.preventDefault()
        fetch("http://localhost:3000/api/v1/potatoes/new",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
          },
          body: JSON.stringify({
            username: this.state.receivingUser,
            show: this.props.show,
            note: this.state.note})
          }).then (response =>response.json())
          .then(data =>{
            if(data.errors){
              alert(data.errors)
            }else{
              alert("You've Passed The Hot Potato")
            }
          })
        }

        changeHandler=(event)=>{

          this.setState({
            [event.target.name]: event.target.value
          })
        }

        clickHandler = () =>{
          this.setState(prevState => ({
            clicked: !prevState.clicked
          }));
        }


        removeBookmark = () =>{

          let currentShow = this.props.bookmarks.find(bk=>bk.show.name === this.props.show.name)
          this.props.removeSelectBookmark(currentShow)

          fetch(`http://localhost:3000/api/v1/bookmarks/${this.props.id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify({
              user: this.props.currentUser.id,
              show: currentShow.id
            })
          }).then (response =>response.json())
          .then(data =>{
            alert(data.message)
          })

        }






        render() {
          console.log(this.props)
          return (
            <Responsive>
              <div className="animate-pop-in">
                <div className="show">
                  <Grid>
                    <Grid.Column width={4}>
                      <Item>
                        <Item.Image size='medium' src={this.props.show.poster} />
                      </Item>
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <Item>
                        <Item.Content>
                          <Header as='h1' dividing>
                            {this.props.show.name}
                          </Header>

                          <Item.Meta>{this.props.show.genre}</Item.Meta>

                          <Item.Description>
                            {this.props.show.summary}
                          </Item.Description>
                          <Header as='h4' dividing>
                            Network:
                          </Header>
                          <Item.Description>
                            {this.props.show.network}
                          </Item.Description>
                          <Header as='h4' dividing>
                            Web Channel:
                          </Header>
                          <Item.Description>
                            {this.props.show.webchannel}
                          </Item.Description>
                          <Header as='h4' dividing>
                            Runtime:
                          </Header>
                          <Item.Extra>{this.props.show.runtime}</Item.Extra>
                        </Item.Content>
                      </Item>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Fragment>


                        <div className="www">
                          {this.props.show.website === "not available" ?
                            null
                            :
                            <a href={this.props.show.website} target="blank">
                              <Button color='blue' icon>
                                <Icon name='world' /> Website
                                </Button>
                              </a>
                            }
                          </div>


                          <div className="watchlist">
                            {this.props.bookmarks.find(bk=>bk.show.name === this.props.show.name) ?


                              <Button negative onClick={this.removeBookmark}><Icon name="remove"/>REMOVE FROM WATCHLIST</Button>
                              :
                              <Button positive onClick={this.bookmarkButton}><Icon name="add"/>ADD TO WATCH LIST</Button>

                            }
                          </div>


                          <div className="potato">
                            {!this.props.potatoes.find(potato =>potato.show_id === this.props.show.id) ?
                              <Button color='yellow' onClick={this.clickHandler}><Icon name="share"/>Create Hot Potato</Button>
                              :
                              null
                            }
                            {this.state.clicked ?
                              <form onSubmit={this.potatoSubmit}>
                                <br/>
                                <input onChange={this.changeHandler} name="receivingUser" type="text" placeholder="User Name of Person" required="required"/>
                                <br/>
                                <textarea onChange={this.changeHandler} name="note" form="usrform" placeholder="Write Them a Note!" required="required"/>
                                <br/>
                                <input type="submit"/>
                                <br/>
                              </form>
                              :
                              null}
                            </div>



                          </Fragment>
                        </Grid.Column>
                      </Grid>
                    </div>










                    <div className="center">
                      <Header as='h3' dividing>
                        Comments:
                      </Header>
                      <Comment.Group>

                        {this.props.comments.map(comment =>{

                          return <CommentCard key={comment.id} data={comment} />
                        })}
                      </Comment.Group>
                    </div>

                    <form className="comment" onSubmit={this.submitHandler}>
                      <textarea onfocus="this.value=''" onChange={this.changeHandler} rows="4" cols="50" name="comment" form="usrform" placeholder="Type Comment Here!"/>
                      <br/>
                      <input type="submit"/>
                    </form>
                  </div>
                </Responsive>
              );
            }

          }//---------------------end of class-------------

          function mapStateToProps(state){


            return{show: state.selectShow, comments: state.comments,
              currentUser: state.current_user, potatoes: state.potatoes,
              bookmarks: state.bookmarks
            }
          }

          function mapDispatchToProps(dispatch){
            return{
              grabComment:(comment)=>{
                dispatch({type:"ADD_COMMENT", payload: comment})
              },
              addComments:(comments)=>{
                dispatch({type:"ADD_COMMENTS",payload:comments})
              },
              addBookmark: (bookmark)=>{
                dispatch({type:"ADD_BOOKMARK",payload: bookmark})
              },
              removeSelectBookmark: (show) =>{
                dispatch({type: "REMOVE_BOOKMARK", payload: show})
              }
            }
          }






          export default connect(mapStateToProps,mapDispatchToProps)(ShowMain)
