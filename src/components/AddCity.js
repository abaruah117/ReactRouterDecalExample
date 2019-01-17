import React, { Component } from "react";
class AddCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ""
    };
    this.handleCity = this.handleCity.bind(this);
    this.addCity = this.addCity.bind(this);
  }
  handleCity(e) {
    this.setState({
      city: e.target.value
    });
  }
  addCity() {
    this.props.addCity(this.state.city);
    this.setState({
      city: ""
    });
  }
  render() {
    return (
      <div>
        <input onChange={this.handleCity} value={this.state.city} />
        <button className="center" onClick={this.addCity}>
          Add City
        </button>
      </div>
    );
  }
}

export default AddCity;
