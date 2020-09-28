import React, { Component } from "react";
import classes from "./Calculator.module.css";

import PriceViewer from "../PriceViewer/PriceViewer";
import Circle from "../Circle/Circle";
import MortgageCalculator from "../MortgageCalculator/MortgageCalculator";

class Calculator extends Component {
  // This is the main component, all the states are managed here
  state = {
    mortgageCalculator: [
      {
        Label: "Interest Rate",
        Value: 0,
        appendAfter: "%",
        minValue: 0.0,
        maxValue: 10.0,
        step: 0.01,
      },
      {
        Label: "Sale Price",
        Value: 1348500,
        appendBefore: "$",
        minValue: 1348500,
        maxValue: 6742500,
      },
      {
        Label: "Down Payment",
        Value: 0,
        appendAfter: "%",
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
      {
        Label: "Term",
        Value: 5,
        appendAfter: "Years",
        minValue: 5,
        maxValue: 30,
      },
    ],
    priceViewer: {
      price: 1348500,
      data: [
        { title: "Common Charges", Value: 2726, color: "#1e3376" },
        { title: "Mortgage", Value: 22475, color: "#7170ac" },
        { title: "Taxes", Value: 2122, color: "#cfcfe3" },
      ],
    },
    circlePrice: 27323,
  };

  // function for handling the change in value of slider

  sliderValueHandler = (value, name) => {
    const indexOfName = this.state["mortgageCalculator"].findIndex(
      (element) => element.Label === name
    );
    let plMortgageCalculator = [...this.state.mortgageCalculator];
    plMortgageCalculator[indexOfName].Value = value;

    let plPriceViewer = { ...this.state.priceViewer };
    plPriceViewer.price = plMortgageCalculator[1].Value;
    plPriceViewer.data[1].Value = Math.round(
      this.mortgageFunction(
        parseInt(plMortgageCalculator[1].Value, 10),
        parseInt(plMortgageCalculator[2].Value, 10),
        parseInt(plMortgageCalculator[3].Value, 10)
      )
    );

    const plCirclePrice =
      plPriceViewer.data[0].Value +
      plPriceViewer.data[1].Value +
      plPriceViewer.data[2].Value;

    this.setState({
      mortgageCalculator: plMortgageCalculator,
      priceViewer: plPriceViewer,
      circlePrice: plCirclePrice,
    });
  };

  mortgageFunction = (value, downPayment, term) => {
    return (value - (downPayment * value) / 100) / (term * 12);
  };

  render() {
    return (
      <div className={classes.Calculator}>
        <h1>Monthly Cost</h1>
        <div className={classes.Main}>
          <PriceViewer
            data={this.state.priceViewer.data}
            price={this.state.priceViewer.price}
          ></PriceViewer>
          <Circle
            price={this.state.circlePrice}
            data={this.state.priceViewer.data}
          ></Circle>
          <MortgageCalculator
            data={this.state.mortgageCalculator}
            onChange={this.sliderValueHandler}
          ></MortgageCalculator>
        </div>
      </div>
    );
  }
}

export default Calculator;
