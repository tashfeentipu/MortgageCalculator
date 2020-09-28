import React, { Component } from "react";
import classes from "./Calculator.module.css";

import PriceViewer from "./PriceViewer/PriceViewer";
import Circle from "./Circle/Circle";
import MortgageCalculator from "./MortgageCalculator/MortgageCalculator";

import { Colors, LabelsValue, SliderValues, circlePrice } from "./Config";

class Calculator extends Component {
  // This is the main component, all the states are managed here
  state = {
    mortgageCalculator: [
      {
        Label: "Interest Rate",
        Value: SliderValues.InterestRate.minValue,
        appendAfter: "%",
        minValue: SliderValues.InterestRate.minValue,
        maxValue: SliderValues.InterestRate.maxValue,
        step: 0.01,
      },
      {
        Label: "Sale Price",
        Value: SliderValues.SalePrice.minValue,
        appendBefore: "$",
        minValue: SliderValues.SalePrice.minValue,
        maxValue: SliderValues.SalePrice.maxValue,
      },
      {
        Label: "Down Payment",
        Value: SliderValues.DownPayment.minValue,
        appendAfter: "%",
        minValue: SliderValues.DownPayment.minValue,
        maxValue: SliderValues.DownPayment.maxValue,
        step: 1,
      },
      {
        Label: "Term",
        Value: SliderValues.Term.minValue,
        appendAfter: "Years",
        minValue: SliderValues.Term.minValue,
        maxValue: SliderValues.Term.maxValue,
      },
    ],
    priceViewer: {
      price: SliderValues.SalePrice.minValue,
      data: [
        {
          title: "Common Charges",
          Value: LabelsValue.CommonCharges,
          color: Colors.CommonCircle,
        },
        {
          title: "Mortgage",
          Value: LabelsValue.Mortgage,
          color: Colors.MortgageCircle,
        },
        { title: "Taxes", Value: LabelsValue.Taxes, color: Colors.TaxesCircle },
      ],
    },
    circlePrice: circlePrice,
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
        plMortgageCalculator[0].Value,
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

  mortgageFunction = (interest, value, downPayment, term) => {
    if (interest === 0.0) {
      return (value - (downPayment * value) / 100) / (term * 12);
    }
    const remainingValue = value - (downPayment * value) / 100;
    const monthlyInterest = interest / 12 / 100;
    const monthTerm = term * 12;
    const power = Math.pow(1 + monthlyInterest, monthTerm);

    return (remainingValue * monthlyInterest * power) / (power - 1);
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
