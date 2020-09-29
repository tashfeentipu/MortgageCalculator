import React from "react";
import classes from "./Circle.module.css";
import { Colors } from "../Config";

const circleConfig = {
  viewBox: "0 0 50 50",
  x: "25",
  y: "25",
  radio: "22",
};

const circleTranslationFunc = (radius, percent) => {
  return 2 * Math.PI * radius * percent;
};

const percentageCalculator = (data) => {
  const total = data[0].Value + data[1].Value + data[2].Value;

  return {
    OuterPercentage: data[1].Value / total,
    middlePercentage: data[0].Value / total,
    innerPercentage: data[2].Value / total,
  };
};

const Circle = (props) => {
  const circlePercentage = percentageCalculator(props.data);

  const filledAreaOuter = circleTranslationFunc(
    circleConfig.radio,
    circlePercentage.OuterPercentage
  );
  const emptyAreaOuter = circleTranslationFunc(
    circleConfig.radio,
    100 - circlePercentage.OuterPercentage
  );
  const filledAreaMiddle = circleTranslationFunc(
    circleConfig.radio - 3,
    circlePercentage.middlePercentage
  );
  const emptyAreaMiddle = circleTranslationFunc(
    circleConfig.radio - 3,
    100 - circlePercentage.middlePercentage
  );
  const filledAreaInner = circleTranslationFunc(
    circleConfig.radio - 6,
    circlePercentage.innerPercentage
  );
  const emptyAreaInner = circleTranslationFunc(
    circleConfig.radio - 6,
    100 - circlePercentage.innerPercentage
  );

  return (
    <div className={classes.Circle}>
      <figure>
        <svg
          viewBox={circleConfig.viewBox}
          style={{ width: "100%", height: "100%" }}
        >
          <g className={classes.Rotation}>
            <circle
              cx={circleConfig.x}
              cy={circleConfig.y}
              r={circleConfig.radio}
              fill="transparent"
              stroke={Colors.MortgageCircle}
              strokeWidth="2"
              strokeDasharray={`${filledAreaOuter} ${emptyAreaOuter}`}
            />
          </g>
          <g className={classes.Rotation}>
            <circle
              cx={circleConfig.x}
              cy={circleConfig.y}
              r={circleConfig.radio - 3}
              fill="transparent"
              stroke={Colors.CommonCircle}
              strokeWidth="2"
              strokeDasharray={`${filledAreaMiddle} ${emptyAreaMiddle}`}
            />
          </g>
          <g className={classes.Rotation}>
            <circle
              cx={circleConfig.x}
              cy={circleConfig.y}
              r={circleConfig.radio - 6}
              fill="transparent"
              stroke={Colors.TaxesCircle}
              strokeWidth="2"
              strokeDasharray={`${filledAreaInner} ${emptyAreaInner}`}
            />
          </g>
          <g className={classes.Label}>
            <text x="50%" y="50%" className={classes.Percentage}>
              ${String(props.price).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
            </text>
            <text x="50%" y="50%" className={classes.Ctext}>
              Monthly Cost
            </text>
          </g>
        </svg>
      </figure>{" "}
    </div>
  );
};

export default Circle;
