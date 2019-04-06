import React, { Component } from "react";
import "./App.css";
import "./sass/app.scss";
import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";
import axios from "axios";

const weatherKey = "d8feebbbf21149399bc194448190504";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Toronto",
      numForcastDays: 7,
      isLoading: true,
      loadingError: false
    };
  }

  updateWeather() {
    const { city, numForcastDays } = this.state;

    const URL = `https://api.apixu.com/v1/forecast.json?key=${weatherKey}&q=${city}&days=${numForcastDays}`;

    //make a request to collect data from the weather API
    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          isLoading: false,
          temp_c: data.current.temp_c,
          isDay: data.current.is_day,
          text: data.current.condition.text,
          iconURL: data.current.condition.icon,
          forecastdays: data.forecast.forecastday
        });
      })
      .catch(err => {
        alert("Location not found, please try a different location ");
      });
  }

  //once the compnents mounts we call the update weather function
  componentDidMount() {
    const { eventEmitter } = this.props;
    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ city: data }, () => this.updateWeather());
    });
  }

  render() {
    const {
      isLoading,
      city,
      temp_c,
      isDay,
      text,
      iconURL,
      forecastdays
    } = this.state;
    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h4>loading..</h4>}
          {!isLoading && (
            <div className="top-section">
              <TopSection
                location={city}
                temp_c={temp_c}
                isDay={isDay}
                text={text}
                iconURL={iconURL}
                eventEmitter={this.props.eventEmitter}
              />
            </div>
          )}

          <div className="bottom-section">
            <BottomSection forecastdays={forecastdays} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
