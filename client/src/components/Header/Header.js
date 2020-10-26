import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";

import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";

class Header extends React.Component {
  state = {
    email: "",
    password: "",
    navigate: false,
    succesfulLogout: false,
  };

  handleLogOut = async (event) => {
    try {
      await localStorage.clear("jwt");
      // TODO: remove user from state.
      this.props.setUser("");

      console.log("here");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.props.user);
    return (
      <Navbar expand="xlg" className="color-nav" fixed="top">
        {this.props.user !== null ? (
          <>
            <div>
              <NavLink
                to="/logIn"
                activeClassName="active"
                onClick={this.handleLogOut}
              >
                <span className="signUp">Logout</span>
              </NavLink>
              <NavLink to="/account" activeClassName="active">
                <span className="signUp">Account</span>
              </NavLink>
            </div>

            <Navbar.Toggle aria-controls="responsive-navbar-nav " />
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav>
                <NavItem className=" item ml-auto">
                  <NavLink to="/" activeClassName="active">
                    <span className="Nav-Item">All Spots</span>
                  </NavLink>
                </NavItem>
                <NavItem className=" item ml-auto">
                  <NavLink to="/mySpots" activeClassName="active">
                    <span className="Nav-Item">My Spots</span>
                  </NavLink>
                </NavItem>
                <NavItem className=" item ml-auto">
                  <NavLink to="/createSpot" activeClassName="active">
                    <span className="Nav-Item">Create Spot</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <div classname="">
            <NavLink to="/signUp" activeClassName="active">
              <span className="signUp">Signup</span>
            </NavLink>
            <NavLink to="/logIn" activeClassName="active">
              <span className="logIn">Login</span>
            </NavLink>
          </div>
        )}
      </Navbar>
    );
  }
}
export default Header;
