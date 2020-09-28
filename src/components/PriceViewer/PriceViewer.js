import React from "react";
import classes from "./PriceViewer.module.css";

import Labels from "../Labels/Labels";

const PriceViewer = (props) => {
  const labels = props.data.map((element) => (
    <Labels title={element.title} value={element.Value} color={element.color} />
  ));

  return (
    <div className={classes.PriceViewer}>
      <h1>
        Price : ${String(props.price).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
      </h1>
      {labels}
    </div>
  );
};

export default PriceViewer;
