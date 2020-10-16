import React from "react";
// import { Nav, Navbar, NavItem } from "react-bootstrap";
// import { Link, NavLink } from "react-router-dom";
import "../Map/Map.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class GoogleMap extends React.Component {
  state = {};

  render() {
    // console.log("in header render", this.props.user);

    const mapStyles = {
      width: "100%",
      height: "100%",
    };
    return (
      <>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        >
          <Marker position={{ lat: 48.0, lng: -122.0 }} />
        </Map>
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyD26jjTx9mMWLnkj3qF0FjaWO8WjCmprXs",
})(GoogleMap);
