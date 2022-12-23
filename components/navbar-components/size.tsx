import React from "react";

// Size list component

interface SizeProps {
  onChange: (value: string, speed: string) => void;
  lengths: number[];
}

const Size = ({ onChange, lengths }: SizeProps) => {
  return (
    <span className="options">
      <select
        name="size"
        id="menu"
        className="size-menu"
        onChange={(e) => onChange(e.target.value, "size")}
      >
        {lengths.map((element) => (
          <option key={10 * element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Size;
