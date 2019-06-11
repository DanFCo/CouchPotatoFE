import React from 'react';
import ShowCard from "./components/ShowCard"

class Search extends React.Component {

  render() {
    return (
      <div>
      <div class="search-container">
    <input type="text" name="search"/>
    <button>SEARCH🔎</button>
</div>
      I AM THE SEARCH PAGE
<ShowCard />

      </div>
    );
  }

}

export default Search
