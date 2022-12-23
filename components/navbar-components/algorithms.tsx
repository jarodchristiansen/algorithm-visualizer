import React from "react";

// Algorithm list component

interface AlgorithmsProps {
  algorithms: Algorithm[];
  onChange: (value: string, speed: string) => void;
}

export interface Algorithm {
  value: number;
  type: string;
}

const Algorithms = ({ algorithms, onChange }: AlgorithmsProps) => {
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
