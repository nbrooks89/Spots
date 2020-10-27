import React from "react";

import { Link } from "react-router-dom";
import { getDistance } from "geolib";

import "./SpotCard.css";

class spotCard extends React.Component {
  render() {
    var dis = getDistance(
      { latitude: this.props.lng * 1, longitude: this.props.lat * 1 },
      { latitude: this.props.mylat * 1, longitude: this.props.mylng * 1 }
    );
    var miles = dis * 0.00062137;
    var mile = miles.toFixed(0);

    return (
      <div className="container1">
        {/* <img className="dogCardRandom" src={this.props.imgUrl} /> */}
        <div className="spotName">{this.props.name}</div>

        <img
          className="spotImg"
          src={`/static/img/spots/${this.props.img}`}
          alt="spot"
        ></img>
        <div className="distance">distance: {mile} miles</div>
        <div className="bottomLayout">
          <div>
            <Link to={"/spots/" + this.props.id}>
              <div className="detailsBtn">DETAILS</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default spotCard;
