import React from "react";
var moment = require("moment");
moment().format();

export default class ForcastDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { day, date } = this.props;
    return (
      <div className="forcastDay-container">
        {moment(date).format("dddd")}
        <div className="image">
          <img src={day.condition.icon} />
        </div>
        <div className="text">{day.avgtemp_c}</div>
      </div>
    );
  }
}
