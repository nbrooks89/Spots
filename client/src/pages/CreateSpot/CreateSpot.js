import React from "react";
import "./CreateSpot.css";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

class CreateSpot extends React.Component {
  state = {
    name: "",
    address: "",
    spotType: "",
    description: "",
    coordinates: [],
    latitude: "",
    longitude: "",
    photo: null,
    succesfulCreate: false,
    isChecked: false,
  };

  handleInputChange = (event) => {
    console.log(event.target.id);
    this.setState({ [event.target.id]: event.target.value });
  };

  handlechecked = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  handleFileChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({ photo: event.target.files[0] });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const encodedAddress = encodeURI(this.state.address);
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
      this.setState({ address: dataa.results[0].formatted_address });
    this.setState({ latitude: dataa.results[0].geometry.location.lat });
    this.setState({ longitude: dataa.results[0].geometry.location.lng });
    const newPost = {
      name: this.state.name,
      address: this.state.address,
      spotType: this.state.spotType,
      description: this.state.description,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      photo: this.state.photo,
    };
    console.log(newPost);

    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("address", this.state.address);
    formData.append("spotType", this.state.spotType);
    formData.append("description", this.state.description);
    formData.append("latitude", this.state.latitude);
    formData.append("longitude", this.state.longitude);
    formData.append("name", this.state.name);

    const res = await fetch(`/api/v1/users/${this.props.userId}/spots`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      this.setState({ successfulCreate: true });
    } else {
      console.log(data);
      alert(data.message);
    }
    console.log("post", data);
  };

  componentDidMount() {}

  render() {
    if (this.state.successfulCreate) {
      return <Redirect to="/" />;
    }
    return (
      <div className="createContainer">
        <div className="create-header">Create Spot</div>
        <Form className="form" onSubmit={this.onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name the Spot</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          {/* <Form.Group controlId="address">
            <Form.Label>current location</Form.Label>
            <Form.Control
              type="checkbox"
              name="address"
              value={this.state.address}
              onChange={this.handleChecked}
            />
          </Form.Group> */}

          <Form.Group controlId="spotType">
            <Form.Label>Spot Type</Form.Label>
            <Form.Control
              as="select"
              value={this.state.spotType}
              onChange={this.handleInputChange}
            >
              <option value="" disabled selected></option>
              <option>street</option>
              <option>park</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="input"  >
          <Form.Label for ="input" id="label">
             <FontAwesomeIcon icon={faCamera} size="3x" />
             </Form.Label>
            <Form.File
              type="file"
              name="photo"
               onChange={this.handleFileChange}
               
           / >
            
             {
         this.state.photo !== null && <div>photo uploaded</div>
          }
          </Form.Group>

          <button>Submit</button>
          <Form.Group className="formGroup" controlId="longitude">
            <Form.Label></Form.Label>
            <Form.Control
              type="hidden"
              name="longitude"
              value={this.state.longitude}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formGroup" controlId="latitude">
            <Form.Label></Form.Label>
            <Form.Control
              type="hidden"
              name="latitude"
              value={this.state.latitude}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreateSpot;
