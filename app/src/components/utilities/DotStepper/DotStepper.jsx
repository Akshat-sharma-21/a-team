import React from "react";
import "./DotStepper.css";
import PropTypes from "prop-types";

/**
 * Dot Stepper Component
 * @augments {React.Component<Props>}
 */
class DotStepper extends React.Component {
  static propTypes = {
    /**
     * Specifies the color styling applied to
     * the stepper nodes.
     */
    variant: PropTypes.oneOf(["white", "primary"]),

    /**
     * Total number of steps.
     */
    steps: PropTypes.number.isRequired,

    /**
     * Index of active step.
     */
    activeStep: PropTypes.number,
  };

  render() {
    let { variant="white", steps, activeStep=0 } = this.props;
    let stepClassName = "";

    switch (variant) {
      case "white":
        stepClassName = "dot-stepper-white";
        break;

      case "primary":
        stepClassName = "dot-stepper-primary";
        break;

      default:
        stepClassName = "dot-stepper-white";
    }

    return (
      <div className="dot-stepper-container">
        {[...new Array(steps)].map((_, index) => (
          <div
            key={index}
            className={["dot-stepper-step",
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
