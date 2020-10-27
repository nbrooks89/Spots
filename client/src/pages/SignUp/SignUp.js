import React from "react";
import "./SignUp.css";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import { Container, Col, Form, FormGroup, Label, Input } from "reactstrap";

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    // data: [],
    succesfulCreate: false,
    // role: "user",
  };
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      token: null,
    });
  };

  onSubmit = async (event) => {
  
  try {
      event.preventDefault();
      const res = await fetch("/api/v1/users/signup", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        await localStorage.setItem("jwt", data.token);
        let jwt = await localStorage.getItem("jwt");
        if (jwt) {
          let user = jwt_decode(jwt);

          this.props.setUser(user);
          this.setState({ successfulCreate: true });
        }
      } else {
        console.log(data);
        alert(data.message);
      }
      console.log(this.props.user);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.successfulCreate) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="App" >
        <h2>Sign Up</h2>
        <Form className="form" onSubmit={this.onSubmit}>
          <Col>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Miss GNAR"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="lilMissGNAR@email.com"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
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
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="********"
                value={this.state.passwordConfirm}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Input type="submit" value="Submit" />
        </Form>
      </Container>
    );
  }
}

export default SignUp;
