import React from "react";
import "./DotStepper.css";
import PropTypes from "prop-types";

class DotStepper extends React.Component {
  static propTypes = {
    variant: PropTypes.oneOf(["white", "blue"]),

    steps: PropTypes.number,

    activeStep: PropTypes.number,
  };

  render() {
    let { variant = "", steps, activeStep } = this.props;
    let stepClassName = "";

    switch (variant) {
      case "white":
        stepClassName = "dot-stepper-white";
        break;
      case "blue":
        stepClassName = "dot-stepper-blue";
        break;
      default:
        stepClassName = "dot-stepper-white";
    }

    return (
      <div className="step-container">
        {[...new Array(steps)].map((_, index) => (
            <div
              key={index}
              className={["step",
                stepClassName,
                index === activeStep ? "active" : "",
              ].join(" ")}
            />
        ))}
      </div>
    );
  }
}

export default DotStepper;
