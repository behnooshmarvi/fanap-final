import React, { Component } from "react";
import momentJalaali from "moment-jalaali";
import { Calendar } from "react-datepicker2";

export class JalaaliCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali(),
      isGregorian: false,
    };
  }

  handleChange = (value) => {
    this.setState({ value: value });
    this.props.setSelectedTimestamp(value.locale("fa").format("jYYYY/jM/jD"));
  };

  getCustomFormat(inputValue, isGregorian) {
    if (!inputValue) return "";
    const inputFormat = isGregorian ? "YYYY/M/D" : "jYYYY/jM/jD";
    return isGregorian
      ? inputValue.locale("es").format(inputFormat)
      : inputValue.locale("fa").format(inputFormat);
  }

  render() {
    return (
      <div>
        <Calendar
          value={this.state.value}
          isGregorian={this.state.isGregorian}
          onChange={(value) => this.handleChange(value)}
        />
        <br />
      </div>
    );
  }
}
