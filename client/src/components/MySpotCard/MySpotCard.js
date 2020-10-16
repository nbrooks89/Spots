import React from "react";

import { Link, Redirect } from "react-router-dom";
import { getDistance, getPreciseDistance } from "geolib";

import "./MySpotCard.css";

class MyspotCard extends React.Component {
  state = {
    succesfulDelete: false,
  };

  deleteSpot = async () => {
    await fetch(`/api/v1/spots/${this.props.id}`, {
      method: "DELETE",
    });
    this.setState({ successfulDelete: true });
  };
  render() {
    if (this.state.successfulDelete) {
      return <Redirect to="/mySpots" />;
    }
    var dis = getDistance(
      { latitude: this.props.lng * 1, longitude: this.props.lat * 1 },
      { latitude: this.props.mylat * 1, longitude: this.props.mylng * 1 }
    );
    var miles = dis * 0.00062137;
    var mile = miles.toFixed(0);

    return (
      <div className="container3">
        <div className="MySpotName">{this.props.name}</div>

        <img
          className="MySpotImg"
          src={`/static/img/spots/${this.props.img}`}
        ></img>
        <div>distance: {mile} miles</div>
        <div className="MyBottomLayout">
          <Link to={"/spots/" + this.props.id}>
            <div className="MyDetailsBtn">DETAILS</div>
          </Link>
          <div className="edit">
            <Link to={"/spotupdate/" + this.props.id}>
              <div className="editBtn">EDIT</div>
            </Link>
            <button className="deleteBtn" onClick={this.deleteSpot}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyspotCard;
