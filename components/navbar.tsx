import React, { useState } from "react";

import Algorithms from "./navbar-components/algorithms";
import Size from "./navbar-components/size";
import Speed from "./navbar-components/speed";

const Navbar = ({ newList, response, onChange, start }) => {
  let [algorithms, setAlgorithms] = useState([
    { value: 1, type: "Bubble Sort" },
    { value: 2, type: "Selection Sort" },
    { value: 3, type: "Insertion Sort" },
    { value: 4, type: "Merge Sort" },
    { value: 5, type: "Quick Sort" },
    { value: 6, type: "Heap Sort" },
    { value: 7, type: "Twist Sort" },
  ]);

  let [lengths, setLengths] = useState([
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  ]);
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

export default Navbar;
