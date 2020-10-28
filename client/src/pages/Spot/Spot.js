import React from "react";
import "./Spot.css";
import { Redirect } from "react-router-dom";
// import { Container, Row, Col } from "../../../node_modules/reactstrap/lib";
import "bootstrap/dist/css/bootstrap.min.css";
// import { getDistance } from "geolib";

class Spot extends React.Component {
  state = {
    spot: { location: {} },
    details: null,
    succesfulDelete: false,
  };

  deleteSpot = async () => {
    await fetch(`/api/v1/spots/${this.state.spot.id}`, {
      method: "DELETE",
    });
    this.setState({ successfulDelete: true });
  };

  handleGetRequest = async () => {
    const response = await fetch(`/api/v1/spots/${this.props.match.params.id}`);
    const data = await response.json();
    console.log(data);
    this.setState({ spot: data.data.spot });
    // this.props.setSpot(data);
  };

  componentDidMount() {
    this.handleGetRequest();
  }
  render() {
    console.log(this.state.spot);
    if (this.state.successfulDelete) {
      return <Redirect to="/" />;
    }
    console.log("mySpot", this.state.spot);
    return (
      <div className="details-container">
        <div className="details-name-header">{this.state.spot.name}</div>
         <div className="img-details">
        <div className="container2">
          <img
            className="spotImgDetails"
            src={`/static/img/spots/${this.state.spot.photo}`}
            alt="spot "
          ></img>
        </div>
        <div className="details-box">
          <span className="details-head">Details </span>
          <div className="spot-address">
            Address:
            <span className="innertext">{this.state.spot.address}</span>
          </div>
          <div className="type">
            Spot Type:
            <span className="innertext">{this.state.spot.spotType}</span>
          </div>

          <div className="description">
            Description:
            <span className="innertext">{this.state.spot.description}</span>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Spot;
