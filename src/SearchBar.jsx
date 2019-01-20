import React, { Component } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as api from "./api";

class SearchBar extends Component {
  state = {
    searchTerm: "",
    cities: ["Manchester", "Liverpool", "Hull", "Fort William"],
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
              <li key={index} value={city} onClick={this.handleClick}>
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
  handleClick = () => {
    api.getCities();
  };

  filterSearch = word => {
    const { cities } = this.state;
    const toMatch = word.toUpperCase();
    const myRegEx = new RegExp(toMatch);
    const results = cities.reduce((acc, current) => {
      const { city } = current;
      if (myRegEx.test(city.toUpperCase())) acc.push(city);
      return acc;
    }, []);
    console.log(results);
    return results.sort();
  };

  componentDidMount() {
    const cities = api.getCities().then(cities => this.setState({ cities }));
  }
}

export default SearchBar;
