import React from "react";
import "./style.scss";
import Weather from "./weather";
import { Manager, Reference, Popper } from "react-popper";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSelectLocationOpen: false };
  }

  //toggle the popper on and off
  selectLocation() {
    this.setState(prevState => ({
      isSelectLocationOpen: !prevState.isSelectLocationOpen
    }));
  }

  //gets the value from the input field
  onLocationChange(e) {
    this.setState({
      locationName: e.target.value
    });
  }

  //toggle the popper off and emit update weather
  onSelectCity() {
    const { locationName } = this.state;
    const { eventEmitter } = this.props;
    this.setState({ isSelectLocationOpen: false });

    eventEmitter.emit("updateWeather", locationName);
  }

  render() {
    const { isSelectLocationOpen } = this.state;
    const { eventEmitter } = this.props;

    return (
      <div className="top-container">
        <div className="title">Naim's Weather App</div>
        <Weather {...this.props} />

        {/*react popper */}
        <Manager>
          <Reference>
            {({ ref }) => (
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={this.selectLocation.bind(this)}
              >
                Select Location
              </button>
            )}
          </Reference>
          <Popper placement="top">
            {({ ref, style, placement, arrowProps }) =>
              isSelectLocationOpen && (
                <div
                  className="popup-container"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <div className="form-container">
                    <input
                      id="location-name"
                      type="text"
                      placeholder="enter city name"
                      onChange={this.onLocationChange.bind(this)}
                    />
                    <button
                      className="btn btn-select-location"
                      onClick={this.onSelectCity.bind(this)}
                    >
                      Select
                    </button>
                  </div>
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )
            }
          </Popper>
        </Manager>
      </div>
    );
  }
}
