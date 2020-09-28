import React from "react";
import classes from "./Labels.module.css";

const Labels = (props) => {
  return (
    <div className={classes.Labels}>
      <div
        className={classes.Dot}
        style={{ backgroundColor: `${props.color}` }}
      ></div>
      <div className={classes.Title}>
        {props.title}: $
        {String(props.value).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
      </div>
    </div>
  );
};

export default Labels;
