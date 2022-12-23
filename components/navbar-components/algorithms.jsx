import React from "react";

// Algorithm list component
const Algorithms = ({ algorithms, onChange }) => {
  return (
    <span className="options">
      <select
        name="Algorithm"
        id="menu"
        className="algo-menu"
        onChange={(e) => onChange(e.target.value, "algo")}
      >
        {algorithms.map((element) => (
          <option key={element.value} value={element.value}>
            {element.type}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Algorithms;
