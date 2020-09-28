import React from "react";
import classes from "./Circle.module.css";

const circleConfig = {
  viewBox: "0 0 50 50",
  x: "25",
  y: "25",
  radio: "20",
};

const Circle = (props) => {
  return (
    <div className={classes.Circle}>
      <figure>
        <svg
          viewBox={circleConfig.viewBox}
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="teal"
            //   strokeDasharray={`${percentage} ${100 - percentage}`}
            // strokeDasharray="75 25"
            // strokeDashoffset="25"
          />

          <circle
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio - 2.5}
            fill="transparent"
            stroke="teal"
            //   strokeDasharray={`${percentage} ${100 - percentage}`}
            // strokeDasharray="20 4"
            // strokeDashoffset="5"
          />
          <circle
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio - 5}
            fill="transparent"
            stroke="teal"
            //   strokeDasharray={`${percentage} ${100 - percentage}`}
            // strokeDasharray="20 4"
            // strokeDashoffset="5"
          />
          <g className={classes.Label}>
            <text x="50%" y="50%" className={classes.Percentage}>
              25%
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
