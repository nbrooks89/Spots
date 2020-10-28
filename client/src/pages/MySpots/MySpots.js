import React from "react";
import "./MySpots.css";
import { getDistance } from "geolib";
import MySpotCard from "../../components/MySpotCard/MySpotCard";

class MySpots extends React.Component {
  state = {
    spots: [],
  };
  currentUser = async () => {
    const res = await fetch("/api/v1/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data.data.user.spots);
    data.data.user.spots.forEach(spot => {
      let lat = spot.latitude[0];
      let lng = spot.longitude[0];
      const dis = getDistance(
        { latitude: lng* 1, longitude: lat * 1 },
        { latitude: this.props.mylat * 1, longitude: this.props.mylng * 1 }
      );
      var miles = (dis * 0.00062137).toFixed(0)
      console.log(miles)
      spot.distance = miles;
    });
    const newarray = data.data.user.spots.sort((a,b) =>{
      return a.distance< b.distance ? -1 : a.distance> b.distance ? 1:0
    })
    this.setState({ spots: newarray });
  };

  componentDidMount() {
    this.currentUser();
  }

  render() {
    console.log("spots", this.state.spots);
    return (
      <div className="all-spots-container">
       <div className="my-spots-header" >My Spots</div>
        <div className="mySpotGrid">
          {this.state.spots.map((spot) => {
            return (
              <>
                <MySpotCard
                 distance={spot.distance}
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

export default MySpots;
