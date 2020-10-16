import React from "react";
import "./Account.css";
import { Redirect } from "react-router-dom";

import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap/lib";

class Account extends React.Component {
  state = {
    currentName: "",
    currentEmail: "",
    name: "",
    email: "",
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
    succesfulCreate: false,
    user: {},
  };

  handleInputChangeData = (event) => {
    console.log(event.target.value);
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
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
    this.setState({ user: data.data.user });
  };

  onSubmitData = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch("api/v1/users/updateMe", {
        method: "PATCH",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setTimeout(function () {
          alert("succesfully updated user info");
        }, 100);

        this.setState({ successfulCreate: true });
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
  };

  onSubmitPassword = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch("api/v1/users/updateMyPassword", {
        method: "PATCH",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        this.setState({ successfulCreate: true });
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.currentUser();
  }

  render() {
    if (this.state.successfulCreate) {
      return <Redirect to="/" />;
    }
    console.log(this.state.user);
    return (
      <div className="updateAccountContainer">
        <h1>Account Settings</h1>
        <Form className="form" onSubmit={this.onSubmitData}>
          <Col>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                defaultValue={this.state.user.name}
                onChange={this.handleInputChangeData}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={this.state.user.email}
                onChange={this.handleInputChangeData}
                required
              />
            </FormGroup>
          </Col>

          <Input className="updateButton" type="submit" value="Update" />
        </Form>
        {this.state.errorMessage && (
          <h3 className="error"> {this.state.errorMessage} </h3>
        )}
        <Form className="form" onSubmit={this.onSubmitPassword}>
          <Col>
            <FormGroup>
              <Label>current Password</Label>
              <Input
                type="passwordCurrent"
                name="passwordCurrent"
                id="passwordCurrent"
                placeholder="************"
                value={this.state.passwordCurrent}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">New Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="************"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="passwordConfirm">Confirm Password</Label>
              <Input
                type="passwordConfirm"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="*******"
                value={this.state.passwordConfirm}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>

          <Input type="submit" value="Update" />
        </Form>
      </div>
    );
  }
}

export default Account;
