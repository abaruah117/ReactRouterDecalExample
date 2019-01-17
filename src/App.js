import React, { Component } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/About.js";
import ViewWeather from "./components/ViewWeather.js";
import AddCity from "./components/AddCity.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: []
    };
    this.addCity = this.addCity.bind(this);
  }
  addCity(city) {
    let newCities = this.state.cities;
    newCities.push(city);
    this.setState({
      cities: newCities
    });
  }
  render() {
    let cityNavs = this.state.cities.map((city, i) => {
      return (
        <li key={i}>
          <NavLink to={"/weather/" + city}>{city}</NavLink>
        </li>
      );
    });
    return (
      <BrowserRouter>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            {cityNavs}
            <li className="about">
              <NavLink to="/about"> About </NavLink>{" "}
            </li>
          </ul>
          <div className="content">
            <Switch>
              <Route
                exact
                path="/"
                component={props => (
                  <AddCity {...props} addCity={this.addCity} />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/weather/:city" component={ViewWeather} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
