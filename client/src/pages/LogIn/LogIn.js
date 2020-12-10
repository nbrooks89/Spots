import React from "react";
import "./LogIn.css";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Container, Col, Form, FormGroup, Label, Input } from "reactstrap";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    data: [],
    succesfulCreate: false,
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
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

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
      // console.log(this.props.user);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.data);
    if (this.state.successfulCreate) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="loginContainer">
        <h2>Log In</h2>
        <Form className="form" onSubmit={this.onSubmit}>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={this.state.password}
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

export default LogIn;
