import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import CountryData from "country-data";

class Card extends Component {
  render() {
    const {
      city,
      lastUpdated,
      country,
      location,
      pm25,
      so2,
      no2,
      o3
    } = this.props.card;
    console.log(this.props.card);
    return (
      <div className="Card">
        <h2>
          UPDATED{" "}
          {moment(lastUpdated)
            .fromNow()
            .toUpperCase()}
        </h2>
        <h1>{location}</h1>
        <h3>{/* in {city}, {CountryData.countries[country].name} */}</h3>
        <h4>
          Values:PM25: {pm25}, SO2: {so2}, O3: {o3}, NO2: {no2}
        </h4>
        <button>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>
    );
  }
}

Card.propTypes = {};

export default Card;
