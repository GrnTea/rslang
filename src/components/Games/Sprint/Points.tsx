import React from "react";
import SprintHeader from "./SprinInterface";

const Points = ({ bonus } : {bonus: number}) => {
  const x = bonus;
  return (
    <div className="sprint__bonus">
      {bonus !== 0 && (<div> +{x} </div>)}
    </div>
  );
};

export default Points;
