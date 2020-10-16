import React from "react";
import "./UpdateSpot.css";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

class UpdateSpot extends React.Component {
  state = {
    form: {
      name: "",
      address: "",
      spotType: "",
      description: "",
      latitude: "",
      longitude: "",
      photo: "",
      succesfulUpdate: false,
    },
    spot: {},
  };

  handleGetRequest = async () => {
    const response = await fetch(
      `/api/v1/spots/${this.props.match.match.params.id}`
    );
    const data = await response.json();
    console.log(data);
    this.setState({ form: data.data.spot });
    this.setState({ spot: data.data.spot.id });
  };

  handleInputChange = (event) => {
    let { form } = this.state;
    form[event.target.id] = event.target.value;
    this.setState({ form: form });
  };

  handleFileChange = (event) => {
    // let { form } = this.state;
    // form[event.target.id ]= event.target.files[0];
    // this.setState({ form: form });
    console.log(event.target.files[0]);

    this.setState({ ...this.state.form, photo: event.target.files[0] });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const encodedAddress = encodeURI(this.state.form.address);
    const geodata = await fetch(
      `https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${encodedAddress}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
          "x-rapidapi-key":
            "3daff95accmshe6470f33432001bp1b0220jsn683860acd393",
        },
      }
    );
    const dataa = await geodata.json();
    console.log("geodata", dataa);

    if (dataa.results.length > 0)
      this.state.form.address = dataa.results[0].formatted_address;
    this.state.form.latitude = dataa.results[0].geometry.location.lat;
    this.state.form.longitude = dataa.results[0].geometry.location.lng;

    const formData = new FormData();
    formData.append("photo", this.state.form.photo);
    formData.append("address", this.state.form.address);
    formData.append("spotType", this.state.form.spotType);
    formData.append("description", this.state.form.description);
    formData.append("latitude", this.state.form.latitude);
    formData.append("longitude", this.state.form.longitude);
    formData.append("name", this.state.form.name);
    console.log("form", this.state.form.photo);
    console.log("formData", formData.get("photo"));
    const res = await fetch(
      `/api/v1/users/${this.props.userId}/spots/${this.state.spot}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok) {
      this.setState({ successfulUpdate: true });
    } else {
      console.log(data);
      alert(data.message);
    }
    console.log("patch", data);
  };

  componentDidMount() {
    this.handleGetRequest();
  }

  render() {
    console.log("spot details", this.state.spot);
    if (this.state.successfulUpdate) {
      return <Redirect to="/" />;
    }
    return (
      <div className="updateContainer">
        <h1>Update Spot</h1>
        <Form className="form" onSubmit={this.onSubmit}>
          <Form.Group classname="" controlId="name">
            <Form.Label>Name the Spot</Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={this.state.form.name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              defaultValue={this.state.form.address}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="spotType">
            <Form.Label>Spot Type</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.form.spotType}
              onChange={this.handleInputChange}
            >
              <option>street</option>
              <option>park</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              name="description"
              defaultValue={this.state.form.description}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.File
              type="file"
              name="photo"
              defaultValue={this.state.form.photo}
              label="Add A Photo"
              onChange={this.handleFileChange}
            />
          </Form.Group>

          <button>Submit</button>
          <Form.Group controlId="longitude">
            <Form.Label></Form.Label>
            <Form.Control
              type="hidden"
              name="longitude"
              defaultValue={this.state.form.longitude}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="latitude">
            <Form.Label></Form.Label>
            <Form.Control
              type="hidden"
              name="latitude"
              defaultValue={this.state.form.latitude}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default UpdateSpot;
