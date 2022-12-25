import React, { useEffect, useState } from "react";

import Navbar from "./sorting-navbar";
import Frame from "./frame";

// helpers
import pause from "./helper/pause";
import generator from "./helper/generator";
import {
  ALGORITHM,
  SPEED,
  SIZE,
  SWAP,
  CURRENT,
  NORMAL,
  DONE,
} from "./helper/constants";
import { getKeysCopy } from "./helper/keys";
import SortingNavbar from "./sorting-navbar";
import FibonacciNavbar from "./fibonacci-navbar";
import fibonacciGenerator from "./helper/fibonaccigenerator";
import { fibonacci } from "./algorithms/fibonacci";
import styled from "styled-components";

const FibonacciVisualizer = () => {
  /*  each element in the list contains a <key, classType> where:
        key - integer value of element,
        classType - css class for changing color of element
    */

  const [list, setList] = useState<{ key: number; classType: number }[]>([]);
  const [size, setSize] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [algorithm, setAlgorithm] = useState(1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    generateList();
  }, []);

  // for updating the state on changing navbar options
  // avoid changing algorithm and size when algorithm is running
  const onChange = (value?: number, option?: string) => {
    if (option === ALGORITHM && !running) {
      //   this.setState({ algorithm: Number(value) });
      setAlgorithm(Number(value));
    } else if (option === SPEED) {
      //   this.setState({ speed: Number(value) });
      setSpeed(Number(value));
    } else if (option === SIZE && !running) {
      //   this.setState({ size: Number(value) });
      setSize(Number(value));
      //   this.generateList();
      generateList();
    }
  };

  // generate a random list
  const generateList = (value = 0) => {
    if ((list.length !== size && !running) || Number(value) === 1) {
      //   let list = generator(size);
      let list = fibonacciGenerator(size);
      setList(list);
    }
  };

  // select and run the corresponding algorithm
  const start = async () => {
    lock(true);
    let moves = await getMoves(algorithm);

    await visualizeMoves(moves);
    await done();
    lock(false);
  };

  // get moves for corresponding algorithms
  const getMoves = async (Name: number) => {
    let moves = [];

    let array = await getKeysCopy(list, size);
    if (Name === 1) {
      moves = await fibonacci(array, array.length);
    }

    return moves;
  };

  // for visualizing obtained moves
  const visualizeMoves = async (moves) => {
    if (moves.length === 0) {
      return;
    }

    if (moves[0].length === 3) {
      await visualizeMovesInRange(moves);
    } else {
      await vizualizeFinalMove(moves);
    }
  };

  const visualizeMovesInRange = async (moves) => {
    let prevRange = [];

    while (moves.length > 0 && moves[0].length === 3) {
      if (prevRange !== moves[0]) {
        //Need to convert the value sent in to match the index in relation to the fib val being compared
        await updateElementClass(prevRange, NORMAL);
        prevRange = moves[0];

        await updateElementClass(moves[0], CURRENT);
      }
      // await updateElementValue([moves[0][0], moves[0][1]]);
      moves.shift();
    }
    await visualizeMoves(moves);
  };

  const vizualizeFinalMove = async (moves) => {
    // console.log("vizualizeFinalMove", { moves });
    // while (moves.length > 0) {
    // let currMove = moves[0];
    // // if container doesn't contains 3 elements then return
    // if (currMove.length !== 3) {
    //   await visualizeMoves(moves);
    //   return;
    // } else {
    //   let indexes = [currMove[0], currMove[1]];
    //   await updateElementClass(indexes, CURRENT);
    //   if (currMove[2] === SWAP) {
    //     await updateList(indexes);
    //   }
    //   await updateElementClass(indexes, NORMAL);
    // }
    // moves.shift();
  };

  //   // for visualizing swapping based sorting algorithms
  //   const visualizeMovesBySwapping = async (Moves) => {
  //     while (Moves.length > 0) {
  //       let currMove = Moves[0];
  //       // if container doesn't contains 3 elements then return
  //       if (currMove.length !== 3) {
  //         await visualizeMoves(Moves);
  //         return;
  //       } else {
  //         let indexes = [currMove[0], currMove[1]];
  //         await updateElementClass(indexes, CURRENT);
  //         if (currMove[2] === SWAP) {
  //           await updateList(indexes);
  //         }
  //         await updateElementClass(indexes, NORMAL);
  //       }
  //       Moves.shift();
  //     }
  //   };

  //   // for visualizing range based sorting algorithms
  //   const visualizeMovesInRange = async (Moves) => {
  //     let prevRange = [];
  //     while (Moves.length > 0 && Moves[0].length === 4) {
  //       // change range only when required to avoid blinking
  //       if (prevRange !== Moves[0][3]) {
  //         await updateElementClass(prevRange, NORMAL);
  //         prevRange = Moves[0][3];
  //         await updateElementClass(Moves[0][3], CURRENT);
  //       }
  //       await updateElementValue([Moves[0][0], Moves[0][1]]);
  //       Moves.shift();
  //     }
  //     await visualizeMoves(Moves);
  //   };

  // swapping the values for current move
  const updateList = async (indexes: number[]) => {
    let array = [...list];
    let stored = array[indexes[0]].key;
    array[indexes[0]].key = array[indexes[1]].key;
    array[indexes[1]].key = stored;
    await updateStateChanges(array);
  };

  // update value of list element
  const updateElementValue = async (indexes: number[]) => {
    let array = [...list];
    array[indexes[0]].key = indexes[1];
    await updateStateChanges(array);
  };

  // update classType of list element
  const updateElementClass = async (indexes, classType) => {
    let array = [...list];

    for (let i = 0; i < indexes.length; i++) {
      array
        .filter((item) => item.key === indexes[i])
        .forEach((item) => (item.classType = classType));
    }

    await updateStateChanges(array);
  };

  // Updating the state attribute list every time on modification
  const updateStateChanges = async (newList) => {
    // this.setState({ list: newList });

    setList(newList);
    await pause(speed);
  };

  // To block changing of navbar options when the algorithm is running
  const lock = (status) => {
    // this.setState({ running: Boolean(status) });
    setRunning(Boolean(status));
  };

  // Mark list as done
  const done = async () => {
    let indexes = [];

    console.log({ list, size }, "In done");

    for (let i of list) {
      indexes.push(i.key);
    }

    await updateElementClass(indexes, DONE);
  };

  // For responsive navbar
  const response = () => {
    let Navbar = document.querySelector(".navbar");
    if (Navbar.className === "navbar") Navbar.className += " responsive";
    else Navbar.className = "navbar";
  };

  useEffect(() => {
    onChange();
    generateList();
  }, [size, speed, algorithm]);

  return (
    <React.Fragment>
      <FibonacciNavbar
        start={start}
        response={response}
        newList={generateList}
        onChange={onChange}
      />

      <TextColumn>
        <h2>Fibonacci Sequence</h2>
        <span>
          Starting from 0, each bar should represent a step in the fibonacci
          sequence. Each bar is 1px tall representating each digit of the fib
          value it represent. Adjust the middle dropdown above to expand the
          dataset.
        </span>
      </TextColumn>

      {list && <Frame list={list} />}
    </React.Fragment>
  );
};

const TextColumn = styled.div`
  max-width: 30rem;
  text-align: center;
  margin: auto;
  padding: 2rem 0;
`;

export default FibonacciVisualizer;
