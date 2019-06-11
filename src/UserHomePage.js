import React from 'react';
import HotPotatoes from "./containers/HotPotatoes"
import WatchList from "./containers/WatchList"


class UserHomePage extends React.Component {

  render() {
    return (
      <div>
      <h1>{localStorage.user_name} </h1>
      <img src={localStorage.avatar} alt=""/>

 <WatchList />
 <HotPotatoes />
      </div>
    );
  }

}

export default UserHomePage
