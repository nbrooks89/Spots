import React from "react";
import "./AllSpots.css";
import SpotCard from "../../components/SpotCard/SpotCard";

class AllSpots extends React.Component {
  handleGetRequest = async () => {
    const response = await fetch("/api/v1/spots");
    const data = await response.json();
    console.log("spot", data);
    this.props.setSpots(data);
  };

  componentDidMount() {
    this.handleGetRequest();
  }

  render() {
    console.log("spots", this.props.spots);
    return (
      <>
        <div className="spotGrid">
          {this.props.spots.map((spot) => {
            return (
              <>
                <SpotCard
                  mylat={this.props.distance.latitude}
                  mylng={this.props.distance.longitude}
                  lat={spot.longitude[0]}
                  lng={spot.latitude[0]}
                  id={spot.id}
                  name={spot.name}
                  img={spot.photo}
                  spotType={spot.spotType}
                  slug={spot.slug}
                  ratingsAverage={spot.ratingsAverage}
                  ratingsQuantity={spot.ratingsQuantity}
                />
              </>
            );
          })}
        </div>
      </>
    );
  }
}

export default AllSpots;
