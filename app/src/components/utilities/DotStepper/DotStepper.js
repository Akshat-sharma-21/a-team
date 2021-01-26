import React from "react";
import "./DotStepper.css";

const Step = (props) => (
  <div className="Stepper__step">
    <span className="Stepper__info"></span>
  </div>
);

const Stepper = (props) => <div className="Stepper">{props.children}</div>;

class DotStepper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTabIndex: 0,
    };
  }

  showActiveStep = (tabIndex) => {
    currentPanel.style.display = "none";
    parent[newPanelIndex].style.display = "block";
  };

  render() {
    return (
      <div>
        <Stepper>
          <Step></Step>
          <Step></Step>
          <Step></Step>
        </Stepper>
      </div>
    );
  }
}

export default DotStepper;
