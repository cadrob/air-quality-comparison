import React, { Component } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import Card from "./Card";
import * as api from "./api";

class App extends Component {
  state = {
    cards: []
  };
  render() {
    return (
      <div className="App">
        <div className="main-container">
          <header>Compare your Air</header>
          <h1>
            <p>Compare the air quality between cities in the UK.</p>
            <p>Select cities to compare using the search tool below.</p>
          </h1>
          <SearchBar createCard={this.createCard} />
          <div className="cards-container">
            {this.state.cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                id={index}
                removeCard={this.removeCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  removeCard = id => {
    const prevCards = this.state.cards;
    const newCards = prevCards.filter((card, index) => {
      return index !== id;
    });
    this.setState({ cards: newCards });
  };
  createCard = (city, id) => {
    const card = {
      id,
      city,
      lastUpdated: null,
      country: null,
      pm25: "N/A",
      so2: "N/A",
      o3: "N/A",
      no2: "N/A"
    };
    api.getCityLatest(city).then(measurements => {
      measurements.forEach((measurement, index) => {
        if (index === 0) {
          card.lastUpdated = measurement.date.utc;
          card.location = measurement.location;
          card.country = measurement.country;
        }
        if (card[measurement.parameter] === "N/A") {
          card[measurement.parameter] = measurement.value;
        }
      });

      const prevState = this.state;
      this.setState({ cards: prevState.cards.concat(card) });
    });
  };
}

export default App;
