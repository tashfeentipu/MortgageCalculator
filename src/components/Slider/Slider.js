import React from "react";

import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  label: {
    marginBottom: 10,
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "blue",
    height: 8,
    width: 300,
  },
  thumb: {
    height: 40,
    width: 40,
    backgroundColor: "currentColor",
    border: "2px solid currentColor",
    top: 0,
    left: 0,
  },
  active: {},

  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const SliderComp = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        {props.payload.Label} :{props.payload.appendBefore}{" "}
        {String(props.payload.Value).replace(/(.)(?=(\d{3})+$)/g, "$1,")}{" "}
        {props.payload.appendAfter}
      </div>
      <PrettoSlider
        min={props.payload.minValue}
        max={props.payload.maxValue}
        step={props.payload.step}
        onChange={(event, value) => props.onChange(value, props.payload.Label)}
      />
    </div>
  );
};

export default SliderComp;
