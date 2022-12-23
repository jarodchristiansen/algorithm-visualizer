import React, { useState } from "react";

import Algorithms from "./navbar-components/algorithms";
import Size from "./navbar-components/size";
import Speed from "./navbar-components/speed";

const FibonacciNavbar = ({ newList, response, onChange, start }) => {
  let [algorithms, setAlgorithms] = useState([{ value: 1, type: "Fibonacci" }]);

  let [lengths, setLengths] = useState([5, 9, 11, 15, 20, 23, 27, 30]);

  let [speeds, setSpeeds] = useState([0.5, 0.75, 1.0, 2.0, 4.0]);

  const handleClick = (e) => {
    e.preventDefault();
    response();
  };

  return (
    <div className="navbar" id="navbar">
      <button id="random" onClick={() => newList(1)}>
        Random
      </button>
      <Algorithms onChange={onChange} algorithms={algorithms} />
      <Size onChange={onChange} lengths={lengths} />
      <Speed onChange={onChange} speeds={speeds} />
      <button id="start" onClick={() => start()}>
        Start
      </button>
      <a className="icon" onClick={(e) => handleClick(e)} href="/">
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
};

export default FibonacciNavbar;
