import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

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
      <FrameBar
        className={getClass(element.classType)}
        key={index}
        style={{ height: `${3 * element.key}px` }}
        // @ts-ignore: TODO
        value={element.key}
      >
        <span>{element.key}</span>
      </FrameBar>
    ));
  }, [list]);

  return (
    <div className="frame" style={{ width: "100%" }}>
      <div className="array">{results}</div>
    </div>
  );
};

const FrameBar = styled.div`
  text-align: center;
  justify-content: center;
  font-weight: bold;
`;

export default Frame;
