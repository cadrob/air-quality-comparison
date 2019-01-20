import React, { Component } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as api from "./api";

class SearchBar extends Component {
  state = {
    searchTerm: "",
    cities: [],
    filteredResults: []
  };
  render() {
    return (
      <div className="Search">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Enter city name..."
            onChange={this.handleChange}
          />
        </div>
        {this.state.searchTerm && (
          <ul>
            {this.state.filteredResults.map((city, index) => (
              <li
                key={index}
                value={city}
                onClick={() => this.handleClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  handleChange = e => {
    const { value } = e.target;
    if (value === "") this.setState({ filteredResults: [], searchTerm: "" });
    else {
      const filteredResults = this.filterSearch(value);
      this.setState({ filteredResults, searchTerm: value });
    }
  };
  handleClick = city => {
    this.props.createCard(city);
  };

  filterSearch = word => {
    const { cities } = this.state;
    const results = cities.reduce((acc, current) => {
      const { city } = current;
      if (city.toUpperCase().includes(word.toUpperCase())) acc.push(city);
      return acc;
    }, []);
    return results.sort();
  };

  componentDidMount() {
    api.getCities().then(cities => this.setState({ cities }));
  }
}

export default SearchBar;
