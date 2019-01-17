import React, { Component } from "react";
class WeatherData extends Component {
  render() {
    return (
      <div>
        <p> Current Low: {this.props.data.main.temp_min} °F</p>
        <p> Current High: {this.props.data.main.temp_max} °F </p>
        <p> Wind Speed: {this.props.data.wind.speed} mph </p>
        <p> {this.props.data.clouds.all} % cloudy </p>
      </div>
    );
  }
}

export default WeatherData;
