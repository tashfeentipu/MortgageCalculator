import React from "react";
import classes from "./MortgageCalculator.module.css";
import Slider from "../Slider/Slider";

const MortgageCalculator = (props) => {
  const sliderElements = props.data.map((element) => {
    return (
      <Slider onChange={props.onChange} payload={element} key={element.Label} />
    );
  });

  return (
    <div className={classes.MortgageCalculator}>
      <h1>Mortgage Calculator</h1>
      {sliderElements}
    </div>
  );
};

export default MortgageCalculator;
