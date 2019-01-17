import React from "react";
import axios from "../axios.js";
import WeatherData from "./WeatherData.js";
class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      data: null,
      loading: false,
      error: false
    };
    this.handleCity = this.handleCity.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }
  fetchWeather() {
    this.setState({
      loading: true,
      error: false,
      data: null
    });
    let params = {
      APPID: process.env.REACT_APP_WEATHER_API_KEY,
      q: this.state.city,
      units: "imperial"
    };
    if (this.state.country !== "") {
      params["q"] = params["q"] + "," + this.state.country;
    }
    axios
      .get("/weather", {
        params: params
      })
      .then(response =>
        this.setState({
          data: response.data,
          loading: false
        })
      )
      .catch(err =>
        this.setState({
          error: true,
          loading: false,
          data: null
        })
      );
  }

  handleCity(e) {
    this.setState({
      city: e.target.value
    });
  }
  handleCountry(e) {
    this.setState({
      country: e.target.value
    });
  }
  render() {
    return (
      <div>
        city: <input onChange={this.handleCity} placeholder="city" />
        <br />
        country:
        <input onChange={this.handleCountry} placeholder="country code" />
        <br />
        <button onClick={this.fetchWeather}> Fetch Weather </button>
        {this.state.loading && <p> Loading . . . </p>}
        {this.state.error && <p> Error! </p>}
        {this.state.data && <WeatherData data={this.state.data} />}
      </div>
    );
  }
}
export default WeatherForm;
