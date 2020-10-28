import React from "react";
import "./AllSpots.css";
import SpotCard from "../../components/SpotCard/SpotCard";
import { getDistance } from "geolib";


class AllSpots extends React.Component {
  
  handleGetRequest = async () => {
    const response = await fetch("/api/v1/spots");
    const data = await response.json();
    console.log("spot", data.data.spots);
    data.data.spots.forEach(spot => {
      let lat = spot.latitude[0];
      let lng = spot.longitude[0];
      const dis = getDistance(
        { latitude: lng * 1, longitude: lat * 1 },
        { latitude: this.props.mylat * 1, longitude: this.props.mylng * 1 }
      );
      var miles = (dis * 0.00062137).toFixed(0)
      console.log(miles)
      spot.distance = miles;
    });
   const newarray= data.data.spots.sort((a,b) =>{
    return a.distance< b.distance ? -1 : a.distance> b.distance ? 1:0
    })
    console.log(data.data.spots)
    this.props.setSpots(newarray);
  };

  componentDidMount() {
    this.handleGetRequest();
  }


  

  render() {
   
    console.log("spots", this.props.spots);
    return (
      <div className="all-spots-container">
      <div className="all-spots-header" >All Spots</div>
        <div className="spotGrid">
          {this.props.spots.map((spot) => {
            return (
              <>
                <SpotCard
                  mylat={this.props.mylat}
                  mylng={this.props.mylng}
                  lat={spot.latitude[0]}
                  lng={spot.longitude[0]}
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
      </div>
    );
  }
}

export default AllSpots;
