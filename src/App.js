import React, { Component } from "react";
import "./App.css";
import SearchBar from "./SearchBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-container">
          <header>Compare your Air</header>
          <h1>
            <p>Compare the air quality between cities in the UK.</p>
            <p>Select cities to compare using the search tool below.</p>
          </h1>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
