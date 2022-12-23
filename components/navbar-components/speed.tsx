import React from "react";

// Speed list component
interface SpeedProps {
  onChange: (value: string, speed: string) => void;
  speeds: number[];
}

const Speed = ({ onChange, speeds }: SpeedProps) => {
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
