import React from "react";
import "./App.css";
import AllSpots from "./pages/AllSpots/AllSpots";
import Spot from "./pages/Spot/Spot";
import Header from "./components/Header/Header";
import Account from "./pages/Account/Account";
import SignUp from "./pages/SignUp/SignUp";
import MySpots from "./pages/MySpots/MySpots";
import CreateSpot from "./pages/CreateSpot/CreateSpot";
import UpdateSpot from "./pages/UpdateSpot/UpdateSpot";
import LogIn from "./pages/LogIn/LogIn";

import { Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

// import "./components/Header/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
  state = {
    spots: [],
    user: { data: {} },
    location: {},
    distance: {},
    spot: [],
  };
  setSpots = (data) => {
    this.setState({ spots: data.data.spots });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  getUserGeolocationDetails = async () => {
    var response = await fetch(
      "https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91"
    );
    const data = await response.json();
    // console.log(data);
    this.setState({ distance: data });
  };

  handleGetRequest = async () => {
    let jwt = await localStorage.getItem("jwt");
    if (jwt) {
      let user = jwt_decode(jwt);

      this.setUser(user);
      console.log("user", user);
    }
  };

  componentDidMount() {
    this.getUserGeolocationDetails();
    this.handleGetRequest();
  }

  render() {
    console.log("user", this.state.user);
    console.log("spot details", this.state.spot);
    return (
      <>
        <Header
          data={this.state.data}
          setData={this.setData}
          user={this.state.user}
          setUser={this.setUser}
        />

        <Route
          exact
          path="/"
          render={() => (
            <AllSpots
              spots={this.state.spots}
              setSpots={this.setSpots}
              distance={this.state.distance}
              userId={this.state.user.id}
            />
          )}
        />
        <Route
          path="/spots/:id"
          render={(routerProps) => (
            <Spot match={routerProps.match} setSpot={this.setSpot} />
          )}
        />

        <Route
          path="/signup"
          render={() => (
            <SignUp user={this.state.user} setUser={this.setUser} />
          )}
        />
        <Route path="/logout" render={() => <AllSpots />} />
        <Route
          path="/login"
          render={() => <LogIn user={this.state.user} setUser={this.setUser} />}
        />

        <Route
          path="/createSpot"
          render={() => <CreateSpot userId={this.state.user.id} />}
        />
        <Route
          path="/mySpots"
          render={() => <MySpots distance={this.state.distance} />}
        />

        <Route
          path="/spotupdate/:id"
          render={(routerProps) => (
            <UpdateSpot match={routerProps} userId={this.state.user.id} />
          )}
        />
        <Route
          path="/account"
          render={() => (
            <Account
              user={this.state.user}
              setUser={this.setUser}
              currentUser={this.state.currentUser}
              setCurrentUser={this.setCurrentUser}
            />
          )}
        />
      </>
    );
  }
}

export default App;