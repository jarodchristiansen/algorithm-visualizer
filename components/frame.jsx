import React, { useEffect, useMemo } from "react";

// Frame Component for rendering list
const Frame = ({ list }) => {
  const getClass = (value) => {
    if (value === 0) return "cell";
    else if (value === 1) return "cell current";
    return "cell done";
  };

  let results = useMemo(() => {
    if (!list.length) return [];

    return list.map((element, index) => (
      <div
        className={getClass(element.classType)}
        key={index}
        style={{ height: `${4 * element.key}px` }}
        value={element.key}
      ></div>
    ));
  }, [list]);

  return (
    <div className="frame" style={{ width: "100%" }}>
      <div className="array">{results}</div>
    </div>
  );
};

export default Frame;
