import React, { Component } from "react";
import axios from "../axios.js";

class ViewWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: false
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.city !== prevProps.match.params.city) {
      this.fetchWeather();
    }
  }
  componentDidMount() {
    this.fetchWeather();
  }
  fetchWeather() {
    this.setState({
      loading: true,
      error: false,
      data: null
    });
    let params = {
      APPID: process.env.REACT_APP_WEATHER_API_KEY,
      q: this.props.match.params.city,
      units: "imperial"
    };
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
  render() {
    return (
      <div>
        {this.state.loading && <p> Loading . . . </p>}
        {this.state.error && <p> Error! </p>}
        {this.state.data && (
          <div>
            <p> city: {this.props.match.params.city}</p>
            <p> Current Low: {this.state.data.main.temp_min} °F</p>
            <p> Current High: {this.state.data.main.temp_max} °F </p>
            <p> Wind Speed: {this.state.data.wind.speed} mph </p>
            <p> {this.state.data.clouds.all} % cloudy </p>
          </div>
        )}
      </div>
    );
  }
}

export default ViewWeather;
