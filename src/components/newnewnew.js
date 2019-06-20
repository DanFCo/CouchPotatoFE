
<div className="sticky">

    <button onClick={this.fetchShows}>All Shows</button>
  <input onChange={this.changeHandler} type="text" name="term"/>
  <button onClick={this.clickHandler}>SEARCH🔎</button>

</div>


<Card
  image='/images/avatar/large/elliot.jpg'
  header='Elliot Baker'
  meta='Friend'
  description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
  extra={extra}
/>



import { Button, Icon } from 'semantic-ui-react'

<button>WEBSITE</button>















<h1>{localStorage.user_name} </h1>
<img src={localStorage.avatar} alt=""/>
<h4>HOTTEST POTATO</h4>






import { Button, Responsive, Card } from 'semantic-ui-react'


<Card.Group itemsPerRow={3}>
  {this.props.shows.map(show =>{

  return  <Card raised key={show.id}>
      <ShowCard key={show.id} data={show} history={this.props.history} />
    </Card>
  })}
 </Card.Group>
