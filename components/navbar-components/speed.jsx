import React from "react";

// Speed list component
const Speed = ({ onChange, speeds }) => {
  return (
    <span className="options">
      <select
        name="Algorithm"
        id="menu"
        className="speed-menu"
        onChange={(e) => onChange(e.target.value, "speed")}
      >
        {speeds.map((element) => (
          <option key={element} value={element}>
            {element}x
          </option>
        ))}
      </select>
    </span>
  );
};

export default Speed;
