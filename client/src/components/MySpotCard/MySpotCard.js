import React from "react";

import { Link } from "react-router-dom";
import { getDistance } from "geolib";

import "./MySpotCard.css";

class MyspotCard extends React.Component {
  
  render() {
   

    return (
      <div className="container3">
        <div className="MySpotName">{this.props.name}</div>

        <img
          className="MySpotImg"
          src={`/static/img/spots/${this.props.img}`}
          alt="spot"
        ></img>
        <div className="distance">distance: {this.props.distance} miles</div>
        <div className="MyBottomLayout">
          <Link to={"/spots/" + this.props.id}>
            <div className="MyDetailsBtn">DETAILS</div>
          </Link>
          <div className="edit">
            <Link to={"/spotupdate/" + this.props.id}>
              <div className="editBtn">EDIT</div>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default MyspotCard;
