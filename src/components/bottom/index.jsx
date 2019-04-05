import React from "react";
import "./style.scss";
import ForcastDay from "./forcastDay";

export default class BottomSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { forecastdays } = this.props;

    return (
      <div className="bottom-container">
        <h5 className="forecast-header">next 7 days forecast</h5>
        {/* loop to view the forecast */}
        <div className="inner-container">
          {forecastdays &&
            forecastdays.map((day, idx) => {
              return <ForcastDay date={day.date} day={day.day} key={idx} />;
            })}
        </div>
      </div>
    );
  }
}
