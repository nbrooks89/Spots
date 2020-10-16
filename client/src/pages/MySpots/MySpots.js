import React from "react";
import "./MySpots.css";
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
    console.log(data);
    this.setState({ spots: data.data.user.spots });
  };

  componentDidMount() {
    this.currentUser();
  }

  render() {
    console.log("spots", this.state.spots);
    return (
      <>
        <div className="MySpotGrid">
          {this.state.spots.map((spot) => {
            return (
              <>
                <MySpotCard
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

export default MySpots;
